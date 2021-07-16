import { StyleSheet, Dimensions } from 'react-native';
const { width: WIDTH } = Dimensions.get('window')
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default styles = StyleSheet.create({
    fundoKey: {
        flex: 1,
    },

    fundo: {
        flex: 1,
        justifyContent: "space-around",
        backgroundColor: 'white'
    },

    TextMyprice: {
        fontSize: hp('7%'),
        alignSelf: 'center',
        marginTop: hp('7%'),
        fontWeight: '500',
        color: '#D3D3D3'
    },

    TextPrecificacao: {
        fontSize: hp('2.5%'),
        alignSelf: 'center',
        color: '#047454'
    },

    TextCadastrar: {
        fontSize: hp('5%'),
        alignSelf: 'center',
        marginTop: hp('4%'),
        fontWeight: 'bold',
        color: '#047454'
    },

    formInputs: {
        fontSize: hp('2.4%'),
        color:  '#7e7877',
        borderColor: '#D3D3D3',
        width: wp('80%'),
        alignSelf: 'center',
        marginTop: hp('2%')
    },

    btlogin: {
        width: wp('60%'),
        height: hp('6%'),
        borderRadius: 5,
        backgroundColor: '#047454',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: hp('3%'),
        marginHorizontal: wp('2%'),
    },

    textoBotao: {
        fontSize: hp('2.2%'),
        alignSelf: 'center',
        justifyContent: 'center',
        fontWeight: '500',
        color: '#fff',
    },

    textoNaotemConta: {
        fontSize: hp('2.5%'),
        alignSelf: 'center',
        color: '#047454',
        marginTop: hp('5%'),
    },

    textoEntrar: {
        fontSize: hp('3%'),
        alignSelf: 'center',
        color: '#047454',
        marginTop: hp('0.5%'),
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },

    activityIndicator: {
        justifyContent: 'center',
        alignItems: 'center',
        height: hp('8%')
    },
});