import React, { useContext, useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import PropTypes from 'prop-types';
import { AuthContext } from '../../context/AuthContext';
import ColorPalette from '../../styles/colors';
import userService from '../../services/userService';

const styles = StyleSheet.create({
  Button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ColorPalette.primary,
    borderWidth: 0.5,
    borderColor: ColorPalette.gray,
    height: 40,
    borderRadius: 5,
    margin: 5,
    padding: 10,
    alignSelf: 'center',
  },
  TextStyle: {
    color: ColorPalette.white,
    fontWeight: 'bold',
  },
});

interface Props {
  email: PropTypes.string,
  password: PropTypes.string,
}

function LogOnButton({ email, password }: Props) {
  const authCtx = useContext(AuthContext);
  const firebaseAuth = getAuth();
  const logon = () => {
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const { user } = userCredential;
        const idToken = await user.getIdToken();
        const jwt = idToken;
        const userName = user.displayName;
        authCtx.setAuth(jwt, userName, email);

        console.log(email);
        userService.setCookie(jwt);
        userService.getUser(email).then((u) => {
          console.log(u);
          authCtx.setUserId(u.user_id);
        }).catch(error => {
          console.log(email);
          console.log(error);
        });
      })
      .catch((error) => {
        alert(error);
        console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  return (
    <Button mode="contained" onPress={logon}>
      <Text style={styles.TextStyle}>LOG IN</Text>
    </Button>
  );
}

export default LogOnButton;