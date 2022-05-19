
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Notifications from "expo-notifications";

import {newFileProps} from '../../components/File/index'

export const downloadFile=async (data: newFileProps)=>{
    
    console.log(`file URL is ${data.url}`)

    let fileExtension = data.url.split("?alt")[0].split(".")[data.url.split("?alt")[0].split(".").length-1]
    console.log(`file extension is ${fileExtension}`);
    
    // let filename = data.url.substring(data.url.lastIndexOf('/')+1);
    let filename = `${data.title}.${fileExtension}`
    console.log(`data filename is ${data.title}`)
    console.log(`filename is ${filename}`);
    let fileUri = FileSystem.documentDirectory + filename;
    
    FileSystem.downloadAsync(
      data.url,
      fileUri,
      
    )
      
      .catch(error => {
        console.error(error);
        return;
      });

      try {
        const asset = await MediaLibrary.createAssetAsync(fileUri);
        const album = await MediaLibrary.getAlbumAsync('Download');
        if (album == null) {
         MediaLibrary.createAlbumAsync('Download', asset, false);
        } else {
         MediaLibrary.addAssetsToAlbumAsync([asset], album, false).then((success)=>{
           if(success){
             console.log("Success");
             console.log(asset);
            schedulePushNotification(asset);
           }
           else{
             console.log("error copying asset");
           }
         });
         
        }
      } catch (e) {
        console.log("error creating asset");
        console.log(e)
      }
}

async function schedulePushNotification(asset: MediaLibrary.Asset) {
  
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `${asset.filename}`,
      body: `Download completed.`,
      data: { uri: asset.uri },
    },
    trigger: null,
  });
}
