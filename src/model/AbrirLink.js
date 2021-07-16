import React, { useCallback } from "react";
import {
    Alert, Button, Linking, StyleSheet,Text,
    View, TextInput, TouchableOpacity,
} from "react-native";
import styles from "../View/Adicionar(produtos)/Estilo";
import IconA from 'react-native-vector-icons/AntDesign';


const AbrirLink = ({ url, children }) => {
    const handlePress = useCallback(async () => {
        
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`Não é possivel abrir esse link: ${url}`);
        }
    }, [url]);

    return <TouchableOpacity onPress={handlePress} style={styles.conteinerLink}>
        <View style={styles.viewLink}>
            <Text style={styles.textoListaLink}>link</Text>
            <IconA name={'right'} size={12} color="#fff" style={styles.iconeLink} />
        </View>
    </TouchableOpacity>
};

export default AbrirLink