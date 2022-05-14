import React from 'react';

import {
  View, Text, TouchableOpacity 
} from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import { styles } from './styles';

import {downloadFile} from '../../utils/fileDownload/fileDownload'

export type FileProps = {
  fileId: string,
  filename: string,
  icon: string,
  url: string
  
}
type Props = {
  data: FileProps
}
export function File({data}:Props){
  return (
    

    <TouchableOpacity
    onPress={()=>downloadFile(data)}>
      <View style={styles.container}>
        <AntDesign name={data.icon} size={24} color="black" />
        <Text style={styles.fileName}>{data.filename}</Text>
      </View>
    </TouchableOpacity>
    
    
  );
}