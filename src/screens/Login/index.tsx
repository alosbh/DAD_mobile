import React, {useState, useEffect} from 'react';
import {useUser} from '../../context/userContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View, Text, TextInput, TouchableOpacity, Alert
} from 'react-native';

import { styles } from './styles';
import {authApi} from '../../services/api'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
export function Login(){

  async function Authenticate(){
    
    
    let credentials = {"email":user,"senha":pass}
    // console.log(`Credenciais: ${credentials.email} ${credentials.senha}`)
    await authApi.post('/Autenticacao/login',credentials)
    .then((res)=>{
      console.log(`Autenticação sucesso`)
      
      console.log(res.data)
      setSigned(true);
      let bearerToken = res.data.bearer
      let userId = res.data.id
      const config = {
        headers: { Authorization: `Bearer ${bearerToken}` }
    };
    
      console.log(bearerToken)
      console.log(userId)
      AsyncStorage.setItem('@TOKEN_KEY', bearerToken).then();

      authApi.get(`/Usuario/${userId}`,config).then((res)=>{
        console.log("sucesso eprfil usuario");
        console.log(res.data)
        setRole(res.data.role)
        setName(res.data.nome)
      }).catch((err)=>{
        console.log("erro perfil user")
        console.log(err)
      })
      
    }).catch((err)=>{
      Alert.alert("Erro","Falha de autenticação!")
    })

  }
  const {setSigned, setName, role,setRole} = useUser();
  
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
            style={styles.input}
            onChangeText={setUser}
            value={user}
            placeholder="Usuario"
            
          />

<TextInput
            style={styles.input}
            onChangeText={setPass}
            value={pass}
            placeholder="Password"
            secureTextEntry={true}
          />
          <TouchableOpacity
          style={styles.submit}
          onPress={()=>Authenticate()}>
          
            <Text style={styles.buttontext}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
          
          onPress={()=>navigation.navigate('Register')}>
          
            <Text >Registrar</Text>
          </TouchableOpacity>
    </View>
  );
}