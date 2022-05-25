import React,{useState,useEffect,useCallback} from 'react';
import { AntDesign } from '@expo/vector-icons';
import {
  View, Text,TouchableOpacity, Alert, Platform
} from 'react-native';
import { File, FileProps, newFileProps } from '../File';
import {TopicResponse} from '../../screens/home'
import { FontAwesome } from '@expo/vector-icons';
import { styles } from './styles';
import {api} from '../../services/api'
import {useUser} from '../../context/userContext'
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

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
    const [fileResponse, setFileResponse] = useState<DocumentPicker.DocumentResult>();
    const {role} = useUser();
  const handleDocumentSelection = useCallback(async () => {
    try {
      console.log("try picker")
      const response:DocumentPicker.DocumentResult = await DocumentPicker.getDocumentAsync();
      setFileResponse(response);
      console.log(response);

      const formData = new FormData();
      console.log(`folder ID: ${data.folderId}`)
      console.log(`discipline Id  ${data.discipline}`)
      formData.append('Title',response.name.split('.')[0])
      formData.append('Description',"placeholder")
      formData.append('DisciplineId ',data.discipline)
      formData.append('TopicId ',data.folderId)
      
      formData.append('file',{
        uri: response.uri,
        name: response.name,
        type: response.mimeType 
    });
  
    console.log(formData)
    
    const fileResponse = await api.post(`/Contents`,formData,{headers:{"Content-Type": "multipart/form-data"}})
    .then((res)=>{
      Alert.alert("Success",`Content created: ${res.data}`);
      
       api.get<newFileProps[]>(`/Contents/Topic/${data.folderId}`)
      
      .then((res)=>{
        
        if(Array.isArray(res.data)){
          setFiles(res.data);
        }else{
          setFiles([res.data]);
        }
        
      })
    })

    } catch (err) {
      console.log(err);
    }
  }, []);
    
  async function confirmDeletion(){
    Alert.alert(
      "Tem certeza?",
      `Deseja deletar o tópico: "${data.folderName}"?`,
      [
        // The "Yes" button
        {
          text: "Sim",
          onPress: () => {
            deleteTopic(data.folderId,data.discipline);
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

    async function deleteTopic(topicID:string, disciplineId:string){

      
      console.log(`topic ID:`)
      
     
     
      const deleteTopicResponse = await api.delete(`/Topics/${topicID}`)
      .then((res)=>{
        Alert.alert("Successo",`Topico deletado`);
        
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
        console.log(`Topic delete error: ${err.message}`);
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
        {role==='Professor'||role==='Admin' ? 
          <View style={styles.icons}>
                  <TouchableOpacity
              
              onPress={handleDocumentSelection}>
                <AntDesign name='upload'
                size={24} 
                  color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.lastIcon}
              onPress={()=>{
                confirmDeletion()
              }}>
                <AntDesign name='delete'
                size={24} 
                  color="black" />
            </TouchableOpacity>
          </View>
          :<></>}
      </View>

        {isOpened ? 
        
        <View>
          {files.map((file)=>(
            <File key={file.id} data={{id: file.id, 
              title: file.title,
              description: file.description,
              url: file.url,
              disclipineId: file.disclipineId,
              topicId: file.topicId,
              updateFiles: setFiles}}/>
          ))}
            
        </View>
        
        :<></>}
      
    </View>
  );
}