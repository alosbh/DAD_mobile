import React from 'react';

import {
  View
} from 'react-native';
import { File } from '../File';
import { styles } from './styles';

export function FileList(){
  return (
    <View>
      <File data={{filename:"Arquivo PDF",icon:'pdffile1'}}/>
      <File data={{filename:"Arquivo PPT",icon:'pptfile1'}}/>
      <File data={{filename:"Arquivo DOCX",icon:'wordfile1'}}/>
    </View>
  );
}