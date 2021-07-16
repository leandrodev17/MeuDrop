import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    Dimensions,
    ScrollView,
    Keyboard,
    TouchableHighlight,
    FlatList,
    Modal,
    BackHandler,
    Alert, 
    ActivityIndicator,
    StatusBar
} from 'react-native';

import IconA from 'react-native-vector-icons/AntDesign';
import IconF from 'react-native-vector-icons/FontAwesome'
import IconM from 'react-native-vector-icons/MaterialIcons';
import IconFa from 'react-native-vector-icons/Feather';
import IconO from 'react-native-vector-icons/Octicons';
import IconMc from 'react-native-vector-icons/MaterialCommunityIcons'
import IconFA5 from 'react-native-vector-icons/FontAwesome5'
import IconI from 'react-native-vector-icons/Ionicons'

import RNPickerSelect from 'react-native-picker-select';
import styles from "./Estilo";
import store from 'react-native-simple-store';
import Plugin from '../../model/plugins';
import Crud from '../../model/Crud';
import estilomodal from '../../model/estiloModal';


const lojaprincipal = ({ navigation, route }) => {

    useEffect(() => {
        getCache()
        listaLojas()
    }, [])


    const [listaDeLojas, setListaDeLolas] = useState([]);
    const [trocarLoja, setTrocarLoja] = useState('');
    const [estadoNet, setEstadoNet] = useState('')

    async function getCache() {
        try {
            NetInfo.fetch().then(state => {
                setEstadoNet(Boolean(state.isInternetReachable))
            })
        } catch (e) {
            console.log("error", e);
        }
    }


    function listaLojas() {
        store.get('user')
            .then((res) => {
                var idDoUsuario = route.params.user
                console.log(route.params.user);
                const referencia = Plugin().refereciasBancoDeDados('lojas', '', '', idDoUsuario)
                console.log(referencia);
                referencia.on('value', (snap) => {
                    var items = [];
                    var posi = 0

                    snap.forEach((child) => {

                        var nomeResumido = child.val().nome
                        if (nomeResumido.length >= 20) {
                            nomeResumido = nomeResumido.substr(0, 19) + '...'
                        }

                        items.push({
                            label: nomeResumido,
                            value: posi,
                            _key: child.key,
                        });

                        posi++
                    });
                    setListaDeLolas(items)
                })
            })
    }

    function LojaPrincipal() {

        if (trocarLoja === '') {
            Plugin().alertas('Você deve escolher uma loja como princiapal', '')
        } else {
            var principal = listaDeLojas[trocarLoja].label
            var id = listaDeLojas[trocarLoja]._key

            store.update('user', {
                lojaPrincipal: principal,
                idLojaPrincipal: id
            })

            Crud().AtualizarObjeto('LojaPrincipal', '', { principal })
            navigation.reset({
                routes: [{ name: 'tab' }]
            });
        }
    }

    switch (estadoNet) {
        case '':
            console.log(estadoNet);

            return (
                <View style={{ justifyContent: 'center', flex: 1, backgroundColor: 'white' }}>
                    <StatusBar backgroundColor='#efecef' barStyle="dark-content" />

                    <ActivityIndicator size={120} color="#047454" />
                    <Text style={{ color: '#047454', marginTop: 12, textAlign: 'center', fontWeight: '600' }}>Carregando...</Text>

                </View>
            );
            break;
        case false:
            //Instruções executadas quando o resultado da expressão for igual á valor2
            return (
                <View style={{ justifyContent: 'center', flex: 1, backgroundColor: 'white' }}>
                    <StatusBar backgroundColor='#efecef' barStyle="dark-content" />
                    <Icon style={{ color: '#047454', alignSelf: 'center' }} name={"wifi-off"} size={90} />
                    <Text style={{ color: '#047454', marginTop: 12, textAlign: 'center', fontWeight: '600' }}>Infelizmente você esta sem internt!</Text>
                    <Text style={{ color: '#54626b', textAlign: 'center', fontWeight: '600' }}>Procure se conectar para continuatar</Text>

                    <TouchableOpacity onPress={() => { getCache() }}>
                        <Text style={{ color: '#047454', marginTop: 20, fontSize: 25, textAlign: 'center', fontWeight: 'bold' }}>Recarregar</Text>
                    </TouchableOpacity>
                </View>
            );
            break;
        case true:

            return (
                <View style={styles.viewPrincipal}>
                    <StatusBar backgroundColor='#efecef' barStyle="dark-content" />

                    <Text style={styles.textoSelecione}>Selecione a loja principal</Text>
                    <Text style={styles.textoPrecificacao}>Escolha a loja onde sera feita a precificação</Text>

                    <RNPickerSelect
                        style={{ borderRadius: 20 }}
                        placeholder={{ label: 'Selecione a loja', value: trocarLoja }}
                        onValueChange={(value) => { setTrocarLoja(value) }}
                        value={trocarLoja}
                        items={listaDeLojas}
                    />

                    <TouchableOpacity style={estilomodal.btCadastrar} onPress={() => LojaPrincipal()} >
                        <Text style={estilomodal.textoBotao}>Continuar</Text>
                    </TouchableOpacity>
                </View>
            );
            break;
        default:
            return (
                <View style={{ justifyContent: 'center', flex: 1, backgroundColor: 'white' }}>
                    <StatusBar backgroundColor='#efecef' barStyle="dark-content" />
                    {/*Code to show Activity Indicator*/}
                    <ActivityIndicator size={120} color="#047454" />
                    <Text style={{ color: '#047454', marginTop: 12, textAlign: 'center', fontWeight: '600' }}>Carregando...</Text>
                    {/*Size can be large/ small*/}
                </View>
            );
            break;
    }
}


export default lojaprincipal