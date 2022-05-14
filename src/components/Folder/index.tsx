import React,{useState,FC} from 'react';

import {
  View, Text,TouchableOpacity
} from 'react-native';
import { File, FileProps } from '../File';
import { FontAwesome } from '@expo/vector-icons';
import { styles } from './styles';

export type FolderProps = {
  folderId: string,
  folderName: string
  files: FileProps[]
  
}
type Props = {
  data: FolderProps
}
export function Folder({data}:Props){

    const [isOpened, openFolder] = useState(true);

  return (
    
    <View style={styles.container}>
      
      <TouchableOpacity 
        onPress={()=>openFolder(!isOpened)} 
        style={styles.folderNameContainer}
      >
        {
          isOpened?
            <FontAwesome name="folder-open" size={24} color="black" />
          :
            <FontAwesome name="folder" size={24} color="black" />
        }
        <Text style={styles.folderName}>{data.folderName}</Text>
      </TouchableOpacity>

        {isOpened ? 
        
        <View>
          {data.files.map((file)=>(
            <File key={file.fileId} data={{fileId:file.fileId, filename:file.filename,icon:file.icon,url:file.url}}/>
          ))}
            
        </View>
        
        :<></>}
      
    </View>
  );
}