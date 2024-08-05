// App.js

import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider, ThemeContext } from './src/model/ThemeContext';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential } from 'firebase/auth';
//import { auth } from './firebase';
import { AsyncStorage } from '@react-native-async-storage/async-storage';
import Home from './src/assets/Home';
import Menu from './src/assets/Menu';

WebBrowser.maybeCompleteAuthSession();

const Stack = createStackNavigator();

export default function App() {

  const [userInfo, setUserInfo] = React.useState();
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: '648974824800-c4h0crg6mc407865fjagkclk0ved7da8.apps.googleusercontent.com'
  });

  /* React.useEffect(() => {
    if (response?.type == "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  React.useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(JSON.stringify(user, null, 2));
        setUserInfo(user);
      } else {
        console.log('Something went wrong');
      }
    });

    return () => unsub();

  }, []) */

  return (
    <ThemeProvider>
      <AppContainer promptAsync={promptAsync} userInfo={userInfo}/>
    </ThemeProvider>
  );
}

function AppContainer({promptAsync, userInfo}) {
  const { isDarkTheme } = useContext(ThemeContext);

  const navigationTheme = {
    dark: isDarkTheme,
    colors: {
      primary: isDarkTheme ? '#111' : '#fff',
      background: isDarkTheme ? '#000' : '#fff'
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator initialRouteName={'Menu'}>
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {(props) => <Home {...props} promptAsync={promptAsync} />}
        </Stack.Screen>
        <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
