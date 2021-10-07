import React from 'react';
import { useState } from 'react';
import DialogInput from 'react-native-dialog-input';
import Dialog from "react-native-dialog";

import {
	Button,
	Text,
	View,
	ScrollView,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	Image
  } from 'react-native';

  import ShoppingListItem from './ShoppingListItem';
 

const CreateItem = ({onConfirm, onCancel, visible}) => {
	
	return (  
		<View>			
			<DialogInput isDialogVisible={visible}
            title={"Add item"}
            hintInput ={"Write item name here...."}
            submitInput={ (inputText) => {onConfirm(inputText)} }
            closeDialog={ () => {onCancel()}}>
</DialogInput>
		</View>
		
	);
}

const styles = StyleSheet.create({
	input: {
	  height: 40,
	  margin: 12,
	  borderWidth: 1,
	  padding: 10,
	}
  });
  
 
export default CreateItem;