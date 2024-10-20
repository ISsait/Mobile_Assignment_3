import React from 'react';
import {
    View,
    TextInput,
    StyleSheet,
} from 'react-native';

type inputBoxPropType = {
    value : string,
    onChange : (text : string) => void,
}

export default function InputBox(props : inputBoxPropType) : React.JSX.Element {

    return (
        <View style={styles.container}>
            <View style={styles.inputView}>
                <TextInput
                style={styles.inputTxt}
                // keyboardType='numeric'
                placeholder="Password Length (8 - 16)"
                placeholderTextColor={'#B7B7B7'}
                numberOfLines={1}
                maxLength={2}
                value={props.value}
                onChangeText={props.onChange}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 20,
        marginVertical: 20,
    },
    inputView: {
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: '#FFF',
        width: '100%',
        height: 60,
        alignSelf: 'center',
        paddingStart: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        overflow: 'hidden',
    },

    inputTxt: {
        width: '90%',
        flex: 1,
        fontSize: 25,
        fontWeight: '600',
    },
});
