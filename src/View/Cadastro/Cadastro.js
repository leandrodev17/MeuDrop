import React, { useEffect, useState } from 'react';

import {
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Alert,
    ActivityIndicator,
    KeyboardAvoidingView,
    SafeAreaView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
     Dimensions,
     StatusBar
} from 'react-native';

import styles from "./Estilo";
import Plugin from '../../controller/plugins';
import store from 'react-native-simple-store';
import { db, au as autenticar } from '../../controller/Config';


const Cadastro = ({ navigation }) => {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confimacao, setConfimarcao] = useState('');
    const [estado, setEstado] = useState(false);

     function cadastrar() {

        // Plugin().cadastrar(nome, email, senha, confimacao)
        if (senha === confimacao && nome != '' && senha != '') {
           
             autenticar.createUserWithEmailAndPassword(email, senha).then((data) => {
                setTimeout(function () {
                    setEstado(false);
                }, 2500);
                //success callback
                db.ref(`Usuarios/${data.user.uid}/conta/cadastro`).set({
                    Nome: nome,
                    email: email,
                    id: data.user.uid
                })

                store.update('user', {
                    idUser: data.user.uid
                })

                Plugin().alertas('Cadastro realizado com sucesso', '')
                navigation.navigate('nova_loja')
            }).catch((error) => {
                setTimeout(function () {
                    setEstado(false);
                }, 200);
                var errorCode = error.code;
                var errorMessage = error.message;
                
                console.log(error.code)
                Plugin().mensagemDeErro(errorCode)
            })
        } else {
            setTimeout(function () {
                setEstado(false);
            }, 200);
            Plugin().alertas('Senha diferente ou campo vasio')
        }

    }

    function tipoBotao() {

        if (estado == false) {
            return <Text style={styles.textoBotao}>Cadastrar</Text>
        } else {
            return <ActivityIndicator
                color='#fff'
                size={20}
                style={styles.activityIndicator}
            />
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
                    <Text style={styles.TextMyprice}>MeuDrop</Text>
                    <Text style={styles.TextPrecificacao}>Precificação para Dropshipping</Text>
                    <Text style={styles.TextCadastrar}>Cadastrar</Text>


                    <TextInput style={styles.formInputs}
                        placeholder={'Nome'}
                        placeholderTextColor={'#bdbebd'}
                        underlineColorAndroid='#D3D3D3'
                        onChangeText={
                            (nome) => setNome(nome)
                        }
                    />

                    <TextInput style={styles.formInputs}
                        placeholder={'Email'}
                        keyboardType={'email-address'}
                        autoCapitalize={'none'}
                        placeholderTextColor={'#bdbebd'}
                        underlineColorAndroid='#D3D3D3'
                        onChangeText={
                            (nome) => setEmail(nome)
                        }
                    />

                    <TextInput style={styles.formInputs}
                        placeholder={'Senha'}
                        secureTextEntry={true}
                        autoCapitalize={'none'}
                        placeholderTextColor={'#bdbebd'}
                        underlineColorAndroid='#D3D3D3'
                        onChangeText={
                            (nome) => setSenha(nome)
                        }
                    />

                    <TextInput style={styles.formInputs}
                        placeholder={'Confirme a senha'}
                        secureTextEntry={true}
                        autoCapitalize={'none'}
                        placeholderTextColor={'#bdbebd'}
                        underlineColorAndroid='#D3D3D3'
                        onChangeText={
                            (nome) => setConfimarcao(nome)
                        }
                    />


                    <TouchableOpacity style={styles.btlogin} onPress={() => { cadastrar(), setEstado(true) }} >
                        {tipoBotao()}
                    </TouchableOpacity>

                    <Text style={styles.textoNaotemConta}>Já possui conta?</Text>

                    <TouchableOpacity onPress={() => { navigation.navigate('login') }}>
                        <Text style={styles.textoEntrar}>Entrar</Text>
                    </TouchableOpacity>


                </View>

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default Cadastro