import React from 'react';

import {
  Text,
  View
} from 'react-native';

import {useUser} from './context/userContext'
import { Home } from './screens/home';
import { Login } from './screens/Login';
import { MainNav } from './screens/navigation';
import Auth from './components/navigation/'
export function Route(){
  const {signed} = useUser();
  return (
    <>
      {
      signed 
      ? <MainNav/>
      
      : <Auth />
    }
    </>
  );
}