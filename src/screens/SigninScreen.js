import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import { NavigationEvents } from 'react-navigation';
import AuthFrom from '../components/AuthForm';
import NavLink from '../components/NavLink';

const SigninScreen = () => {
    const { state, signin, clearErrorMessage } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <NavigationEvents onWillBlur={clearErrorMessage} />
            <AuthFrom
                headerText="Sign In"
                errorMessage={state.errorMsg}
                submitButtonText="Log In"
                //onSubmit={({ email, password }) => signup({ email, password })}
                onSubmit={signin}
            />
            <NavLink 
                routeName= 'Signup'
                text = 'Dont have an account? Sign up instead!'
            />  
        </View>
    );
};

SigninScreen.navigationOptions = {
    headerShown: false
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 150
    }
});

export default SigninScreen;