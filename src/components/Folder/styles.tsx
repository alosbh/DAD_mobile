import { StyleSheet } from 'react-native';
import { COLORS } from '../../theme/colors';
export const styles = StyleSheet.create({
  container: {
    
    
    
    paddingVertical:8
  },containerControl:{
    
    flexDirection:'row',
    justifyContent: 'space-between'
  },
  icons:{
    flexDirection:'row',
  },
  lastIcon:{
    marginLeft:12
  }, 
  folderNameContainer:{
      flexDirection:'row'

  },

  folderName:{
    marginLeft:8,
    fontSize:18,
    color:'black'
    
  }
});