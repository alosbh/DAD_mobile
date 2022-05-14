import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import {Text, View, Button,Platform } from 'react-native';
import React, { useEffect, useState,useRef } from "react";
import {Home} from './src/screens/home'
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as Device from 'expo-device';
import FileViewer from 'react-native-file-viewer';

import {
  AndroidImportance,
  AndroidNotificationVisibility,
  NotificationChannel,
  NotificationChannelInput,
  NotificationContentInput,
} from "expo-notifications";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


const Drawer = createDrawerNavigator<RootStackParamList>();

const screens = [{screenId:"1",screenName:"Materia 1"},{screenId:"2",screenName:"Materia 2"},{screenId:"3",screenName:"Materia 3"}]

type RootStackParamList = {
  
  Topic: { userId: string };
 
};

const channelId = "DownloadInfo";
export default function App() {

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  useEffect(() => {
    setNotificationChannel();
  });
  
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      // console.log(response.notification.request.content.data.uri);
      const path = response.notification.request.content.data.uri
      console.log(`Try to open file: ${path}`);
      FileViewer.open('file://storage/emulated/0/DCIM/dummy_2.pdf', { showOpenWithDialog: true })
      .then(() => {
          console.log("sucesso abrir arquivo");
      })
      .catch(error => {
          console.log("nao foi possivel abrir arquivo");
          console.log(error)
      });
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  

  

  
  return (

    

    // <NavigationContainer>
    //   <Drawer.Navigator initialRouteName="Topic1">
    //   <Drawer.Screen name="Materia 1" component={HomeScreen} initialParams={{ userId: "Topico um" }}/>
    //   <Drawer.Screen name="Materia 2" component={HomeScreen} initialParams={{ userId: "Topico dois" }}/>
    //   <Drawer.Screen name="Materia 3" component={HomeScreen} initialParams={{ userId: "Topico tres" }}/>
    //     {screens.map((screen)=>(
    //       <Drawer.Screen key={screen.screenId} name={screen.screenName} component={HomeScreen} initialParams={{ userId: screen.screenName }}/>
        
    //     ))}
        
        
    //   </Drawer.Navigator>
    // </NavigationContainer>

    <View >
      <StatusBar style='light'translucent backgroundColor='transparent'/>
      <Home/>
      
      
    </View>
  );
}



async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('DownloadInfo', {
      name: 'DownloadInfo',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

async function setNotificationChannel() {
  const loadingChannel: NotificationChannel | null = await Notifications.getNotificationChannelAsync(
    channelId
  );
    if (loadingChannel == null) {
    const channelOptions: NotificationChannelInput = {
      name: channelId,
      importance: AndroidImportance.HIGH,
      lockscreenVisibility: AndroidNotificationVisibility.PUBLIC,
      sound: "default",
      vibrationPattern: [250],
      enableVibrate: true,
    };
    await Notifications.setNotificationChannelAsync(
      channelId,
      channelOptions
    );
  }
}
