import React from 'react';

import {
  View
} from 'react-native';
import { File } from '../File';
import { Folder } from '../Folder';
import { styles } from './styles';

export function FileList(){
  return (
    <View>
      <Folder data={{folderName:"Pasta 1"}}/>
      <Folder data={{folderName:"Pasta 2"}}/>
    </View>
  );
}