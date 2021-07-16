

import React, { useEffect, useState } from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { au as autenticar } from '../model/Config';
import NetInfo from "@react-native-community/netinfo";
import Icon from 'react-native-vector-icons/Feather';
import {
    Text,
    View,
    ActivityIndicator,
    AsyncStorage,
    StyleSheet,
    TouchableOpacity,
    StatusBar
} from 'react-native';

//screens
import cadastro from '../View/Cadastro/Cadastro'
import NovaLoja from '../View/NovaLoja/Novaloja'
import lojaPrincipal from '../View/LojaPrincipal/Lojaprincipal'
import taxas from '../View/Configuracao(taxas)/Configuracao'
import Login from '../View/Login/Login'
import tab from './barra'

const TabIcon = ({ focused, iconName, title }) => {
    var color = focused ? '#047454' : '#959da4';
    return (
        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', alignSelf: 'center', justifyContent: 'center', position: 'absolute' }}>
            <Icon style={{ color }} name={iconName || "circle"} size={24} />
            <Text style={{ color, fontSize: 9, fontWeight: 'bold' }}>{title}</Text>
        </View>
    );
}

import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
} from 'react-native-admob'



const Stack = createStackNavigator();

const Routes = () => {

    const [estadoLogin, setEstadoLogin] = useState('')
    const [estadoNet, setEstadoNet] = useState('')

    useEffect(() => {
        getCache()
        //AdMobRewarded.setAdUnitID('ca-app-pub-3940256099942544/5224354917');
        async function anuncio() {
           await AdMobInterstitial.setAdUnitID('ca-app-pub-6775817017625840/2046828589');
           carregar()
        }
        anuncio()

    }, [estadoNet])

    async function carregar() {
        await AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
    }




    async function getCache() {
        try {
            NetInfo.fetch().then(state => {
                autenticar.onAuthStateChanged(function (user) {
                    if (user) {
                        setEstadoLogin('tab')
                    } else {
                        setEstadoLogin('login')
                    }
                    setEstadoNet(Boolean(state.isInternetReachable))
                })
                
            });
        } catch (e) {
            console.log("error", e);
        }
    }
    
    // function tipoBotao() {

    //     if (estado == false) {
    //         return <Text style={{ color: '#047454', marginTop: 20, fontSize:25, textAlign: 'center', fontWeight: 'bold' }}>Recarregar</Text>
    //     } else {
    //         return <ActivityIndicator
    //             color='#047454'
    //             size={20}
    //             style={styles.activityIndicator}
    //         />
    //     }
    // }

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
                    <Text style={{ color: '#047454', marginTop: 20, fontSize:25, textAlign: 'center', fontWeight: 'bold' }}>Recarregar</Text>
                    </TouchableOpacity>
                </View>
            );
            break;
        case true:
            
            return (
                <NavigationContainer>
                    <Stack.Navigator initialRouteName={estadoLogin}>
                        <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
                        <Stack.Screen name="tab" component={tab} options={{ headerShown: false }} />
                        <Stack.Screen name="taxas_inicial" component={taxas} options={{ headerShown: false }} />
                        <Stack.Screen name="cadastro" component={cadastro} options={{ headerShown: false }} />
                        <Stack.Screen name="nova_loja" component={NovaLoja} options={{ headerShown: false }} />
                        <Stack.Screen name="loja_principal" component={lojaPrincipal} options={{ headerShown: false }} />
                    </Stack.Navigator>
                </NavigationContainer>
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

export default Routes;