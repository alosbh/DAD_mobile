import React, {useEffect, useState} from 'react';

import {
  View
} from 'react-native';
import { File } from '../File';
import { Folder, FolderProps } from '../Folder';
import { styles } from './styles';
import { api } from '../../services/api';
const subjectId=4;

export function FileList(){

  const [topics, setTopics] = useState<FolderProps[]>([]);

  useEffect(()=>{
    async function fetchMessages(){
      
      // const messagesResponse = await api.get<FolderProps[]>(`/topics/${subjectId}`);
      const topicsResponse = [{folderId:"1",folderName:"Avisos",files:[{fileId:"1",filename:"Inicio das Aulas",icon:"pdffile1",url:"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"},{fileId:"2",filename:"Cronograma",icon:"pptfile1",url:"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"}]},
      {folderId:"2",folderName:"Aulas",files:[{fileId:"3",filename:"Modulo 1",icon:"pdffile1",url:"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"},{fileId:"4",filename:"Modulo 2",icon:"pdffile1",url:"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"},{fileId:"5",filename:"Modulo 3",icon:"pdffile1",url:"https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"}]}]
      
      
      setTopics(topicsResponse);
       
    }
    fetchMessages();
  },[])

  return (
    <View style={styles.container}>
      {topics.map((topic)=>(
        <Folder key={topic.folderId} data={{folderId:topic.folderId,folderName:topic.folderName,files:topic.files}}/>
      ))}
    </View>
  );
}