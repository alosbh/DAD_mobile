import React from 'react';

import {
  View, Text, Button, TouchableOpacity
} from 'react-native';


import { styles } from './styles';

export function FileControl(){
  return (
    <View style={styles.container}>
      
      <TouchableOpacity
      style={styles.button}
      onPress={()=>{console.log("new folder")}}>
        <Text style={styles.buttonText}>New Folder</Text>
      </TouchableOpacity>

      <TouchableOpacity
      style={styles.button}
      onPress={()=>{console.log("new FILE")}}>
        <Text style={styles.buttonText}>New File</Text>
      </TouchableOpacity>

      <TouchableOpacity
      style={styles.button}
      onPress={()=>{console.log("delete FILE")}}>
        <Text style={styles.buttonText}>Delete File</Text>
      </TouchableOpacity>

      <TouchableOpacity
      style={styles.button}
      onPress={()=>{console.log("delete folder")}}>
        <Text style={styles.buttonText}>Delete Folder</Text>
      </TouchableOpacity>

    </View>
  );
}