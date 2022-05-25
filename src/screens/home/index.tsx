import React, { useEffect, useState } from 'react'; 

import {
  View, Text
} from 'react-native';

import { Header } from '../../components/Header';
import { FileList } from '../../components/FileList';
import { FileControl } from '../../components/FileControl';
import { Folder } from '../../components/Folder';
import { styles } from './styles';
import {getStatusBarHeight} from 'react-native-iphone-x-helper'
import {api} from '../../services/api'

import {useUser} from '../../context/userContext'
export type DisciplineProps = {
  studentsIds: string[],
  id: string,
  title:string,
  description: string,
  teacherId: string
  
}

export type TopicResponse ={
  id:string,
  title: string,
  description: string,
  disciplineId: string
}

const topic = {
  id:".",
  title:".",
  description:".",
  disciplineId:""
}
let validTopics:TopicResponse[] = []
export function Home(props){

  const [topics, setTopics] = useState<TopicResponse[]>([]);
  const {signed} = useUser();
  const {role} = useUser();
  useEffect(()=>{
    async function fetchTopics(){
      const topicsResponse = await api.get<TopicResponse[]>(`/Topics/Discipline/${props.route.params.id}`)
      
      .then((res)=>{
        
        if(Array.isArray(res.data)){
          setTopics(res.data);
        }else{
          setTopics([res.data]);
        }
        
      })
      
      .catch((err)=>{
        console.log(`Error fetching topics: ${err}`)
      });
       
    }
    fetchTopics();
  },[])
  return (
      <View style={styles.container}>
       {role==='Professor'||role==='Admin' ? 
       <FileControl data={{disciplineId:props.route.params.id,stateChanger:setTopics}}></FileControl>
        
        :
        <></>
      }
       {topics.map((topic)=>{
         return (
          <Folder key={topic.id} data={{updateTopics:setTopics,discipline:topic.disciplineId,folderId:topic.id,folderName:topic.title,files:[]}}/>
         )
         })}
        
        
        
      </View>
    
    
  );
}