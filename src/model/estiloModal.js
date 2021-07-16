import { StyleSheet, Dimensions } from 'react-native';
const { width: WIDTH } = Dimensions.get('window')
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default estilomodal = StyleSheet.create({
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

    formInput: {
        fontSize: hp('2.4%'),
        color:  '#7e7877',
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
})
