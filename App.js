import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { AuthProvider } from './contexts/AuthContext';
import { StatusBar } from 'react-native';
import Routes from './navigation';

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <NativeBaseProvider>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </NativeBaseProvider>
    </>
  );
}
