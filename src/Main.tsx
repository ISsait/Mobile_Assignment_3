import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import InputBox from './components/InputBox';
import Output from './components/Output';





function Main() : React.JSX.Element {

    function handleCopy(text : string) {
        console.log('Copied: ', text);
    }
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Password Generator</Text>
            <InputBox />
            <Output placeholder="Select Options..." generatedPassword="" handleCopy={handleCopy}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    header: {
        fontSize: 25,
        fontWeight: '700',
        marginBottom: 10,
        marginTop: 50,
        color: '#3C3D37',
    },
});


export default Main;
