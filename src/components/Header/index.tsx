import React from 'react';

import {
  View, Text
} from 'react-native';

import {FontAwesome, Entypo} from '@expo/vector-icons'

import { styles } from './styles';

export function Header(){
  return (
    <View style={styles.container}>
        <View style={styles.menuContainer}>
          <Entypo name={"menu"} size={40} color={"white"} style={styles.icon}/>
          <View style={styles.textContainer}>
          <Text>
           Arquivos
          </Text>
          <Text>
            DESENV. DE APLICAÇÕES DIST.
          </Text>
        </View>

        </View>
        
      
      <FontAwesome name={"search"} size={24} color={"white"} style={styles.icon}/>
      
    </View>
  );
}