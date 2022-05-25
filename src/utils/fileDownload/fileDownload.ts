
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Notifications from "expo-notifications";
import * as IntentLauncher from 'expo-intent-launcher';

import {newFileProps} from '../../components/File/index'

export const downloadFile=async (data: newFileProps)=>{
    
    console.log(`file URL is ${data.url}`)

    let fileExtension = data.url.split("?alt")[0].split(".")[data.url.split("?alt")[0].split(".").length-1]
    console.log(`file extension is ${fileExtension}`);
    
    
    let filename = `${data.title}.${fileExtension}`
    console.log(`data filename is ${data.title}`)
    
    let fileUri = FileSystem.documentDirectory + filename;
    console.log(`filename uri ${fileUri}`);
    FileSystem.downloadAsync(
      data.url,
      fileUri,
      
    ).then((res)=>{

      FileSystem.getContentUriAsync(res.uri).then(cUri => {
        schedulePushNotification(filename);
        console.log(`download completed ${cUri}`)
        console.log(`file extensio ${fileExtension}`)
        IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
            data: cUri,
            flags: 1,
            type:`application/${fileExtension}`
         });
      });


    }

      
    )
      
      .catch(error => {
        console.error(error);
        return;
      });

      // try {
      //   const asset = await MediaLibrary.createAssetAsync(fileUri);
      //   const album = await MediaLibrary.getAlbumAsync('Download');
      //   if (album == null) {
      //    MediaLibrary.createAlbumAsync('Download', asset, false);
      //   } else {
      //    MediaLibrary.addAssetsToAlbumAsync([asset], album, false).then((success)=>{
      //      if(success){
      //        console.log("Success");
      //        console.log(asset);
      //       schedulePushNotification(asset);
      //      }
      //      else{
      //        console.log("error copying asset");
      //      }
      //    });
         
      //   }
      // } catch (e) {
      //   console.log("error creating asset");
      //   console.log(e)
      // }
}

async function schedulePushNotification(asset: string) {
  
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `${asset}`,
      body: `Download completed.`,
      data: { uri: null },
    },
    trigger: null,
  });
}
