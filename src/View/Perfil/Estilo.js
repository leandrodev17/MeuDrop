import { StyleSheet, Dimensions } from 'react-native';
const { width: WIDTH } = Dimensions.get('window')
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default styles = StyleSheet.create({
    fundo: {
        flex: 1,
        backgroundColor: '#fcfcfc'
    },

    viewNome: {
        marginTop: hp('4%')
    },
    textoNome: {
        marginLeft: wp('7%'),
        color: '#54626b',
        fontWeight: 'bold',
        fontSize: hp('6%'),
    },

    textoSobrenome: {
        marginLeft: wp('7%'),
        color: '#bdbebd',
        fontWeight: '600',
        fontSize: hp('5%'),
    },

    textoLoja: {
        marginLeft: wp('7%'),
        color: '#047454',
        fontWeight: 'bold',
        fontSize: hp('2%'),
        
    },

    viewItems: {
        marginTop: hp('15%')
    },

    conteinerIconeLojas: {
        marginLeft: wp('7%'),
        backgroundColor: '#fff',
        borderRadius: hp('2%'),
        height: hp('8%'),
        width: wp('14%')
    },


    IconeLojas: {
        marginTop: hp('1%'),
        alignSelf: 'center'
    },

    textoLojas: {
        marginLeft: wp('7%'),
        color: '#54626b',
        fontWeight: 'bold',
        fontSize: hp('2.5%'),
        marginTop: hp('2%')
    },

    conteinerIcone: {
        position: 'absolute',
        left: wp('80%'),
        backgroundColor: '#fff',
        borderRadius: hp('2%'),
        marginTop: hp('1%'),
        height: hp('7%'),
        width: wp('13%')
    },

    IconeLeft: {
        marginTop: hp('2%'),
        alignSelf: 'center'
    },

    IconeTaxas: {
        marginTop: hp('1.5%'),
        alignSelf: 'center'
    },


    conteinerTaxas: {
        flexDirection: 'row',
        marginTop: hp('2%')
    },

    textoTaxas: {
        marginLeft: wp('6%'),
        color: '#54626b',
        fontWeight: 'bold',
        fontSize: hp('2.5%'),
        marginTop: hp('2%')
    },

    conteinerSair: {
        marginLeft: wp('7%'),
        backgroundColor: '#fff',
        borderRadius: 15,
        marginTop: hp('15%'),
        height: hp('7%'),
        width: wp('35%')
    },

    textoSair: {
        marginLeft: wp('6%'),
        color: '#047454',
        fontWeight: 'bold',
        marginTop: hp('1.5%'),
        fontSize: hp('2.5%'),
    },

    IconeSair: {
        marginTop: hp('1.5%'),
        alignSelf: 'center'
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

    textoModal1: {
        marginRight: wp('70%'),
        color: '#54626b',
        fontWeight: 'bold',
        fontSize: hp('2%'),
        marginTop: hp('2%'),
    },

    textoModal2: {
        textAlign: 'center',
        color: '#54626b',
        fontWeight: '600',
        fontSize: hp('2%'),
        marginTop: hp('2%'),
    },

    separator: {
        borderWidth: 0.5,
        borderColor: '#d3d3d3',
        marginHorizontal: 20,
        marginTop: 6
    },

});