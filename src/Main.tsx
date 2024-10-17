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
import { showErrorSnackbar, showInfoSnackBar, showSuccessSnackBar } from './utility/utils';
import { generatePasswordString } from './utility/passwordGenerator';


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
            showErrorSnackbar('Length not entered. Password Length must be a number from 8 to 16. All selections have been cleared.');
            console.log('Password Length cannot be empty');
            reset(1);
            return;
        }
        if(isNaN(parseInt(passwordLength, 10))) {
            showErrorSnackbar('Not a number. Password Length must be a number from 8 to 16. All selections have been cleared.');
            console.log('Password Length should be a number');
            reset(1);
            return;
        }
        if(parseInt(passwordLength, 10) < 8 ||
            parseInt(passwordLength, 10) > 16) {
            showErrorSnackbar('Password Length must be a number from 8 to 16. All selections have been cleared.');
            console.log('Password Length should be between 8 and 16');
            reset(1);
            return;
        }
        if(!upperCase && !lowerCase && !specialChar && !numbers) {
            showErrorSnackbar('Select at least one option. All selections have been cleared.');
            console.log('Select at least one option');
            reset(1);
            return;
        }
        const length = parseInt(passwordLength, 10);
        let generatedPasswordVar = generatePasswordString({
            length: length,
            includeUpper: upperCase,
            includeLower: lowerCase,
            includeNumber: numbers,
            includeSymbol: specialChar,
        });
        console.log('Generated Password: ', generatedPasswordVar);
        setGeneratedPassword(generatedPasswordVar);
        showSuccessSnackBar(`Password Generated Successfully with ${length} characters`);
    }
    function reset(flag : number) {
        console.log('Resetting...');
        setPasswordLength('');
        setUpperCase(false);
        setLowerCase(false);
        setSpecialChar(false);
        setNumbers(false);
        setGeneratedPassword('');
        if (flag === 0) {
            showInfoSnackBar('Reset Successful, all selections cleared');
        }
    }

    function handleCopy(text : string) {
        console.log('Copied: ', text);
        if(text === '') {
            showErrorSnackbar('Nothing to Copy');
            console.log('Nothing to Copy');
            return;
        }
        showSuccessSnackBar('Password Copied to Clipboard');
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
                onPress={() => reset(0)}
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
