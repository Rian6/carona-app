import { useEffect } from 'react';
import { initializeApp } from 'firebase/app';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './components/Login';
import TabController from './components/main-tabs/TabController';
import { useAuthentication } from './utils/hooks/useAuthentication';

export default function App() {

  useEffect(() => {
    initializeApp({
      apiKey: "AIzaSyCFmAaz9nM23Q3nbCoGRc97gZsUwDHhzgE",
      authDomain: "carona-74eb6.firebaseapp.com",
      projectId: "carona-74eb6",
      storageBucket: "carona-74eb6.appspot.com",
      messagingSenderId: "118775936068",
      appId: "1:118775936068:web:631de3fbfc04df370d7811",
      measurementId: "G-QP93MNPNQQ"
    });
  }, []);


  const Stack = createNativeStackNavigator();
  const { user } = useAuthentication();

  return (
    <NavigationContainer >
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
        {user ?
          <Stack.Screen name="TabController" component={TabController} />
          :
          <Stack.Screen name="Login" component={Login} />
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}