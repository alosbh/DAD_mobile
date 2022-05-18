import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar';
import {Text, View, Button,Platform } from 'react-native';
import React, { useEffect, useState,useRef } from "react";
import {Home} from './src/screens/home'
// import { createDrawerNavigator } from '@react-navigation/drawer';
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
import { api } from './src/services/api';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});




const channelId = "DownloadInfo";

const initialDiscipline = {
  "studentsIds": [
    
  ],
  "id": "x",
  "title": "x",
  "description": "x",
  "teacherId": "x"
}

type DisciplineProps = {
  studentsIds: string[],
  id: string,
  title:string,
  description: string,
  teacherId: string
  
}

export default function App() {

  // const [expoPushToken, setExpoPushToken] = useState('');
  // const [notification, setNotification] = useState(false);

  const [disciplines, setDisciplines] = useState<DisciplineProps[]>([initialDiscipline]);
  const notificationListener = useRef();
  const responseListener = useRef();
  
  useEffect(()=>{
    async function fetchDisciplines(){
      console.log("get discipliens")
      const disciplinesResponse = await api.get<DisciplineProps[]>(`/Disciplines`);
      // console.log(disciplinesResponse.data)
      setDisciplines(disciplinesResponse.data)
       
    }
    fetchDisciplines();
  },[])
  
  useEffect(() => {
    setNotificationChannel();
  });


  
  useEffect(() => {
    // registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
    //   setNotification(notification);
    // });
    
    
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      // console.log(response.notification.request.content.data.uri);
      const path = response.notification.request.content.data.uri
      console.log(`Try to open file: ${path}`);
      FileViewer.open(path, { showOpenWithDialog: true })
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
    <NavigationContainer>
       <Drawer.Navigator
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        
      {disciplines.map((discipline)=>(<Drawer.Screen key={discipline.id} name={discipline.title} component={Home} />)
      
      
        // (
        //   <Drawer.Screen key={discipline.id} name={discipline.title} component={Home} />
        // )      
      )}
      
      
    </Drawer.Navigator>
     </NavigationContainer>
    // <View >
    //   <StatusBar style='light'translucent backgroundColor='transparent'/>
    //   <Home/>
    // </View>
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

const data = [{id:1,name:"Materia 1"},{id:2,name:"Materia 2"},{id:3,name:"Materia 3"}]


function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      {data.map((mat)=>(
      <Drawer.Screen key={mat.id} name={mat.name} component={Home} />
      
      )      
      )}
      
      
    </Drawer.Navigator>
  );
}

// export default function App() {
//   return (
//     <NavigationContainer>
//       <MyDrawer />
//     </NavigationContainer>
//   );
// }
