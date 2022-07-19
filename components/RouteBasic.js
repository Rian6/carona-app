import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../components/Login';
import TabController from '../components/main-tabs/TabController';

import { useAuthentication } from '../utils/hooks/useAuthentication';

export default function RouteBasic() {

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