import { StyleSheet } from 'react-native';
import { COLORS } from '../../theme/colors';
export const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:20,
    
  },
  filescontainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    paddingVertical:8
  },
  fileNameContainer:{
    flexDirection:'row'
  },
  fileName:{
    marginLeft:8,
    fontSize:18
    
  }
});