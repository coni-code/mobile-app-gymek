import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import useFetch from './utils/useFetch';
import data from "./api/endpoint.json"
export default function App() {
  const [val, callUrl] = useFetch({url:data.baseApiUrl+data.getRegistrationForm.url,method:data.getRegistrationForm.method[0]});
  function newCall(){
    callUrl({})
  }
  return (
    <View style={styles.container}>
      <Text>{val}</Text>
      <StatusBar style="auto" />
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
