import React, {useState, useEffect} from 'react';
import {useUser} from '../../context/userContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View, Text, TextInput, TouchableOpacity, Alert, Button
} from 'react-native';

import { styles } from './styles';
import {authApi} from '../../services/api'
import { useNavigation } from '@react-navigation/native';
import DatePicker from 'react-native-datepicker';

export function Register(){

  async function Register(){
    
    let payload = {"email":user,"senha":pass, "nome":nome,"role":acesso}
    await authApi.post('/Autenticacao/login',payload)
    .then((res)=>{
      console.log(`Cadastro sucesso`)
      
      Alert.alert("Sucesso no cadastro!")
      navigation.navigate("Login");
    
      

      
      
    }).catch((err)=>{
      Alert.alert("Erro","Falha de cadastro!")
    })

  }
  const {setSigned, setName, role,setRole} = useUser();
  
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [nome, setNome] = useState("");
  const [acesso, setAcesso] = useState("");
  const navigation = useNavigation();

  const [date, setDate] = useState('01-01-1900');

  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <TextInput
            style={styles.input}
            onChangeText={setUser}
            value={user}
            placeholder="Email"
            
          />
      <TextInput
            style={styles.input}
            onChangeText={setUser}
            value={nome}
            placeholder="Nome"
            
          />

          <TextInput
            style={styles.input}
            onChangeText={setPass}
            value={pass}
            placeholder="Password"
            secureTextEntry={true}
          />
          <TextInput
            style={styles.input}
            onChangeText={setPass}
            value={acesso}
            placeholder="Acesso"
            secureTextEntry={true}
          />

        <View style={{flexDirection:'row',alignContent:'center', alignItems:'center'}}>
        <Text>
          Data nascimento:
        </Text>
        <DatePicker
          style={styles.datePickerStyle}
          date={date} //initial date from state
          mode="date" //The enum of date, datetime and time
          placeholder="select date"
          format="DD-MM-YYYY"
          minDate="01-01-2016"
          maxDate="01-01-2019"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              display: 'none',
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
              
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={(date) => {
            setDate(date);
          }}
        />
      </View>

          <TouchableOpacity
      style={styles.submit}
      onPress={()=>Register()}>
       
        <Text style={styles.buttontext}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity
          
          onPress={()=>navigation.navigate('Login')}>
          
            <Text >Voltar</Text>
          </TouchableOpacity>
    </View>
  );
}