import React, { useEffect, useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

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

import IconA from 'react-native-vector-icons/AntDesign';
import IconF from 'react-native-vector-icons/FontAwesome'
import IconM from 'react-native-vector-icons/MaterialIcons';
import IconFa from 'react-native-vector-icons/Feather';
import IconO from 'react-native-vector-icons/Octicons';
import IconMc from 'react-native-vector-icons/MaterialCommunityIcons'
import IconFA5 from 'react-native-vector-icons/FontAwesome5'
import IconI from 'react-native-vector-icons/Ionicons'
import IconE from 'react-native-vector-icons/Entypo';


import RNPickerSelect from 'react-native-picker-select';
import styles from "./Estilo";
import { au as sair } from '../../controller/Config';
import store from 'react-native-simple-store';
import Plugin from '../../controller/plugins';
import Crud from '../../controller/Crud';
import estilomodal from '../../controller/estiloModal';


const Perfil = ({ navigation }) => {

    useEffect(() => {
        listaLojas()
        verDado()
    }, [])


    const [novaLoja, setNovaloja] = useState('')
    const [lojas, setLojas] = useState('');
    const [nome, setNome] = useState('');
    const [trocarLoja, setTrocarLoja] = useState('');
    const [deletarLoja, setDeletarLoja] = useState('');
    const [listaDeLojas, setListaDeLolas] = useState([]);

    const [visibilidadeModal, setVisibilidadeModal] = useState(false);
    const [visibilidadeModal2, setVisibilidadeModal2] = useState(false);
    const [visibilidadeModal3, setVisibilidadeModal3] = useState(false);

    function verDado() {
        store.get('user')
            .then((res) => {
                setLojas(res.lojaPrincipal)
            })
    }

    function AdicinarLoja() {

        var nome = novaLoja
        Crud().PostarObjeto('lojas', { nome })
        Plugin().alertas('Nova loja adicionada com sucesso', '')
        setVisibilidadeModal(false)
    }

    function LojaPrincipal() {

        if (trocarLoja === '') {
            Plugin().alertas('voce precisa escolher um loja para trocar', '')
        } else {
            var principal = listaDeLojas[trocarLoja].label
            var id = listaDeLojas[trocarLoja]._key

            store.update('user', {
                lojaPrincipal: principal,
                idLojaPrincipal: id
            })

            Crud().AtualizarObjeto('LojaPrincipal', '', { principal })
            setLojas(principal)
            setVisibilidadeModal2(false)
            navigation.reset({
                routes: [{ name: 'perfil' }]
              });
        }

    }

    function listaLojas() {

        store.get('user')
            .then((res) => {
                var idDoUsuario = res.idUser

                const referencia1 = Plugin().refereciasBancoDeDados('cadastro', '', '', res.idUser)

                referencia1.on('value', (data) => {
                    console.log(data.val());
                    if (data.val() != null) {
                        setNome(data.val().Nome)
                    }
                });

                const referencia = Plugin().refereciasBancoDeDados('lojas', '', '', idDoUsuario)

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

    function deletar(loja) {

        var id = loja
        var nome = loja.nome
        Alert.alert(
            'Deletar',
            "Tem certeza que quer deletar?",
            [
                {
                    text: "Não",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Sim", onPress: () => { Crud().DeletarObjeto('ApagarLista', id), store.delete(nome) } }
            ],
            { cancelable: false }
        );

    }

    function Sair() {
        sair.signOut();
        store.delete("user");
        navigation.reset({
            routes: [{ name: 'login' }]
          });
    }

    function Separator() {
        return <View style={styles.separator} />;
    }


    return (
        <View>
            <StatusBar backgroundColor='#efecef' barStyle="dark-content" />
            <View style={styles.viewNome}>
                <Text style={styles.textoNome}>{nome}</Text>
                <Text style={styles.textoSobrenome}>Loja principal</Text>
            </View>
            <Text style={styles.textoLoja}>{lojas}</Text>

            <View style={styles.viewItems}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.conteinerIconeLojas}>
                        <IconMc name={'storefront-outline'} size={hp('6%')} color="#047454" style={styles.IconeLojas} />
                    </View>

                    <Text style={styles.textoLojas}>Nova loja</Text>

                    <TouchableOpacity style={styles.conteinerIcone} onPress={() => setVisibilidadeModal(true)}>
                        <IconA name={'right'} size={hp('3%')} color="#bdbebd" style={styles.IconeLeft} />
                    </TouchableOpacity>
                </View>

                <View style={styles.conteinerTaxas}>
                    <View style={styles.conteinerIconeLojas}>
                        <IconFA5 name={'exchange-alt'} size={hp('5%')} color="#047454" style={styles.IconeTaxas} />
                    </View>

                    <Text style={styles.textoTaxas}>Loja principal</Text>

                    <TouchableOpacity style={styles.conteinerIcone} onPress={() => setVisibilidadeModal2(true)}>
                        <IconA name={'right'} size={hp('3%')} color="#bdbebd" style={styles.IconeLeft} />
                    </TouchableOpacity>
                </View>


                <View style={styles.conteinerTaxas}>
                    <View style={styles.conteinerIconeLojas}>
                        <IconE name={'open-book'} size={hp('5%')} color="#047454" style={styles.IconeTaxas} />
                    </View>

                    <Text style={styles.textoTaxas}>Legendas</Text>

                    <TouchableOpacity style={styles.conteinerIcone} onPress={() => setVisibilidadeModal3(true)}>
                        <IconA name={'right'} size={hp('3%')} color="#bdbebd" style={styles.IconeLeft} />
                    </TouchableOpacity>
                </View>


            </View>



            <TouchableOpacity style={styles.conteinerSair} onPress={() => Sair()}>
                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                    <IconI name={'exit-outline'} size={hp('4%')} color="#bdbebd" style={styles.IconeSair} />
                    <Text style={styles.textoSair}>Sair</Text>
                </View>

            </TouchableOpacity>



            <Modal style={{ flex: 1 }} onRequestClose={() => setVisibilidadeModal(false)} visible={visibilidadeModal} animationType="fade" transparent={true}>
                <View style={estilomodal.fundoModal}>
                    <View style={estilomodal.Modal}>
                        <IconA name={'close'} size={29} style={{ color: '#54626b', alignSelf: 'flex-end', }} onPress={() => setVisibilidadeModal(false)} />
                        <Text style={estilomodal.textoModal}>Adicione nova loja ou troque a loja principal</Text>

                        <TextInput style={estilomodal.formInput}
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
                </View>

            </Modal>

            <Modal style={{ flex: 1 }} onRequestClose={() => setVisibilidadeModal2(false)} visible={visibilidadeModal2} animationType="fade" transparent={true}>
                <View style={estilomodal.fundoModal}>
                    <View style={estilomodal.Modal}>
                        <IconA name={'close'} size={29} style={{ color: '#54626b', alignSelf: 'flex-end', }} onPress={() => setVisibilidadeModal2(false)} />
                        <Text style={estilomodal.textoModal}>Selecione a loja principal</Text>

                        <RNPickerSelect
                            style={{ borderRadius: 20 }}
                            placeholder={{ label: 'Selecione a loja', value: trocarLoja }}
                            onValueChange={(value) => { setTrocarLoja(value) }}
                            value={trocarLoja}
                            items={listaDeLojas}
                        />

                        <TouchableOpacity style={estilomodal.btCadastrar} onPress={() => LojaPrincipal()} >
                            <Text style={estilomodal.textoBotao}>Selecionar</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>


            <Modal style={{ flex: 1 }} onRequestClose={() => setVisibilidadeModal3(false)} visible={visibilidadeModal3} animationType="fade" transparent={true}>
                <View style={estilomodal.fundoModal}>
                    <View style={estilomodal.Modal}>
                        <IconA name={'close'} size={29} style={{ color: '#54626b', alignSelf: 'flex-end', }} onPress={() => setVisibilidadeModal3(false)} />
                        <Text style={estilomodal.textoModal}>Legendas</Text>
                        <Text style={styles.textoModal1}>Taxas</Text>
                        <Text style={styles.textoModal2}>- Lucro líquido alvo: porcentagem de lucro liquido esperada receber na venda de cada produto.</Text>
                        <Text style={styles.textoModal2}>- Taxa do gateway:  porcentagem cobrada do gateway de pagamentos a venda de cada produto.</Text>   
                        <Text style={styles.textoModal2}>- Taxa da loja: porcentagem cobrada pela responsável por criar a loja sobre a venda de cada produto.</Text>            
                        <Text style={styles.textoModal2}>- Imposto: porcentagem destinada a todo e qualquer imposto sobre a venda de cada produto.</Text>

                        <Text style={styles.textoModal1}>Métricas</Text>    
                        <Text style={styles.textoModal2}>- CPA (custo por ação) alvo: valor ideal para gastar em aquisição de um produto para de fato obter lucro.</Text>
                        <Text style={styles.textoModal2}>- Custo real:  valor que soma custo do produto frete mais todas as taxas.</Text>    
                        <Text style={styles.textoModal2}>- Lucro alvo: valor ideal de lucro sobre cada produto.</Text>    
                        <Text style={styles.textoModal2}>- Lucro real: quanto de fato será seu lucro com o preço recomendado.</Text> 
                    </View>
                </View>
            </Modal>

        </View>

    );
}

export default Perfil