
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Notifications from "expo-notifications";

import {FileProps} from '../../components/File/index'

export const downloadFile=async (data: FileProps)=>{
    
    let fileUri = FileSystem.documentDirectory + "dummy.pdf";
    
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
             
            schedulePushNotification(asset);
           }
           else{
             console.log("error copying asset");
           }
         });
         
        }
      } catch (e) {
        console.log("error creating asset");
      }
}

async function schedulePushNotification(asset: MediaLibrary.Asset) {
  
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Download completed.",
      body: `Finished download of File: ${asset.filename}`,
      data: { uri: asset.uri },
    },
    trigger: null,
  });
}
