import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StartUp from "./screens/StartUp"
import { useState } from 'react';
import Registration from './screens/Registration';
import { PaperProvider, MD3LightTheme as DefaultTheme } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    registrationButton: '#ED3D63',
  },
};

export default function App() {
  
  const [startup, setStartUp] = useState(false)
  const [logged, setLogged] = useState(false)
  
  function setdone(success:boolean){
    setStartUp(success)
  }

  if(!startup)
    return(
      <View style={styles.container}>
        <StartUp setdone={setdone}></StartUp>
      </View>
    );

  return (
      <PaperProvider theme={theme}>
        <View style={styles.container}>
          {logged?<></>:<Registration></Registration>}
        </View>
      </PaperProvider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
