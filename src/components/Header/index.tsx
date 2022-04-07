import React from 'react';

import {
  View, Text, TouchableOpacity
} from 'react-native';

import {FontAwesome, Entypo} from '@expo/vector-icons'

import { styles } from './styles';

export function Header(){
  return (
    <View style={styles.container}>
        <View style={styles.menuContainer}>
          <TouchableOpacity>
            <Entypo name={"menu"} size={40} color={"white"}/>
          </TouchableOpacity>
          
          <View style={styles.textContainer}>
            <Text style={styles.headerText}>
              Arquivoss
            </Text>
            <Text style={styles.headerText}>
              DESENV. DE APLICAÇÕES DIST.
            </Text>
          </View>

        </View>
        
      
      <FontAwesome name={"search"} size={24} color={"white"}/>
      
    </View>
  );
}