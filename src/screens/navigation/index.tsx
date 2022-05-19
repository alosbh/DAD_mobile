import React, {useEffect, useState} from 'react';

import {
  Button,
  Text,
  View
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
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
export function MainNav(){

  const [disciplines, setDisciplines] = useState<DisciplineProps[]>([]);
  useEffect(()=>{
    async function fetchDisciplines(){
      
      const disciplinesResponse = await api.get<DisciplineProps[]>(`/Disciplines`);
     
      setDisciplines(disciplinesResponse.data)
      // let newState = disciplinesResponse.data.map((disc)=>disc);
      //  setDisciplines(newState);
    }
    fetchDisciplines();
  },[])

  return (
    <NavigationContainer independent={true}>
       <Drawer.Navigator
      //  screenOptions={{
      //   headerShown: false
      // }}
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        
        <Drawer.Screen name="Welcome" component={HomePage}></Drawer.Screen>
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

  const {setSigned, setName} = useUser();
  return(
    <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>
      <Text>Navegue pelas disciplinas no menu lateral</Text>
      
    </View>
  )
}