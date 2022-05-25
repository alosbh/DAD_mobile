import React from 'react';

import {
  View, Text, TouchableOpacity, Alert
} from 'react-native';

import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './styles';

import {downloadFile} from '../../utils/fileDownload/fileDownload'
import {api} from '../../services/api'
import {useUser} from '../../context/userContext'
export type FileProps = {
  fileId: string,
  filename: string,
  icon: string,
  url: string,
  updateFiles: Function,
  
}
export type newFileProps ={
  id: string, 
  title: string,
  description: string,
  url: string,
  disclipineId: string,
  topicId: string,
  updateFiles: Function,
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

  const {role} = useUser();
  async function confirmDeletion(){
    Alert.alert(
      "Tem certeza?",
      `Deseja deletar o arquivo: "${data.title}"?`,
      [
        // The "Yes" button
        {
          text: "Sim",
          onPress: () => {
            deleteFile(data.id);
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "Não",
        },
      ]
    );
  }

  async function deleteFile(fileId:string){

      
    
    
   
   
    const deleteTopicResponse = await api.delete(`/Contents/${fileId}`)
    .then((res)=>{
      Alert.alert("Success",`Arquivo deletado!`);
      
      console.log(`fetch files for ${data.topicId}`)
       api.get<newFileProps[]>(`/Contents/Topic/${data.topicId}`)
      
      .then((res)=>{
        console.log(res)
        if(Array.isArray(res.data)){
          data.updateFiles(res.data);
        }else{
          data.updateFiles([res.data]);
        }
        
      }).catch((err)=>{
        console.log("nao foi possivel atualizar files")
      })
    })
    .catch((err)=>{
      Alert.alert("Erro!",`Não foi possivel deletar file: ${err.message}`)
      console.log(`file delete error: ${err.message}`);
    }); 
  }

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
    {role==='Professor'||role==='Admin' ? 
    <TouchableOpacity
              
              onPress={()=>confirmDeletion()}>
                <MaterialCommunityIcons name='file-remove'
                size={24} 
                  color="black" />
            </TouchableOpacity>
      :<></>}
    </View>
    
  );
}