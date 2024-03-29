import { StyleSheet } from 'react-native';
import { COLORS } from '../../theme/colors';
import {getStatusBarHeight} from 'react-native-iphone-x-helper'

export const styles = StyleSheet.create({
  container:{
    
    backgroundColor: 'white',
    paddingTop: getStatusBarHeight(),
    paddingHorizontal:20,
    height:'100%'
  },
  logincontainer: {
    flex: 1,
    justifyContent:"center",
    flexDirection:'column',
    alignItems:"center",
    
  },
  logininput:{
    backgroundColor:"#C5C5C5",
    color:"#000000",
    width:"80%",
    height:50,
    padding:8,
    borderRadius:8,
    marginBottom:12

  },
  title:{
    fontSize:24,
    marginBottom:24,
    fontWeight:"bold"
  },
  submit:{
    marginTop:12,
    backgroundColor:COLORS.BLUE_PRIMARY,
    height:50,
    borderRadius:8,
    width:"80%", 
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center"
  },
  buttontext:{
    fontWeight:"bold",
    color:COLORS.WHITE
  }
})