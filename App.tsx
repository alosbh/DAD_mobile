import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import {Text, View, Button } from 'react-native';
import { Header } from './src/components/Header';
import {Home} from './src/screens/home'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home!" />
    </View>
  );
}

const Drawer = createDrawerNavigator();
export default function App() {
  return (

    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>

    // <View >
    //   <StatusBar style='light'translucent backgroundColor='transparent'/>
    //   <Home/>
      
      
    // </View>
  );
}

