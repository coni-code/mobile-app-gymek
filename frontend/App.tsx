import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Loading from "./components/StartUp"
import { useEffect, useState } from 'react';
import useLocalStorage from './utils/useLocalStorage';
export default function App() {
  const [startup, setStartUp] = useState(false)

  function setdone(success:boolean){
    setStartUp(success)
  }
  
  if(!startup)
    return(
      <View style={styles.container}>
        <Loading setdone={setdone}></Loading>
      </View>
    );
  return (
    <View style={styles.container}>

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
