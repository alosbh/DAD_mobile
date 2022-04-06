import { StatusBar } from 'expo-status-bar';
import {Text, View } from 'react-native';
import { Header } from './src/components/Header';
import {Home} from './src/screens/home'


export default function App() {
  return (
    <View >
      <StatusBar style='light'translucent backgroundColor='transparent'/>
      <Home/>
      
      
    </View>
  );
}

