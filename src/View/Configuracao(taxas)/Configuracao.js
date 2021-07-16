import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    SafeAreaView,
    Image,
    Dimensions,
    ScrollView,
    Keyboard,
    TouchableHighlight,
    FlatList,
    Modal,
    BackHandler,
    Alert, StatusBar
} from 'react-native';

import IconMc from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFo from 'react-native-vector-icons/Fontisto'

import styles from "./Estilo";
import store from 'react-native-simple-store';
import CurrencyInput from 'react-native-currency-input';
import Plugin from '../../model/plugins';
import Crud from '../../model/Crud';


const Configuracao = ({ navigation, routes }) => {

    useEffect(() => {
        cotacaoDolar()
        listaTaxas()
    }, [])

    const [precoDolar, setPrecoDolar] = useState(0);
    const [taxaGateway, setTaxaGateway] = useState(0);
    const [taxaLoja, setTaxaLoja] = useState(0);
    const [imposto, setImposto] = useState(0);
    const [lucro, setLucro] = useState(0);
    const [estado, setEstado] = useState(0);


    function cotacaoDolar() {
        const url = 'https://economia.awesomeapi.com.br/all/USD-BRL'

        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                setPrecoDolar(responseJson['USD'].low)
            }).catch(error => {
                console.log(error);
            });
    }

    function listaTaxas() {
        store.get('user')
            .then((res) => {
                setEstado(res.idLojaPrincipal)

                const referencia = Plugin().refereciasBancoDeDados('Taxas', '', res.idLojaPrincipal, res.idUser)

                referencia.on('value', (data) => {
                    console.log(data.val());
                    if (data.val() != null) {
                        setTaxaGateway(data.val().gateway),
                            setTaxaLoja(data.val().loja),
                            setImposto(data.val().Imposto),
                            setLucro(data.val().lucros)
                    }
                });
            })
    }

    function AtualizarTaxas() {
        var gateway = taxaGateway
        var loja = taxaLoja
        var Imposto = imposto
        var lucros = lucro

        if (estado == undefined) {
            Crud().AtualizarObjeto('Taxas', '', { lucros, gateway, loja, Imposto })
            navigation.reset({
                routes: [{ name: 'tab' }]
            });
        } else {
            Plugin().alertas('Taxas atualizada com sucesso', '')
            Crud().AtualizarObjeto('Taxas', '', { lucros, gateway, loja, Imposto })
        }
    }


    return (

        <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
            <StatusBar backgroundColor='#efecef' barStyle="dark-content" />

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior="height"
                keyboardVerticalOffset={60}
            >
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    width: Dimensions.get('window').width
                }}>

                    <Text style={styles.textoTitulo}>Atualize suas taxas</Text>

                    <Text style={styles.textoForm}>Seu lucro liquido(%)</Text>

                    <TextInput style={styles.formInput}
                        placeholder={'(%)'}
                        // defaultValue={nomeProduto}
                        placeholderTextColor={'#bdbebd'}
                        underlineColorAndroid={'#D3D3D3'}
                        keyboardType={'number-pad'}
                        value={lucro.toString()}
                        onChangeText={
                            (nome) => setLucro(nome)
                        }
                    />

                    <Text style={styles.textoForm}>Seu Markup</Text>

                    <TextInput style={styles.formInput}
                        placeholder={'(%)'}
                        // defaultValue={nomeProduto}
                        placeholderTextColor={'#bdbebd'}
                        underlineColorAndroid={'#D3D3D3'}
                        keyboardType={'number-pad'}
                        value={taxaGateway.toString()}
                        onChangeText={
                            (nome) => setTaxaGateway(nome)
                        }
                    />

                    <Text style={styles.textoForm}>Cotação do Dolar</Text>
                    <CurrencyInput
                        // placeholder={'Cotação do Dolar'}
                        placeholderTextColor={'#bdbebd'}
                        underlineColorAndroid={'#D3D3D3'}
                        style={styles.formInput}
                        value={precoDolar}
                        keyboardType={'number-pad'}
                        // onChangeValue={setCusto}
                        unit={'R$'}
                        delimiter=","
                        separator="."
                        precision={2}
                    />

                    <Text style={styles.textoForm}>Taxa do gateway(%)</Text>

                    <TextInput style={styles.formInput}
                        placeholder={'(%)'}
                        // defaultValue={nomeProduto}
                        placeholderTextColor={'#bdbebd'}
                        underlineColorAndroid={'#D3D3D3'}
                        keyboardType={'number-pad'}
                        value={taxaGateway.toString()}
                        onChangeText={
                            (nome) => setTaxaGateway(nome)
                        }
                    />

                    <Text style={styles.textoForm}>Taxa da loja(%)</Text>

                    <TextInput style={styles.formInput}
                        placeholder={'(%)'}
                        // defaultValue={nomeProduto}
                        placeholderTextColor={'#bdbebd'}
                        underlineColorAndroid={'#D3D3D3'}
                        keyboardType={'number-pad'}
                        value={taxaLoja.toString()}
                        onChangeText={
                            (nome) => setTaxaLoja(nome)
                        }
                    />

                    <Text style={styles.textoForm}>Imposto(%)</Text>
                    <TextInput style={styles.formInput}
                        placeholder={'(%)'}
                        // defaultValue={nomeProduto}
                        placeholderTextColor={'#bdbebd'}
                        underlineColorAndroid={'#D3D3D3'}
                        keyboardType={'number-pad'}
                        value={imposto.toString()}
                        onChangeText={
                            (nome) => setImposto(nome)
                        }
                    />

                    <TouchableOpacity style={styles.btlogin} onPress={() => AtualizarTaxas()} >
                        <Text style={styles.textoBotao}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}


export default Configuracao