import React from 'react';

import {
  View, Text, TouchableOpacity 
} from 'react-native';

import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './styles';

import {downloadFile} from '../../utils/fileDownload/fileDownload'

export type FileProps = {
  fileId: string,
  filename: string,
  icon: string,
  url: string
  
}
export type newFileProps ={
  id: string, 
  title: string,
  description: string,
  url: string,
  disclipineId: string,
  topicId: string
}
type Props = {
  data: newFileProps
}
var AntDesignIcons = {
  "pdf":"pdffile1",
  "txt":"filetext1",
  "docx":"wordfile1",
  "pptx":"pptfile1",
  "xls":"exclefile1",
  "jpg":"image",
  "png":"image"

}
export function File({data}:Props){
  return (
    
    <View style={styles.filescontainer}>
    <TouchableOpacity
    onPress={()=>downloadFile(data)}>
      <View style={styles.container}>
        
          <AntDesign name={AntDesignIcons[data.url.split("?alt")[0].split(".")[data.url.split("?alt")[0].split(".").length-1]]} 
          size={24} 
          color="black" />
        
        
        <Text style={styles.fileName}>{data.title}</Text>
      </View>
    </TouchableOpacity>

    <TouchableOpacity
              
              onPress={()=>{
                console.log("delete file")
              }}>
                <MaterialCommunityIcons name='file-remove'
                size={24} 
                  color="black" />
            </TouchableOpacity>
    </View>
    
  );
}