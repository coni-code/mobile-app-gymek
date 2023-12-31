import { View, ActivityIndicator } from "react-native"
import useApi from "utils/useApi"
import { useEffect } from "react"

const Loading = ({setDone = (a:boolean)=>{}}) =>
{
  const [data, Api] = useApi()
 
  useEffect(()=>{
    getEndpoints()
  },[])

  async function getEndpoints(){
    const getEndpoints = await Api.getEndpointData() as success
    if(getEndpoints.success !== undefined){
      setDone(true)
    }
  }

  return(
    <View>
        <ActivityIndicator size={"large"} color={"#ff00ff"}></ActivityIndicator>
    </View>
  )   
}
export default Loading
