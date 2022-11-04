import React, { useState, useEffect } from 'react';
import { StackActions } from '@react-navigation/native';

import {
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Alert,
    Modal,
    ActivityIndicator,
    StatusBar
} from 'react-native';


import IconA from 'react-native-vector-icons/AntDesign';

import estilomodal from '../../controller/estiloModal';
import styles from "./Estilo";
import Plugin from '../../controller/plugins';
import store from 'react-native-simple-store';
import { au as autenticar } from '../../controller/Config';

const Login = ({ navigation }) => {
    const [emailRecuperacao, setRecuperacao] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [estado, setEstado] = useState(false);
    const [visibilidadeModal, setVisibilidadeModal] = useState(false);

    function logar() {

        if (email != null && senha != null) {

            autenticar.signInWithEmailAndPassword(email, senha).then((data) => {
                setTimeout(function () {
                    setEstado(false);
                }, 2500);
                store.update('user', {
                    idUser: data.user.uid
                })
                alert('logados')
                navigation.dispatch(StackActions.push('loja_principal', { user: data.user.uid }))
            }).catch(function (error) {
                setTimeout(function () {
                    setEstado(false);
                }, 200);
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;

                console.log(errorMessage + ' esse code ' + errorCode);
                Plugin().mensagemDeErro(errorCode)

            });
        } else {
            Plugin().alertas('campos vasios');
        }
    }

    function esqueciSenha() {
        if (emailRecuperacao != null) {
            autenticar.sendPasswordResetEmail(emailRecuperacao)
                .then(function (user) {
                    setVisibilidadeModal(true)
                    Plugin().alertas('Enviamos um link para o seu email para recuperar sua senha, não esquece de verifica a caixa de Spam!');
                }).catch(function (e) {
                    console.log(e)
                })
        }
    }

    function tipoBotao() {

        if (estado == false) {
            return <Text style={styles.textoBotao}>Entrar</Text>
        } else {
            return <ActivityIndicator
                color='#fff'
                size={20}
                style={styles.activityIndicator}
            />
        }
    }


    return (

        <View style={styles.fundo}>
           <StatusBar backgroundColor='#efecef' barStyle="dark-content" />

            <Text style={styles.TextMyprice}>MeuDrop</Text>
            <Text style={styles.TextPrecificacao}>Precificação para Dropshipping</Text>
            <Text style={styles.TextCadastrar}>Entrar</Text>

            <TextInput style={styles.formInput}
                placeholder={'Email'}
                keyboardType={'email-address'}
                autoCapitalize={'none'}
                placeholderTextColor={'#bdbebd'}
                underlineColorAndroid='#D3D3D3'
                onChangeText={
                    (nome) => setEmail(nome)
                }
            />

            <TextInput style={styles.formInput}
                placeholder={'Senha'}
                autoCapitalize={'none'}
                secureTextEntry={true}
                placeholderTextColor={'#bdbebd'}
                underlineColorAndroid='#D3D3D3'
                onChangeText={
                    (nome) => setSenha(nome)
                }
            />
            <TouchableOpacity onPress={() => setVisibilidadeModal(true)}>
                <Text style={styles.TextEsqueciSenha}>Esqueci minha senha</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btlogin} onPress={() => { logar(), setEstado(true) }}>
                {tipoBotao()}
            </TouchableOpacity>

            <Text style={styles.textoNaotemConta}>Ainda não possui conta?</Text>

            <TouchableOpacity onPress={() => navigation.navigate('cadastro')}>
                <Text style={styles.textoEntrar} >Cadastrar</Text>
            </TouchableOpacity>


            <Modal style={{ flex: 1 }} onRequestClose={() => setVisibilidadeModal(false)} visible={visibilidadeModal} animationType="fade" transparent={true}>
                <View style={estilomodal.fundoModal}>
                    <View style={estilomodal.Modal}>
                        <IconA name={'close'} size={29} style={{ color: '#54626b', alignSelf: 'flex-end', }} onPress={() => setVisibilidadeModal(false)} />
                        <Text style={estilomodal.textoModal}>A gente vai enviar um link de recuperação no seu email</Text>

                        <TextInput style={estilomodal.formInput}
                            placeholder={'Seu email'}
                            // defaultValue={nomeProduto}
                            placeholderTextColor={'#bdbebd'}
                            underlineColorAndroid='#D3D3D3'
                            onChangeText={
                                (nome) => setRecuperacao(nome)
                            }
                        />

                        <TouchableOpacity style={estilomodal.btCadastrar} onPress={() => esqueciSenha()} >
                            <Text style={estilomodal.textoBotao}>Enviar link</Text>
                        </TouchableOpacity>

                    </View>
                </View>

            </Modal>

        </View>
    );
}

export default Login