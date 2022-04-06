import React,{useState,FC} from 'react';

import {
  View, Text,TouchableOpacity
} from 'react-native';
import { File } from '../File';
import { FontAwesome } from '@expo/vector-icons';
import { styles } from './styles';

export type FolderProps = {
  
  folderName: string
  
  
}
type Props = {
  data: FolderProps
}
export function Folder({data}:Props){

    const [isOpened, openFolder] = useState(true);

  return (
    
    <View style={styles.container}>
      
      <TouchableOpacity onPress={()=>openFolder(!isOpened)} style={styles.folderNameContainer}>
      {isOpened?<FontAwesome name="folder-open" size={24} color="black" />:<FontAwesome name="folder" size={24} color="black" />}
      <Text style={styles.folderName}>{data.folderName}</Text>
        </TouchableOpacity>
      
      
      
      
        
        
        {isOpened ? 
        
        <View>
            <File data={{filename:"Arquivo PDF",icon:'pdffile1'}}/>
            <File data={{filename:"Arquivo PPT",icon:'pptfile1'}}/>
            <File data={{filename:"Arquivo DOCX",icon:'wordfile1'}}/>
        </View>
        
        :<></>}
      
    </View>
  );
}