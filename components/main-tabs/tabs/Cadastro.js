import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import {
    Avatar,
    Button,
    Card,
    Title,
    Text,
    Paragraph,
    DataTable,
    TextInput,
    Checkbox
} from 'react-native-paper';
import { buscarCorridas, buscarValorGasolina, cadastrarCorrida } from '../../../service/CorridaService';
import getCurrentUser from '../../../service/FirebaseAuth/getCurrentUser';
import colors from '../../../utils/colors';

export default function Home() {
    const [dataAtual, setDataAtual] = useState("")
    const [ida, setIda] = useState(false);
    const [volta, setVolta] = useState(false);
    const [commons, setComons] = useState({ gasolina: 0.00 });
    const [user, setUser] = useState({});

    useEffect(() => {
        carregarDados()
    }, []);

    function carregarDados() {
        getUser()
        getValorGasolina()
        getDataAtual()
    }
    
    function getUser(){
        const usr = getCurrentUser()
        setUser(usr)
    }

    function getDataAtual() {
        var data = new Date();
        var dia = String(data.getDate()).padStart(2, '0');
        var mes = String(data.getMonth() + 1).padStart(2, '0');
        var ano = data.getFullYear();
        let dta = dia + '/' + mes + '/' + ano;
        setDataAtual(dta)
    }
    async function getValorGasolina() {
        buscarValorGasolina()
            .then((snapshot) => {
                setComons(snapshot)
            })
    }
    function calcularTotal() {

    }

    function formatarCorrida() {
        let corrida = {
            dataAtual: dataAtual,
            ida: ida,
            volta: volta,
            valor_gasolina: commons.gasolina
        }
        return corrida
    }

    function salvar() {
        let idUsuario = 0
        let corrida = formatarCorrida()
        cadastrarCorrida(corrida, idUsuario)
    }

    const LeftContent = props =>
        <Avatar.Icon
            style={styles.icone}
            color='black'
            {...props}
            icon="face-man-outline" />

    return (
        <View style={styles.container}>
            <Card style={styles.card}
                mode="outlined">
                <Card.Title
                    titleStyle={{color:colors.textPrimary}}
                    subtitleStyle={{color:colors.textSecundary}}
                    title="Registrar Viagem"
                    subtitle={user.displayName}
                    left={LeftContent} />
                <Card.Content>
                    <TextInput
                        style={styles.campos}
                        theme={{
                            colors: {
                                disabled: colors.textSecundary,
                                text: colors.textPrimary,
                            }
                        }}
                        label="Data da Viagem"
                        disabled
                        value={dataAtual}
                    />
                    <TextInput
                        style={styles.campos}
                        theme={{
                            colors: {
                                disabled: colors.textSecundary,
                                text: colors.textPrimary,
                            }
                        }}
                        label="Valor da gasolina"
                        disabled
                        value={commons.gasolina + ""}
                    />
                    <View style={styles.checkbox}>
                        <Text style={styles.tcheck}>Ida:</Text>
                        <Checkbox
                            color={colors.textPrimary}
                            uncheckedColor={colors.textSecundary}
                            status={ida ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setIda(!ida);
                            }}
                        />
                        <Text style={styles.tcheck}>Volta:</Text>
                        <Checkbox
                            color={colors.textPrimary}
                            uncheckedColor={colors.textSecundary}
                            status={volta ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setVolta(!volta);
                            }}
                        />
                    </View>
                    <Button
                        style={styles.buttonAcept}
                        color={colors.buttonAceptColor}
                        icon="check"
                        mode="contained"
                        onPress={() => salvar()}>
                        Registrar Viagem
                    </Button>
                </Card.Content>
            </Card>
        </View>
    );
}
//13293d
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.prymary,
        alignItems: 'center',
    },

    card: {
        marginTop: 60,
        width: 400,
        borderColor: colors.prymary,
        backgroundColor: colors.prymary,
    },
    icone: {
        width: 50,
        height: 50,
        backgroundColor: '#e8f1f2',
    },
    textoCampos: {

    },
    campos: {
        backgroundColor: colors.secundary,
        marginVertical: 10,
        height: 60,
    },
    checkbox: {
        flexDirection: 'row',
    },
    tcheck: {
        color: colors.textSecundary,
        marginHorizontal: 5,
        marginBottom: 22,
        margin: 6
    },
    buttonAcept:{
        alignSelf:'center',
        marginTop: 20,
        width:250,
    }
});
