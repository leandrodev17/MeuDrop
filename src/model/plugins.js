import { db, au as autenticar } from './Config';
import store from 'react-native-simple-store';

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
    StatusBar,
} from 'react-native';

function Plugins() {

    function requisitar() {
        const referencia = refereciasBancoDeDados('Taxas')
        return new Promise((get, err) => {
            referencia.on('value', (data) => {
                get(data.val().principal)
            });
        })
    }

    function refereciasBancoDeDados(caminho, id, idloja, uid) {

        var idDaLoja = idloja
        var idUser = uid
        var inicio = `Usuarios/${idUser}/conta`

        const refencia = {
            cadastro: db.ref(`${inicio}/cadastro/`),
            lojas: db.ref(`${inicio}/lojas/lista`),
            AdicinarProduto: db.ref(`${inicio}/lojas/lista/${idDaLoja}`),
            produtos: db.ref(`${inicio}/lojas/lista/${idDaLoja}/produdos`),
            atualizarLista: db.ref(`${inicio}/lojas/lista/${idDaLoja}/produdos/${id}`),
            ApagarLista: db.ref(`${inicio}/lojas/lista/${id}`),
            LojaPrincipal: db.ref(`${inicio}/lojas`),
            Taxas: db.ref(`${inicio}/lojas/lista/${idDaLoja}/taxas`),
        }

        return refencia[caminho]
    }


    function mensagemDeErro(codigo){
 
        const codigos = {
            'auth/user-not-found': 'Não há registro de usuário correspondente a este identificador. O usuário pode ter sido excluído.',
            'auth/wrong-password': 'A senha é inválida ou o usuário não possui uma senha.',
            'auth/invalid-email': 'O endereço de e-mail está formatado incorretamente.',
            'auth/weak-password': 'A senha deve ter pelo menos 6 caracteres',
            'auth/email-already-in-use':'O endereço de e-mail já está sendo usado por outra conta.rr'
        }
        alertas(codigos[codigo])
    }


    function filtrarBusca(nome, listaOriginal) {
        var novaLista = []

        novaLista = listaOriginal.filter(function (campo) {
            return campo.nome === nome
        });

        if (novaLista == []) {
            novaLista = false
        } else {
            return novaLista
        }
    }

    function cadastrar(nome, email, senha, confimacao) {
        if (senha === confimacao && nome != null) {
            autenticar.createUserWithEmailAndPassword(email, senha).then((data) => {
                //success callback
                db.ref(`Usuarios/${data.user.uid}/conta/cadastro`).set({
                    Nome: nome,
                    email: email,
                    id: data.user.uid
                })

                store.update('user', {
                    idUser: data.user.uid
                })

                alertas('Cadastro feito com sucesso', '')
            }).catch((erro) => {
                alert(erro.message);
            })
        } else {
            alert('Senha diferente ou campo vasio')
        }
        var estado = false
        return estado
    }

    function login(email, senha) {
        if (email != null && senha != null) {
            autenticar.signInWithEmailAndPassword(email, senha).then((data) => {
                console.log(data.user.uid)
                store.update('user', {
                    idUser: data.user.uid
                })
                Actions.tabbar()
            }).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage)
                // ...
            });
        } else {
            alert('campos vasios');
        }
    }


    function alertas(mensagem, assunto) {
        Alert.alert(
            '',
            mensagem,
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
        );
    }

    return {
        refereciasBancoDeDados,
        requisitar,
        filtrarBusca,
        cadastrar,
        login,
        alertas,
        mensagemDeErro
    }

}


export default Plugins