import { StyleSheet } from 'react-native';
import { COLORS } from '../../theme/colors';
import {getStatusBarHeight} from 'react-native-iphone-x-helper'

export const styles = StyleSheet.create({
  container:{
    
    backgroundColor: 'white',
    paddingTop: getStatusBarHeight(),
    height:'100%'
  }
})