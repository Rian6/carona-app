import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useCallback } from 'react';
import { ImageBackground, StyleSheet, Text, View, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar, Button, Card, Title, Paragraph, DataTable, ActivityIndicator } from 'react-native-paper';
import { buscarCorridas, buscarValorGasolina } from '../../../service/CorridaService';
import getCurrentUser from '../../../service/FirebaseAuth/getCurrentUser';
import colors from '../../../utils/colors';

export default function Home() {

    const [corridas, setCorridas] = useState();
    const [refreshing, setRefreshing] = useState(false);
    const [commons, setComons] = useState({});
    const [user, setUser] = useState({});

    useEffect(() => {
        carregarDados()
    }, []);

    function carregarDados() {
        getUser()
        getCorridas();
        getValorGasolina();
    }

    function getUser(){
        const usr = getCurrentUser()
        setUser(usr)
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getCorridas(4000).then(() => setRefreshing(false));
    }, []);
    async function getValorGasolina() {
        buscarValorGasolina()
            .then((snapshot) => {
                setComons(snapshot)
            })
    }
    async function getCorridas(timeout = 2000) {
        return new Promise(resolve =>
            setTimeout(resolve, timeout),
            buscarCorridas()
                .then((snapshot) => {
                    setCorridas(snapshot)
                })
        );
    }

    function Loading() {
        return (
            <View style={{ alignItems: "center" }}>
                <ActivityIndicator color={colors.textPrimary} style={{ marginTop: 40 }} size={40} />
                <Text style={styles.textPrimary}>Carregando dados..</Text>
            </View>
        )
    }

    function formatNumberToReal(numero) {
        if (numero) {
            let n = numero.toFixed(2)
            n = ("R$ " + n).replace(".", ",")
            return n
        }
        return "R$ 0,00"
    }
    const LeftContent = props =>
        <Avatar.Icon
            style={styles.icone}
            color='black'
            {...props}
            icon="face-man-outline" />

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Card.Title
                    titleStyle={styles.textPrimary}
                    subtitleStyle={styles.textSecundary}
                    title={user.displayName ? user.displayName : "Usuarion "}
                    subtitle={user.email}
                    left={LeftContent} />
                <Card.Content>
                    <Title style={styles.textPrimary}>Geral</Title>
                    <Paragraph style={styles.textSecundary}>Viagens: {corridas && corridas.length !== 0 ? corridas.length : 0}</Paragraph>
                    <Paragraph style={styles.textSecundary}>Valor da gasolina: {formatNumberToReal(commons.gasolina)}</Paragraph>
                </Card.Content>
            </Card>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }>
                <DataTable style={{ flex: 1, width: 400 }}>
                    <DataTable.Header>
                        <DataTable.Title
                            textStyle={styles.textPrimary}
                            style={{ minWidth: 50 }}>
                            Dia
                        </DataTable.Title>
                        <DataTable.Title textStyle={styles.textPrimary}>
                            Ida
                        </DataTable.Title >
                        <DataTable.Title textStyle={styles.textPrimary}>
                            Volta
                        </DataTable.Title>
                        <DataTable.Title
                            textStyle={styles.textPrimary}
                            numeric>
                            Gasolina
                        </DataTable.Title>
                    </DataTable.Header>

                    {corridas && corridas.length !== 0 ? corridas.map((corri, i) =>
                        <DataTable.Row>
                            <DataTable.Cell style={{ minWidth: 50 }}>
                                <Text style={styles.textSecundary}>{corri.corrida.dataAtual}</Text>
                            </DataTable.Cell>
                            <DataTable.Cell>
                                <Text style={styles.textSecundary}>{corri.corrida.ida ? 'Sim' : 'não'}</Text>
                            </DataTable.Cell>
                            <DataTable.Cell>
                                <Text style={styles.textSecundary}>{corri.corrida.volta ? 'Sim' : 'não'}</Text>
                            </DataTable.Cell>
                            <DataTable.Cell numeric>
                                <Text style={styles.textPrimary}>{formatNumberToReal(corri.corrida.valor_gasolina)}</Text>
                            </DataTable.Cell>
                        </DataTable.Row>
                    )
                        :
                        <Loading />
                    }
                </DataTable>
            </ScrollView>
        </View>
    );
}
//13293d
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.prymary,
        alignItems: 'center',
        color: colors.white
    },

    card: {
        marginTop: 60,
        width: 380,
        borderRadius: 10,
        backgroundColor: colors.secundary,
    },
    icone: {
        width: 50,
        height: 50,
        backgroundColor: '#e8f1f2',
        borderRadius: 50
    },
    dtTitle: {
        width: 50,
        height: 50,
    },
    textPrimary:{
        color: colors.textPrimary
    },
    textSecundary:{
        color: colors.textSecundary
    }
});
