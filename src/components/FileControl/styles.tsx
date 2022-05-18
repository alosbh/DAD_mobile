import { StyleSheet } from 'react-native';
import { COLORS } from '../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    display:'flex',
    flexDirection:'row-reverse',
    alignContent:'space-between',
    marginTop:16,
    marginBottom:8,
    paddingHorizontal:20
  },
  button:{
    backgroundColor:COLORS.BLUE_PRIMARY,
    padding:6,
    width:'25%',
    borderRadius:8,
    marginLeft:8,
    display:'flex',
    flexDirection:'row',
    justifyContent:'center'
    
  },
  buttonText:{
    color: COLORS.WHITE,
    fontSize:12
  }
});