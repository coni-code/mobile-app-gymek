import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import StartUp from "./src/screens/StartUp"
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

    function setDone(success:boolean){
        setStartUp(success)
    }

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
