import React from 'react';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

type CheckBoxProps = {
    id: string;
    label: string;
    checkedStatus: boolean;
    color: string;
    updateCheckedStatus: (status: boolean) => void;
};

export default function CheckBox(props : CheckBoxProps) : React.JSX.Element {

    const updateCheckedStatus = props.updateCheckedStatus;
    const checkedStatus = props.checkedStatus;
    const label = props.label;

    return (
        <View style={styles.view}>
                <View>
                    <BouncyCheckbox
                        style={styles.bouncyCheckBoxView}
                        size={25}
                        fillColor={props.color}
                        unFillColor="#FFFFFF"
                        iconStyle={{ borderColor: props.color }}
                        innerIconStyle={{ borderWidth: 2 }}
                        textStyle={{ fontFamily: "JosefinSans-Regular" }}
                        isChecked={checkedStatus}
                        onPress={(isChecked: boolean) => {updateCheckedStatus(isChecked);}}
                    />
                </View>
                <Text style={styles.Txt}>{label}</Text>
            </View>
    );
}

const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginVertical: 5,
        marginLeft: 20,
    },

    Txt: {
        fontSize: 20,
        fontWeight: '600',
    },
    bouncyCheckBoxView: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
});
