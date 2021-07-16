import { StyleSheet,Dimensions } from 'react-native';
const { width: WIDTH } = Dimensions.get('window')
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default styles = StyleSheet.create({
    fundo: {
        flex: 1,
        backgroundColor: 'white'
    },

    textoSelecione: {
        textAlign: 'center',
        color: '#54626b',
        fontWeight: '600',
        fontSize: hp('4%'),
    },


    textoPrecificacao: {
        fontSize: hp('2%'),
        color: '#047454',
        alignSelf: 'center'
    },

    viewPrincipal: {
        marginTop: hp('25%')
    }
});