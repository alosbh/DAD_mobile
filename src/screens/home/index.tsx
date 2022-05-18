import React, { useEffect, useState } from 'react'; 

import {
  View, Text
} from 'react-native';

import { Header } from '../../components/Header';
import { FileList } from '../../components/FileList';
import { FileControl } from '../../components/FileControl';

import { styles } from './styles';
import {getStatusBarHeight} from 'react-native-iphone-x-helper'
import {api} from '../../services/api'
export type DisciplineProps = {
  studentsIds: string[],
  id: string,
  title:string,
  description: string,
  teacherId: string
  
}

type TopicResponse ={
  id:string,
  title: string,
  description: string,
  disciplineId: string
}

let validTopics:TopicResponse[] = []
export function Home(props){

  const [topics, setValidTopics] = useState<TopicResponse[]>([]);
  const [currentDisciplineID, setCurrentDisciplineID] = useState('')
  const [currentDiscipline, setCurrentDiscipline] = useState('')
  useEffect(() => {
    

    console.log(props.route.params.title)
    setCurrentDiscipline(props.route.params.title);
    setCurrentDisciplineID(props.route.params.id);
  },[]);
  useEffect(()=>{
    async function fetchTopics(){
      
      const topicsResponse = await api.get<TopicResponse[]>(`/Topics`);
      topicsResponse.data.map((topic)=>{
        console.log(`Current id:${currentDisciplineID}`)
        console.log(`Current topic id:${topic.disciplineId}`)
        if(currentDisciplineID===topic.disciplineId){
          validTopics.push(topic)
        }

      })
      setValidTopics([]);
      setValidTopics(validTopics);
      // console.log(topicsResponse.data)
      // setDisciplines(disciplinesResponse.data)
       
    }
    fetchTopics();
  },[])
  return (
      <View style={styles.container}>
        {/* <Header/> */}
        {/* <FileControl/> */}
        {/* {validTopics.map((topic)=>{console.log(topic.title)})} */}
        {validTopics.map((topic)=>{
          if(topic.disciplineId===currentDisciplineID){
            return <Text key={topic.id}>{topic.title}</Text>
          }
          
        })}
        
        <FileList/>
      </View>
    
    
  );
}