import React from 'react';
import { StyleSheet, View } from 'react-native';
import DialogInput from 'react-native-dialog-input';

/*
  Compnent that is used for handling input from a user to add a new item
  to a shoping list. The user can type the name of the item into a textfield
  and then perss submit to add the item.
*/

const CreateItem = ({ onConfirm, onCancel, visible }) => {
    return (
        <View>
            <DialogInput
                isDialogVisible={visible}
                title={'Add item'}
                hintInput={'Write item name here....'}
                submitInput={inputText => {
                    onConfirm(inputText); //Calls the add item callback
                }}
                closeDialog={() => {
                    onCancel(); //Calls the cancellation callback
                }}></DialogInput>
        </View>
    );
};

//Styles

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});

export default CreateItem;
