import { StyleSheet, Dimensions } from 'react-native';
const { width: WIDTH } = Dimensions.get('window')
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default styles = StyleSheet.create({
    fundo: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: 'white', 
        width: Dimensions.get('window').width
    },

    fundoKey: {
        flex: 1,
        alignItems: 'center'
    },

    btVoltar: {
        color: '#7e7877',
        alignSelf: 'flex-start',
        marginLeft:  wp('5%'),
        marginTop: 20,
    },

    textoTitulo: {
        fontSize: hp('4%'),
        alignSelf: 'center',
        marginTop: hp('2.7%'),
        fontWeight: '500',
        color: '#047454'
    },

    textoForm: {
        fontSize: hp('2.2%'),
        fontWeight: '500',
        color: '#b5b5b5',
        marginLeft: wp('15%'),
        marginTop: hp('2.7%')
    },

    formInput: {
        fontSize: hp('2.4%'),
        color: '#7e7877',
        fontWeight: 'bold',
        borderColor: '#D3D3D3',
        width: wp('70%'),
        alignSelf: 'center',

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
});