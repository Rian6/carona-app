import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Title, TextInput } from 'react-native-paper';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useAuthentication } from '../utils/hooks/useAuthentication';

export default function Login({ navigation }) {

    const [value, setValue] = useState({
        email: '',
        password: '',
        error: ''
    })

    async function signIn() {
        const auth = getAuth();
        
        if (value.email === '' || value.password === '') {
            setValue({
                ...value,
                error: 'Email and password are mandatory.'
            })
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, value.email, value.password);
        } catch (error) {
            setValue({
                ...value,
                error: error.message,
            })
        }
    }

    return (
        <View style={styles.container}>
            <Title>Login</Title>
            <TextInput
                style={styles.campos}
                label="Login"
                value={value.login}
                onChangeText={(text) => setValue({ ...value, email: text })}
            />
            <TextInput
                style={styles.campos}
                label="Senha"
                value={value.password}
                onChangeText={(text) => setValue({ ...value, password: text })}
            />
                  {!!value.error && <View><Text>{value.error}</Text></View>}

            <Button icon="login" mode="contained" onPress={signIn}>
                Entrar
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    campos: {
        marginVertical: 20,
        height: 50,
        width: 300,
    }
})
