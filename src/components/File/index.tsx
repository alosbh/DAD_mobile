import React from 'react';

import {
  View, Text
} from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import { styles } from './styles';

export type FileProps = {
  
  filename: string,
  icon: string
  
}
type Props = {
  data: FileProps
}
export function File({data}:Props){
  return (
    <View style={styles.container}>
      <AntDesign name={data.icon} size={24} color="black" />
      <Text style={styles.fileName}>{data.filename}</Text>
    </View>
  );
}