import React, {useEffect, useState} from 'react';

import {
  Button,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {DisciplineProps} from '../home'
import {api} from '../../services/api'
import { useUser } from '../../context/userContext';
import { Home } from '../home';
import { AntDesign } from '@expo/vector-icons';
import { styles } from './styles';
function LogoTitle() {

  const {setSigned, setName,role,name} = useUser();
  return (
    // <Image
    //   style={{ width: 50, height: 50 }}
    //   source={require('@expo/snack-static/react-native-logo.png')}
    // />
    <View style={styles.header}>
        <TouchableOpacity
              
              onPress={()=>setSigned(false)}
              >
                <View style={styles.logout}>
                 <Text>Logout</Text>
                  <AntDesign
                    style={styles.logoutIcon}
                  name='logout'
                size={24} 
                  color="black" />
                </View>
                
            </TouchableOpacity>
    </View>
    
  );
}

export function MainNav(){

  
  const [disciplines, setDisciplines] = useState<DisciplineProps[]>([]);
  useEffect(()=>{
    async function fetchDisciplines(){
      
      const disciplinesResponse = await api.get<DisciplineProps[]>(`/Disciplines`);
     
      setDisciplines(disciplinesResponse.data)
    }
    fetchDisciplines();
  },[])

  

  return (
    <NavigationContainer independent={true}>
       <Drawer.Navigator
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        
        <Drawer.Screen name="Welcome" options={{ headerTitle: (props) => <LogoTitle {...props} /> }} component={HomePage}></Drawer.Screen>
        {
          disciplines.map((discipline)=>(<Drawer.Screen  key={discipline.id} name={discipline.title} initialParams={discipline} component={Home} />)
  
          )
         
        }
        
      
      {}
      
      
    </Drawer.Navigator>
     </NavigationContainer>
  );
}
function CustomDrawerContent(props) {
  
  return (
    
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

function HomePage(){

  const {setSigned, setName,role,name} = useUser();
  return(
    <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>
      <Text>Bem Vindo!</Text>
      <Text>{`Usuario: ${name}`}</Text>
      <Text>{`Perfil: ${role}`}</Text>
    </View>
  )
}