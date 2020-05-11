import React, { useContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import { NavigationEvents } from 'react-navigation';
import AuthFrom from '../components/AuthForm';
import NavLink from '../components/NavLink';

const SignupScreen = () => {
    const { state, signup, clearErrorMessage } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <NavigationEvents onWillBlur={clearErrorMessage} />
            <AuthFrom
                headerText="Sign Up"
                errorMessage={state.errorMsg}
                submitButtonText="Create Account"
                //onSubmit={({ email, password }) => signup({ email, password })}
                onSubmit={signup}
            />
            <NavLink 
                routeName= 'Signin'
                text = 'Got an account? Sign in instead!'
            />  
        </View>
    );
};

SignupScreen.navigationOptions = {
    headerShown: false
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 150
    }
});

export default SignupScreen;