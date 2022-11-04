import React, { useState, useEffect } from 'react';
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
    Alert,
    StatusBar,
    ActivityIndicator,
} from 'react-native';

// icones
import IconA from 'react-native-vector-icons/AntDesign';
import IconF from 'react-native-vector-icons/FontAwesome'
import IconM from 'react-native-vector-icons/MaterialIcons';
import IconFa from 'react-native-vector-icons/Feather';
import IconO from 'react-native-vector-icons/Octicons';
import IconMc from 'react-native-vector-icons/MaterialCommunityIcons'
import IconFA5 from 'react-native-vector-icons/FontAwesome5'

import {Picker} from '@react-native-picker/picker';
import store from 'react-native-simple-store';
import CurrencyInput from 'react-native-currency-input';
import styles from "./Estilo";
import estilomodal from '../../model/estiloModal';
import AbrirLink from '../../model/AbrirLink';
import Crud from '../../model/Crud';
import Plugin from '../../model/plugins';

import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
} from 'react-native-admob'

const Add = ({ navigation }) => {

    useEffect(() => {
        listaDeProdutos()
        cotacaoDolar()
    }, [])

    const [listaProduto, setListaProduto] = useState('');
    const [listaRenderizada, setListaRenderizada] = useState('')
    const [nomeFltro, setNomeFltro] = useState();
    const [visibilidadeModal, setVisibilidadeModal] = useState(false);
    const [visibilidadeModal2, setVisibilidadeModal2] = useState(false);

    const [precoDolar, setPrecoDolar] = useState(0);
    const [lucro, setLucro] = useState(0);
    const [markup, setMarkup] = useState(0);
    const [total, setTotal] = useState(0);

    const [cpa, setCpa] = useState(0);
    const [custoReal, setCustoReal] = useState(0);
    const [lucroAlvo, setlucroAlvo] = useState(0);
    const [lucroReal, setLucroReal] = useState(0);

    const [nomeProduto, setNomeProduto] = useState('')
    const [nomeFornecedor, setNomeFornecedor] = useState('');
    const [custo, setCusto] = useState('');
    const [frete, setFrete] = useState('');
    const [link, setLink] = useState('');

    const [tipoForm, setTipoForm] = useState('cadastrar');
    const [moeda, setMoeda] = useState('$')
    const [idEditado, setIdEditado] = useState('');


    function listaDeProdutos() {

        store.get('user')
            .then((res) => {

                if (res.idLojaPrincipal != undefined) {


                    listaTaxas(res.idLojaPrincipal, res.idUser)
                    console.log(markup);
                    const referencia = Plugin().refereciasBancoDeDados('produtos', '', res.idLojaPrincipal, res.idUser)

                    referencia.on('value', (snap) => {
                        let items = [];
                        let nomeResumido
                        let mkp = markup;
                        let sugerido
                        let custo
                        let frete

                        console.log(mkp);
                        snap.forEach((child) => {

                            custo = child.val().ValorCusto
                            frete = child.val().ValorFrete

                            sugerido = (custo * mkp) + frete

                            nomeResumido = child.val().nome
                            var fornecedorResumido = child.val().Fornecedor
                            if (nomeResumido.length >= 20) {
                                nomeResumido = nomeResumido.substr(0, 19) + '...'
                            }

                            if (fornecedorResumido.length >= 23) {
                                nomeResumido = nomeResumido.substr(0, 23) + '...'
                            }


                            items.push({
                                nome: nomeResumido,
                                PrecoSugerido: sugerido.toFixed(2),
                                NomeOriginal: child.val().nome,
                                fornecedor: fornecedorResumido,
                                custo: custo.toFixed(2),
                                frete: frete.toFixed(2),
                                url: child.val().url,
                                id: child.key
                            });
                        });

                        if (items == []) {
                            setListaProduto(items)
                        } else {
                            setListaRenderizada(items)
                            setListaProduto(items)
                        }
                    })
                } else {
                    navigation.replace('tab')
                }
            })

    }

    function salvar() {
        // AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712');
        AdMobInterstitial.setAdUnitID('ca-app-pub-6775817017625840/2046828589');
        AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());

        var nome = nomeProduto
        var Fornecedor = nomeFornecedor

        var ValorCusto;
        var ValorFrete;

        if (moeda == 'R$') {
            ValorCusto = custo
            ValorFrete = frete
        } else {
            ValorCusto = custo * precoDolar
            ValorFrete = frete * precoDolar
        }
        var url = link
        var tipoMoeda = moeda


        Crud().PostarObjeto('produtos', { nome, Fornecedor, ValorCusto, ValorFrete, url, tipoMoeda })

        setVisibilidadeModal(false)
        setCusto('')
        setFrete('')
    }


    function Filtrar() {
        const lista = Plugin().filtrarBusca(nomeFltro, listaProduto)
        if (lista != false) {
            setListaRenderizada(lista)
        } else {
            Alert.alert('Esse produto não existe na sua lista');
        }
    }


    function Deletar(produto) {
        var id = produto
        Alert.alert(
            'Deletar',
            "Tem certeza que quer deletar?",
            [
                {
                    text: "Não",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Sim", onPress: () => Crud().DeletarObjeto('atualizarLista', id) }
            ],
            { cancelable: false }
        );
    }

    function estadoInicial() {
        setNomeProduto('')
        setNomeFornecedor('')
        setCusto('')
        setFrete('')
        setLink('')
    }

    function valoresEditaveis(item) {
        setNomeProduto(item.nome)
        setNomeFornecedor(item.fornecedor)
        setCusto(item.custo)
        setFrete(item.frete)
        setLink(item.url)
        setIdEditado(item.id)
    }


    function Editar() {

        var nome = nomeProduto
        var Fornecedor = nomeFornecedor
        var ValorCusto;
        var ValorFrete;

        if (moeda == 'R$') {
            ValorCusto = custo
            ValorFrete = frete
        } else {
            ValorCusto = custo * precoDolar
            ValorFrete = frete * precoDolar
        }
        var url = link
        var id = idEditado

        Crud().AtualizarObjeto('atualizarLista', id, { nome, Fornecedor, ValorCusto, ValorFrete, url })
    }


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

    function listaTaxas(idDaLoja, idDoUsuario) {

        const referencia1 = Plugin().refereciasBancoDeDados('Taxas', '', idDaLoja, idDoUsuario)

        referencia1.on('value', (data) => {
            // console.log(data.val());
            if (data.val() != null) {

                var total = Number(data.val().gateway) + Number(data.val().loja) + Number(data.val().Imposto) + Number(data.val().lucros)

                setTotal(total / 100)
                setMarkup(data.val().Markup)
                setLucro(Number(data.val().lucros) / 100)
            }
        });
    }


    function metricas(item) {
        // console.log(Number(item.PrecoSugerido))
        setCpa((Number(item.PrecoSugerido) * 0.2).toFixed(2))
        var custoReal = (Number(item.custo) + Number(item.frete)) + Number(item.PrecoSugerido) * total
        setCustoReal(custoReal.toFixed(2))
        setlucroAlvo((Number(item.PrecoSugerido) * lucro).toFixed(2))
        // console.log(lucro)
        setLucroReal((Number(item.PrecoSugerido) - custoReal).toFixed(2))

    }

    function tipoBotao() {
        if (tipoForm == 'cadastrar') {
            return <TouchableOpacity style={styles.btCadastrar} onPress={salvar} >
                <Text style={styles.textoBotao}>Precificar</Text>
            </TouchableOpacity>
        } else {
            return <TouchableOpacity style={styles.btCadastrar} onPress={() => { Editar(), setVisibilidadeModal(false) }}>
                <Text style={styles.textoBotao}>Editar</Text>
            </TouchableOpacity>
        }
    }

    function TextoForm() {

        if (tipoForm == 'cadastrar') {
            return 'Preencha para adicionar um novo produto'
        } else {
            return 'Edite o campo desejado'
        }
    }

    const options = [
        { label: "Real", value: true },
        { label: "Dolar", value: false },
    ];

    if (listaProduto === '') {
        return (
            <View style={{ justifyContent: 'center', flex: 1 }}>
                <StatusBar backgroundColor='#efecef' barStyle="dark-content" />
                <ActivityIndicator
                    color='#047454'
                    size={120}
                    style={styles.activityIndicator}
                />
            </View>
        )
    } else {
        return (
            <View>
                <StatusBar backgroundColor='#efecef' barStyle="dark-content" />

                <Text style={styles.textoSeusProdutos}>Seus produtos</Text>
                <View style={{ alignSelf: 'center' }}>


                    <View style={styles.barraDePequisaDirection}>

                        <TextInput
                            style={styles.InputBarraDePequisa}
                            returnKeyType={'search'}
                            onSubmitEditing={Filtrar}
                            placeholder={'Buscar produtos'}
                            placeholderTextColor={'#bdbebd'}
                            underlineColorAndroid='transparent'
                            onChangeText={text => { setNomeFltro(text) }}
                        />

                        <TouchableOpacity onPress={Filtrar}>
                            <View style={styles.containerPesquisa}>
                                <IconM name={'search'} size={hp('4.5%')} color="#047454"
                                    style={styles.iconePesquisa} />
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>

                <TouchableOpacity onPress={() => { setListaRenderizada(listaProduto) }}>
                    <Text style={styles.textoListaCompleta}>Lista completa</Text>
                </TouchableOpacity>

                <FlatList
                    data={listaRenderizada}
                    style={styles.listaGeral}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.listaPrincipal}>
                                <View style={{ flexDirection: 'row' }}>
                                    <IconFa name={'shopping-bag'} size={15} color="#54626b" style={styles.iconeProduto} />
                                    <Text style={styles.textoListaNome}>{item.nome}</Text>
                                    <AbrirLink url={item.url}>abrir</AbrirLink>
                                </View>

                                <Text style={styles.textoListaPreco}>R$ {item.custo}</Text>
                                <Text style={styles.textoListaPrecoSugerido}>R$ {item.PrecoSugerido}</Text>


                                <View style={styles.viewFrete}>
                                    <View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <IconM name={'store'} size={22} color="#047454" style={styles.iconeLoja} />
                                            <Text style={styles.textoListaPrecoFrete}>{item.fornecedor}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <IconMc name={'truck-delivery-outline'} size={22} color="#047454" style={styles.iconeFrete} />
                                            <Text style={styles.textoListaPrecoFrete}>R$ {item.frete}</Text>
                                        </View>
                                    </View>


                                    <TouchableOpacity onPress={() => Deletar(item.id)} style={styles.iconeLixeira}>
                                        <IconM name={'delete-outline'} size={30} color="#047454" />
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => { valoresEditaveis(item), setTipoForm('editar'), setVisibilidadeModal(true) }} style={styles.iconeEditar}>
                                        <IconA name={'edit'} size={30} color="#047454" />
                                    </TouchableOpacity>

                                </View>


                                <TouchableOpacity onPress={() => { setVisibilidadeModal2(true), metricas(item) }}>
                                    <Text style={styles.textoMetricas}>Ver Metricas</Text>
                                </TouchableOpacity>


                            </View>
                        )
                    }}
                />

                <Modal style={{ flex: 1 }} onRequestClose={() => setVisibilidadeModal(false)} visible={visibilidadeModal} animationType="fade" transparent={true}>
                    <View style={styles.fundoModal}>
                        <View style={styles.Modal}>
                            <IconA name={'close'} size={29} style={{ color: '#54626b', alignSelf: 'flex-end', }} onPress={() => setVisibilidadeModal(false)} />
                            <Text style={styles.textoModal}>{TextoForm()}</Text>

                            <TextInput style={styles.formInput}
                                placeholder={'Nome'}
                                defaultValue={nomeProduto}
                                placeholderTextColor={'#bdbebd'}
                                underlineColorAndroid='#D3D3D3'
                                onChangeText={
                                    (nome) => setNomeProduto(nome)
                                }
                            />

                            <TextInput style={styles.formInput}
                                placeholder={'Fornocedor'}
                                defaultValue={nomeFornecedor}
                                placeholderTextColor={'#bdbebd'}
                                underlineColorAndroid='#D3D3D3'
                                onChangeText={
                                    (nome) => setNomeFornecedor(nome)
                                }
                            />

                            <TextInput style={styles.formInput}
                                placeholder={'Link EX: https://...'}
                                defaultValue={link}
                                placeholderTextColor={'#bdbebd'}
                                underlineColorAndroid='#D3D3D3'
                                onChangeText={
                                    (nome) => setLink(nome)
                                }
                            />

                            <Text style={styles.textoEscolhaMoeda}>Selecione a moeda</Text>

                            <Picker
                                selectedValue={moeda}
                                style={styles.escolhaMoeda}
                                onValueChange={(itemValue, itemIndex) => setMoeda(itemValue)}
                            >
                                <Picker.Item label="Real" value="R$" />
                                <Picker.Item label="Dolar" value="$" />
                            </Picker>


                            <CurrencyInput
                                placeholder={'Custo'}
                                placeholderTextColor={'#bdbebd'}
                                underlineColorAndroid='#D3D3D3'
                                style={styles.formInput}
                                value={custo}
                                onChangeValue={setCusto}
                                unit={moeda}
                                delimiter=","
                                separator="."
                                precision={2}
                            />

                            <CurrencyInput
                                placeholder={'Frete'}
                                placeholderTextColor={'#bdbebd'}
                                underlineColorAndroid='#D3D3D3'
                                style={styles.formInput}
                                value={frete}
                                onChangeValue={setFrete}
                                unit={moeda}
                                delimiter=","
                                separator="."
                                precision={2}
                            />

                            {tipoBotao()}

                        </View>
                    </View>
                </Modal>

                <Modal style={{ flex: 1 }} onRequestClose={() => setVisibilidadeModal2(false)} visible={visibilidadeModal2} animationType="fade" transparent={true}>
                    
                    <View style={estilomodal.fundoModal}>
                        <View style={estilomodal.Modal}>
                            <IconA name={'close'} size={29} style={{ color: '#54626b', alignSelf: 'flex-end', }} onPress={() => setVisibilidadeModal2(false)} />
                            <Text style={styles.textoModal}>Métricas sobre o produto</Text>

                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.textoTituloModalMetrica}>CPA alvo   </Text>
                                <Text style={styles.textoModalMetrica}>R${cpa}</Text>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.textoTituloModalMetrica}>Custo real</Text>
                                <Text style={styles.textoModalMetrica}>R${custoReal}</Text>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.textoTituloModalMetrica}>Lucro alvo</Text>
                                <Text style={styles.textoModalMetrica}>R${lucroAlvo}</Text>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.textoTituloModalMetrica}>Lucro real</Text>
                                <Text style={styles.textoModalMetrica}>R${lucroReal}</Text>
                            </View>
                        </View>
                    </View>
                </Modal>

                <TouchableOpacity style={styles.btAdd} onPress={() => { setVisibilidadeModal(true), setTipoForm('cadastrar'), estadoInicial() }}>
                    <IconMc name={'plus-circle'} size={60} style={{ color: '#047454' }} />
                </TouchableOpacity>
            </View>
        );
    }
}

export default Add