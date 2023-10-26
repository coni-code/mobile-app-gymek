import { useEffect, useState } from "react";
import axios from "axios";
import json from "../api/endpoint.json"
import {baseURL} from "../api/url.json"
const useApi = () => {
  const [data, setData] = useState<object>({}); //saves data as json
  const [endpoints,setEndpoints] = useState<endpoint>(json)
  function get(end: string) : void
  {
    const url =  baseURL+checkForEndpoint(end,"GET")
    console.log(url)
    axios.get(url).then(function (response: any) {
      setData(response.data)
    }).catch(function (error) {
      throw new Error(error);
    })
  }

  function post(end: string) : void 
  {
    const url = baseURL+checkForEndpoint(end,"POST")
    axios.post(url).then(function (response: any) {
      setData(response.data)      
    }).catch(function (error) {
      throw new Error(error);
    })
  }

  function checkForEndpoint(end:string,method:string): string
  {
    
    if(!(end in endpoints)) throw new Error(`No endpoint found! Avileble: ${JSON.stringify(endpoints)}`);
    const _endpoint = endpoints[end];
    if(!(method in _endpoint.method)) throw new Error("This endpoint can't use GET!");
    return _endpoint.url
  }
  /*
  useEffect(()=>{
    // load avilable endpoints
    axios.get(baseURL+"/").then(function (response: any) {
      setEndpoints(response.data)
    }).catch(function (error) {
      throw new Error(error);
    })
  },[])
  */
  const object = { get, post, json } //object to manipulate this hook
  return [data, object] as const
}
export default useApi;
