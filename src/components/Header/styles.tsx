import { StyleSheet } from 'react-native';
import { COLORS } from '../../theme/colors';
export const styles = StyleSheet.create({
  container: {
    width:'100%',
    flexDirection:'row',
    backgroundColor:COLORS.BLUE_PRIMARY,
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:10,
    paddingVertical:4
    
  },
  menuContainer:{
    flexDirection:'row'
  },
  textContainer:{
    marginLeft:12
  },
  icon:{

  }
});