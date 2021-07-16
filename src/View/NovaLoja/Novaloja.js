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
    Alert, StatusBar
} from 'react-native';


import styles from "./Estilo";
import store from 'react-native-simple-store';
import Plugin from '../../model/plugins';
import Crud from '../../model/Crud';
import estilomodal from '../../model/estiloModal';


const NovaLoja = ({ navigation, routes }) => {

    const [novaLoja, setNovaloja] = useState('')


    function AdicinarLoja() {
        var nome = novaLoja
        if (nome != '') {
            Crud().LojaInicial('lojas', { nome }, nome)
            Plugin().alertas('Loja adicionada com sucesso', '')
            navigation.reset({
                routes: [{ name: 'taxas_inicial' }]
              });
        }
    }

    return (
        <View style={styles.viewPrincipal}>
           <StatusBar backgroundColor='#efecef' barStyle="dark-content" />


            <Text style={styles.textoAdicione}>Adicione uma loja</Text>
            <Text style={styles.textoVoceOode}>Você pode adicionar mais lojas acessando a tela perfil e escolher qual delas é a principal</Text>

            <TextInput style={styles.formInput}
                placeholder={'Nome'}
                // defaultValue={nomeProduto}
                placeholderTextColor={'#bdbebd'}
                underlineColorAndroid='#D3D3D3'
                onChangeText={
                    (nome) => setNovaloja(nome)
                }
            />

            <TouchableOpacity style={estilomodal.btCadastrar} onPress={() => AdicinarLoja()} >
                <Text style={estilomodal.textoBotao}>Adicinar</Text>
            </TouchableOpacity>

        </View>
    );
}



export default NovaLoja