import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import InputBox from './components/InputBox';
import Output from './components/Output';
import CheckBox from './components/Checkbox';
import Btn from './components/Btn';
import { showErrorSnackbar } from './utility/utils';
import { generatePasswordString } from './utility/passwordGenerator';
import { PasswordRequirement } from './utility/Consts';



function Main() : React.JSX.Element {

    const [passwordLength, setPasswordLength] = useState('');
    const [upperCase, setUpperCase] = useState(false);
    const [lowerCase, setLowerCase] = useState(false);
    const [specialChar, setSpecialChar] = useState(false);
    const [numbers, setNumbers] = useState(false);
    const [generatedPassword, setGeneratedPassword] = useState('');

    function handlePasswordLengthChange(text : string) {
        // console.log('Password Length: ', text);
        const length = text;
        setPasswordLength(length);
    }

    function handleUpperCheckedChange(status : boolean) {
        const isChecked = status;
        setUpperCase(isChecked);
        console.log('Upper Case: ', isChecked);
    }

    function handleLowerCheckedChange(status : boolean) {
        const isChecked = status;
        setLowerCase(isChecked);
        console.log('Lower Case: ', isChecked);
    }

    function handleSpecialCharCheckedChange(status : boolean) {
        const isChecked = status;
        setSpecialChar(isChecked);
        console.log('Special Char: ', isChecked);
    }

    function handleNumberCheckedChange(status : boolean) {
        const isChecked = status;
        setNumbers(isChecked);
        console.log('Numbers: ', isChecked);
    }

    function generatePassword() {
        console.log('Generating Password...');
        if(passwordLength === '') {
            showErrorSnackbar('Password Length cannot be empty');
            console.log('Password Length cannot be empty');
            reset();
            return;
        }
        if(isNaN(parseInt(passwordLength, 10))) {
            showErrorSnackbar('Password Length should be a number');
            console.log('Password Length should be a number');
            reset();
            return;
        }
        if(parseInt(passwordLength, 10) < 8 ||
            parseInt(passwordLength, 10) > 16) {
            showErrorSnackbar('Password Length should be between 8 and 16');
            console.log('Password Length should be between 8 and 16');
            reset();
            return;
        }
        if(!upperCase && !lowerCase && !specialChar && !numbers) {
            showErrorSnackbar('Select at least one option');
            console.log('Select at least one option');
            reset();
            return;
        }
        const length = parseInt(passwordLength, 10);
        generatedPassword = generatePasswordString({
            length: length,
            includeUpper: upperCase,
            includeLower: lowerCase,
            includeNumber: numbers,
            includeSymbol: specialChar,
        });
        console.log('Generated Password: ', generatedPassword);
    }
    function reset() {
        console.log('Resetting...');
        setPasswordLength('');
        setUpperCase(false);
        setLowerCase(false);
        setSpecialChar(false);
        setNumbers(false);
    }

    function handleCopy(text : string) {
        console.log('Copied: ', text);
    }
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Password Generator</Text>
            <InputBox
                value={passwordLength}
                onChange={handlePasswordLengthChange}
                />
            <CheckBox
                id="upperCase"
                label="Upper Case Letter"
                checkedStatus={upperCase}
                color="lightblue"
                updateCheckedStatus={handleUpperCheckedChange}
                />
            <CheckBox
                id="lowerCase"
                label="Lower Case Letter"
                checkedStatus={lowerCase}
                color="darkgreen"
                updateCheckedStatus={handleLowerCheckedChange}
                />
            <CheckBox
                id="specialChar"
                label="Special Characters"
                checkedStatus={specialChar}
                color="orange"
                updateCheckedStatus={handleSpecialCharCheckedChange}
                />
            <CheckBox
                id="numbers"
                label="Numbers"
                checkedStatus={numbers}
                color="purple"
                updateCheckedStatus={handleNumberCheckedChange}
                />
            <Output
                placeholder="Select Options..."
                generatedPassword={generatedPassword}
                handleCopy={handleCopy}
                />
            <Btn
                type={1}
                title="Generate Password"
                onPress={generatePassword}
                />
            <Btn
                type={2}
                title="Reset"
                onPress={() => {}}
                />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    header: {
        fontSize: 25,
        fontWeight: '700',
        marginBottom: 10,
        marginTop: 50,
        marginLeft: 20,
        color: '#3C3D37',
    },
});


export default Main;
