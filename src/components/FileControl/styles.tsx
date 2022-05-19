import { StyleSheet } from 'react-native';
import { COLORS } from '../../theme/colors';

export const styles = StyleSheet.create({
  container:{flex:1
  },
  buttonsContainer: {
    display:'flex',
    flexDirection:'row-reverse',
    alignContent:'space-between',
    
    marginBottom:8,
    paddingHorizontal:20
  },
  newTopicContainer:{
    
  },
  collapsedInput:{
    
    display:'none'
    
  }
  ,
  buttonsSubmit:{
    flexDirection:'row-reverse',
  },
  input:{
    backgroundColor: '#C3C3C3',
    color:'#000000',
    padding:6,
    borderRadius:4

  },
  button:{
    
    padding:6,
    width:'25%',
    borderRadius:8,
    marginLeft:8,
    display:'flex',
    flexDirection:'row',
    justifyContent:'center'
    
  },
  buttonText:{
    color: COLORS.BLUE_PRIMARY,
    fontSize:12,
    marginLeft:8
  }
});