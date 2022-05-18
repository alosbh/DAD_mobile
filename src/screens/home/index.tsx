import React from 'react';

import {
  View, KeyboardAvoidingView, Platform
} from 'react-native';

import { Header } from '../../components/Header';
import { FileList } from '../../components/FileList';
import { FileControl } from '../../components/FileControl';

import { styles } from './styles';
import {getStatusBarHeight} from 'react-native-iphone-x-helper'

export function Home(){
  return (
      <View style={styles.container}>
        {/* <Header/> */}
        {/* <FileControl/> */}
        <FileList/>
      </View>
    
    
  );
}