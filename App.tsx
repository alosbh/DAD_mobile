import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import {Text, View, Button,Platform, Alert, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState,useRef } from "react";
import {Home, DisciplineProps} from './src/screens/home'
import {Route} from './src/Routes'
import UserProvider, {useUser} from './src/context/userContext'

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

import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { authApi,api } from './src/services/api';
import {styles} from './styles'


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const channelId = "DownloadInfo";



export default function App() {


  
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (

    <UserProvider>
      <NavigationContainer>
        <Route />
      </NavigationContainer>
     </UserProvider>
  );
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    console.log("GETTING PERMISSIONS!")
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    console.log(`existing status: ${existingStatus}`)
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
      console.log("STATUS")
      console.log(`final status: ${finalStatus}`)
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


function CustomDrawerContent(props) {
  
  return (
    
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

