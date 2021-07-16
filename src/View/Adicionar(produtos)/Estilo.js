import { StyleSheet, Dimensions } from 'react-native';
const { width: WIDTH } = Dimensions.get('window')
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default styles = StyleSheet.create({
    fundo: {
        flex: 1,
        backgroundColor: 'white'
    },

    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: hp('30%')
    },

    textoSeusProdutos: {
        fontSize: hp('4%'),
        alignSelf: 'center',
        marginTop: hp('3%'),
        fontWeight: '500',
        color: '#047454'
    },


    barraDePequisaDirection: {
        flexDirection: 'row',
    },

    InputBarraDePequisa: {
        width: wp('60%'),
        height: hp('7%'),
        borderRadius: 5,
        fontSize: hp('2.3%'),
        paddingLeft: wp('4%'),
        backgroundColor: '#fff',
        color: '#54626b',
        marginTop: hp('2%'),
        shadowOpacity: 5
    },

    containerPesquisa: {
        width: wp('12%'),
        height: hp('7%'),
        borderRadius: 5,
        backgroundColor: '#fff',
        marginHorizontal: 5,
        marginTop: hp('2%')
    },

    iconePesquisa: {
        position: 'absolute',
        top: hp('1.3 %'),
        justifyContent: 'center',
        alignSelf: 'center',
        left: wp('2.1%'),
    },

    textoListaCompleta: {
        color: '#047454',
        fontSize: hp('2%'),
        marginTop: hp('4%'),
        marginLeft: wp('5.5%')
    },


    listaGeral: {
        marginTop: wp('1%'),
        height: hp('62%'),
        
    },

    listaPrincipal: {
        width: wp('90%'),
        height: hp('29%'),
        backgroundColor: '#fff',
        alignSelf: 'center',
        marginTop: hp('1.4%'),
        borderRadius: 5,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        shadowColor: "#000",
        elevation: 3,
    },

    iconeProduto: {
        marginLeft: wp('7%'),
        marginTop: hp('2.5%'),

    },

    textoListaNome: {
        color: '#54626b',
        fontWeight: 'bold',
        marginTop: hp('2%'),
        fontSize: hp('2.2%'),
        marginLeft: wp('1%')
    },

    conteinerLink: {
        width: wp('20%'),
        height: hp('4%'),
        backgroundColor: '#047454',
        marginTop: 10,
        borderRadius: 5,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        shadowColor: "#000",
        elevation: 3,
        position: 'absolute',
        left: wp('65%')
    },

    viewLink: {
        flexDirection: 'row',
        alignSelf: 'center'
    },
    iconeLink: {
        marginLeft: wp('4%'),
        marginTop: hp('1%'),
    },

    textoListaLink: {
        color: '#fff',
        fontWeight: '900',
        justifyContent: 'center',
        alignSelf: 'center',
        fontSize: hp('2.2%'),
    },

    textoListaPreco: {
        color: '#bdbebd',
        fontSize: hp('2%'),
        marginLeft: wp('7%')
    },

    textoListaPrecoSugerido: {
        color: '#047454',
        fontSize: hp('2.3%'),
        marginLeft: wp('7%'),
        fontWeight: 'bold',
    },

    viewFrete: {
        flexDirection: 'row',
        marginLeft: wp('2.9%'),
        marginTop: hp('2.4%')
    },

    textoListaPrecoFrete: {
        color: '#bdbebd',
        fontSize: hp('2%'),
        marginTop: hp('1%'),
        marginLeft: wp('4%')
    },

    iconeLoja: {
        marginLeft: wp('4%'),
        marginTop: hp('1%'),
    },

    iconeFrete: {
        marginLeft: wp('4%'),
        marginTop: hp('1%'),
    },

    iconeLixeira: {
        // marginLeft: wp('40%'),
        // marginTop: hp('5%'),
        position: 'absolute',
        left: wp('72%'),
        top: hp('2.5%')
    },

    iconeEditar: {
        position: 'absolute',
        left: wp('72%'),
        bottom: hp('10%')
    },

    btAdd: {
        alignSelf: 'flex-end',
        top: hp('79.5%'),
        right: wp('4%'),
        position: 'absolute',
        backgroundColor: '#fff',
        borderRadius: 50,
        // height: hp('8%'),
        // width: wp('14%')
    },

    fundoModal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.5)'
    },

    Modal: {
        margin: 10,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 15,
        alignItems: "center",
    },

    textoModal: {
        textAlign: 'center',
        color: '#54626b',
        fontWeight: '600',
        fontSize: hp('2.5%'),
    },

    textoEscolhaMoeda: {
        textAlign: 'center',
        color: '#54626b',
        fontWeight: '600',
        fontSize: hp('2%'),
        marginTop: hp('3%')
    },

    escolhaMoeda: {
        height: hp('3%'),
        width: wp('60%')
    },


    formInput: {
        fontSize: hp('2.4%'),
        color: '#7e7877',
        fontWeight: 'bold',
        borderColor: '#D3D3D3',
        width: wp('60%'),
        alignSelf: 'center',
        marginTop: '4%'
    },

    btCadastrar: {
        width: wp('60%'),
        height: hp('6%'),
        borderRadius: 5,
        backgroundColor: '#047454',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: hp('4%'),
        marginHorizontal: wp('2%'),
        marginBottom: hp('2%'),
    },

    textoBotao: {
        fontSize: hp('2%'),
        alignSelf: 'center',
        justifyContent: 'center',
        fontWeight: '500',
        color: '#fff',
    },

    textoMetricas: {
        color: '#047454',
        fontSize: hp('2%'),
        marginLeft: wp('7%'),
        marginTop: hp('1%'),
        marginBottom: hp('5%'),
        fontWeight: 'bold'
    },

    textoTituloModalMetrica: {
        color: '#54626b',
        fontWeight: 'bold',
        marginTop: hp('3%'),
        fontSize: hp('2.7%'),
        marginRight: wp('50%')
    },

    textoModalMetrica: {
        color: '#047454',
        fontWeight: '900',
        fontSize: hp('2.7%'),
        position: 'absolute',
       left: wp('50%'),
        top: hp('3%'),    
    },   

   
});