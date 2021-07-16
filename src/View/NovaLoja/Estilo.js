import { StyleSheet,Dimensions } from 'react-native';
const { width: WIDTH } = Dimensions.get('window')
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default styles = StyleSheet.create({
    fundo: {
        flex: 1,
        backgroundColor: 'white'
    },

    textoAdicione: {
        textAlign: 'center',
        color: '#54626b',
        fontWeight: '600',
        fontSize: hp('4%'),
    },


    textoVoceOode: {
        fontSize: hp('2%'),
        color: '#047454',
        alignSelf: 'center'
    },

    formInput: {
        fontSize: hp('2.4%'),
        color:  '#7e7877',
        fontWeight: 'bold',
        borderColor: '#D3D3D3',
        width: wp('80%'),
        alignSelf: 'center',
        marginTop: '4%'
    },

    viewPrincipal: {
        marginTop: hp('25%')
    }
});