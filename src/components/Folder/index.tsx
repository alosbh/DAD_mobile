import React,{useState,useEffect,FC} from 'react';
import { AntDesign } from '@expo/vector-icons';
import {
  View, Text,TouchableOpacity, Alert
} from 'react-native';
import { File, FileProps, newFileProps } from '../File';
import {TopicResponse} from '../../screens/home'
import { FontAwesome } from '@expo/vector-icons';
import { styles } from './styles';
import {api} from '../../services/api'
export type FolderProps = {
  folderId: string,
  folderName: string,
  files: FileProps[],
  updateTopics: Function,
  discipline: string
  
}
type Props = {
  data: FolderProps
}
export function Folder({data}:Props){

    const [isOpened, openFolder] = useState(true);
    const [files, setFiles] = useState<newFileProps[]>([]);
    
    async function deleteTopic(topicID:string, disciplineId:string){

      
      console.log(`topic ID:`)
      
     
     
      const deleteTopicResponse = await api.delete(`/Topics/${topicID}`)
      .then((res)=>{
        Alert.alert("Success",`Topic deleted`);
        
        console.log(`fetch topics for ${disciplineId}`)
         api.get<TopicResponse[]>(`/Topics/Discipline/${data.discipline}`)
        
        .then((res)=>{
          console.log(res)
          if(Array.isArray(res.data)){
            data.updateTopics(res.data);
          }else{
            data.updateTopics([res.data]);
          }
          
        }).catch((err)=>{
          console.log("nao foi possivel atualizar topicos")
        })
      })
      .catch((err)=>{
        Alert.alert("Erro!",`Não foi possivel deletar topico: ${err.message}`)
        console.log(`Topic create error: ${err.message}`);
      }); 
    }


    useEffect(()=>{
      async function fetchFiles(){
        console.log(`fetching files for topic ${data.folderId}`)
        const topicsResponse = await api.get<newFileProps[]>(`/Contents/Topic/${data.folderId}`)
        // const topicsResponse = await api.get<TopicResponse[]>(`/Topics`)
        
        .then((res)=>{
          
          if(Array.isArray(res.data)){
            setFiles(res.data);
          }else{
            setFiles([res.data]);
          }
          
        })
        
        .catch((err)=>{
          console.log(`Error fetching files for:\n ${data.folderName} ${data.folderId}\n ${err}`)
        });
         
      }
      fetchFiles();
    },[])
  return (
    
    <View style={styles.container}>
      <View style={styles.containerControl}>
        <TouchableOpacity 
          onPress={()=>openFolder(!isOpened)} 
          style={styles.folderNameContainer}
        >
          {
            isOpened?
              <FontAwesome name="folder-open" size={24} color="black" />
            :
              <FontAwesome name="folder" size={24} color="black" />
          }
          <Text style={styles.folderName}>{data.folderName}</Text>

        </TouchableOpacity>
          
          <View style={styles.icons}>
                  <TouchableOpacity
              
              onPress={()=>{console.log("upload file")}}>
                <AntDesign name='upload'
                size={24} 
                  color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.lastIcon}
              onPress={()=>{
                deleteTopic(data.folderId, data.discipline)
              }}>
                <AntDesign name='delete'
                size={24} 
                  color="black" />
            </TouchableOpacity>
          </View>
        
      </View>

        {isOpened ? 
        
        <View>
          {files.map((file)=>(
            <File key={file.id} data={file}/>
          ))}
            
        </View>
        
        :<></>}
      
    </View>
  );
}