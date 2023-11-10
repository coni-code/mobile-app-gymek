import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StartUp from "./components/StartUp"
import { useState } from 'react';
import Registration from './screens/Registration';

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
    <View style={styles.container}>
      {logged?<></>:<Registration></Registration>}
    </View>
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
