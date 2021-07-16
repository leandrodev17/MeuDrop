import { db } from './Config';
import Plugins from './plugins';
import {
    Alert, Button, Linking, StyleSheet, Text,
    View, TextInput, TouchableOpacity,
} from "react-native";
import store from 'react-native-simple-store';


function CRUD() {

    async function PegarObjetos() {
        var info
        await Plugins().requisitar().then(data => {
            console.log(data);
            info = data
        })
        console.log(info);

        return info
    }

    function PostarObjeto(ref, obg) {
        store.get('user')
            .then((res) => {
                var idDaLoja = res.idLojaPrincipal
                var idDoUsuario = res.idUser

                const referencia = Plugins().refereciasBancoDeDados(ref, '', idDaLoja, idDoUsuario)

                referencia.push(obg).then((data) => {
                    console.log('posto');
                }).catch((error) => {
                    console.log('error ', error)
                })
            })

    }


    function DeletarObjeto(ref, id) {
        store.get('user')
            .then((res) => {

                const referencia = Plugins().refereciasBancoDeDados(ref, id, res.idLojaPrincipal, res.idUser)

                referencia.remove().then((data) => {
                    console.log('foi ', data)
                }).catch((error) => {
                    console.log('error ', error)
                })
            })
    }

    function AtualizarObjeto(ref, id, obj) {
        store.get('user')
            .then((res) => {

                const referencia = Plugins().refereciasBancoDeDados(ref, id, res.idLojaPrincipal, res.idUser)

                referencia.update(obj).then((data) => {
                    console.log('atualizo');

                }).catch((error) => {
                    console.log('error ', error)
                })
            })
    }


    function LojaInicial(ref, obg, nome) {
        store.get('user')
            .then((res) => {
                var idDoUsuario = res.idUser

                const referencia = Plugins().refereciasBancoDeDados(ref, '', '', idDoUsuario)

                referencia.push(obg).then((data) => {

                    store.update('user', {
                        idLojaPrincipal: data.key,
                        lojaPrincipal: nome
                    })

                }).catch((error) => {
                    console.log('error ', error)
                })
            })
    }

    return {
        PegarObjetos,
        PostarObjeto,
        DeletarObjeto,
        AtualizarObjeto,
        LojaInicial
    }

}


export default CRUD