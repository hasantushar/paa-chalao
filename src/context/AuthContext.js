import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
    switch(action.type) {
        case 'signin':
            return { errorMsg: null, token: action.payload }
        case 'add_error':
            return { ...state, errorMsg: action.payload }
        case 'clear_error':
            return { ...state, errorMsg: '' }
        case 'signout':
            return { token: null, errorMsg: null }
        default:
            return state;
    }
};

const localSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token');

    if(token) {
        dispatch({ type: 'signin', payload: token });
        navigate('TrackList');
    } else {
        navigate('loginFlow');
    }
};

const signup = (dispatch) =>  async ({ email, password }) => {
    try {
        const response = await trackerApi.post('/signup', { email, password });
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({ type:'signin', payload: response.data.token });
        
        navigate('TrackList');
    } catch (err) {
        dispatch({ type: 'add_error', payload: 'Something went wrong' });
    }
};

const signin = (dispatch) => async ({ email, password }) => {
    try {
        const response = await trackerApi.post('/signin', { email, password });
        await AsyncStorage.setItem('token', response.data.token);
        dispatch({ type:'signin', payload: response.data.token });
        
        navigate('TrackList');
    } catch (err) {
        dispatch({ type: 'add_error', payload: 'Something went wrong while signin in' });
    }
};

const signout = (dispatch) => async () => {
    await AsyncStorage.removeItem('token');
    dispatch({ type: 'signout' });
    navigate('Signin');
};

const clearErrorMessage = (dispatch) => () => {
    dispatch({ type: 'clear_error' });
};

export const { Provider, Context } = createDataContext(
    authReducer,
    { signup, signin, signout, clearErrorMessage, localSignin },
    { token: null, errorMsg: '' }
);