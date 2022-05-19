import { AntDesign } from '@expo/vector-icons';
import React, {useState, useEffect} from 'react';

import {
  View, Text, Button, TouchableOpacity, SafeAreaView, TextInput, Alert
} from 'react-native';

import {TopicResponse} from '../../screens/home'
import { styles } from './styles';
import {api} from '../../services/api'
// import { TextInput } from 'react-native-gesture-handler';

type ControlProps = {
  disciplineId: string,
  stateChanger: Function
  
}
type Props ={
  data:ControlProps
}
export function FileControl({data}:Props){

  const [text, onChangeText] = useState("");
  const [isToggled, changeToggle] = useState(true);
  
  async function createTopic(){

    const formData = new FormData();
    console.log(`discipline ID: ${data.disciplineId}`)
    console.log(`discipline name ${text}`)
    formData.append('Title',text)
    formData.append('Description',"placeholder")
    formData.append('DisciplineId',data.disciplineId)
    const messagesResponse = await api.post(`/Topics`,formData)
    .then((res)=>{
      Alert.alert("Success",`Topic created: ${res.data}`);
      changeToggle(true);
       api.get<TopicResponse[]>(`/Topics/Discipline/${data.disciplineId}`)
      
      .then((res)=>{
        
        if(Array.isArray(res.data)){
          data.stateChanger(res.data);
        }else{
          data.stateChanger([res.data]);
        }
        
      })
    })
    .catch((err)=>{
      Alert.alert("Erro!",`Não foi possivel criar topico: ${err.message}`)
      console.log(`Topic create error: ${err.message}`);
    }); 
  }

  

  return (
    <View >
      
      <View style={styles.buttonsContainer}>
      <TouchableOpacity
      style={isToggled ? styles.button : {display:'none'}}
      onPress={()=>changeToggle(false)}>
        <AntDesign name='pluscircle'
        size={24} 
          color="black" />
        <Text style={styles.buttonText}>Novo Topico</Text>
      </TouchableOpacity>
      </View>
      
      <View style={[isToggled ? styles.collapsedInput : styles.newTopicContainer]}>
          <SafeAreaView>
          
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            placeholder="Digite o nome do novo topico"
            
          />
        </SafeAreaView>
        <View style={styles.buttonsSubmit}>
            <TouchableOpacity
          style={styles.button}
          onPress={()=>createTopic()}>
            <AntDesign name='check'
            size={24} 
              color="black" />
            <Text style={styles.buttonText}>Confirmar</Text>
          </TouchableOpacity>

          <TouchableOpacity
      style={styles.button}
      onPress={()=>{changeToggle(true)}}>
        <AntDesign name='close'
        size={24} 
          color="black" />
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
        </View>
      </View>
      


      

    </View>
  );
}