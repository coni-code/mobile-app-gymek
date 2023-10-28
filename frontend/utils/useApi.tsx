import { useEffect, useState } from "react";
import axios from "axios";
import json from "../api/endpoint.json"
import {baseURL, updateEndpoint} from "../api/url.json"
const useApi = () => {
  const [data, setData] = useState<object>({}); //saves data as json
  const [endpoints,setEndpoints] = useState<endpoint>(json)
  // function for working with api get endpoints
  function get(end: string,params?:string) : void
  {
    const url =  baseURL+endpointToURL(end,"GET") + (params?params:"")
    if(!(methodCheck("GET",endpointToMethods(end))))
      return;
     axios.get(url).then(function (response: any) {
      setData(response.data)
    }).catch(function (error) {
      throw new Error(error);
    })
  }
  // funstion for using api post endpoints
  function post(end: string,data: any) : void
  {
    const url = baseURL+endpointToURL(end,"POST")
    if(!(methodCheck("POST",endpointToMethods(end))))
      return;
    axios.post(url,data).then(function (response: any) {
      setData(response.data)      
    }).catch(function (error) {
      throw new Error(error);
    })
  }
  //function checks if string is a endpoint name in endpoint object and returns its url
  function endpointToURL(end:string,method:string): string
  {
    checkEndpoint(end)
    const _endpoint = endpoints[end];
    return _endpoint.url;
  }
  //function returns url of endpoint object
  function endpointToMethods(end:string): object{
    checkEndpoint(end)
    const _endpoint = endpoints[end];
    return _endpoint.method;
  }
  //function checks if endpoint is presented in avilable list of endpoints
  function checkEndpoint(endpoint:string): boolean{
    if(!(endpoint in endpoints)) 
    {
      setData({error:`No endpoint like ${endpoint} was found! Avilable: ${JSON.stringify(endpoints)}`});
      return false;
    }
    return true;
  }
  //function checks if endpoint method is presented in avilable list of endpoints methods
  function methodCheck(method:string, avilable: object): boolean{
    if(!(method in avilable)) 
    {
      setData({error:`This endpoint can't use ${method}! Only avilable methods for this endpoint is: ${avilable}`});
      return false;
    }
    return true;
  }
  //function to check if urls changed and endpoints was added, implement it at startup of an app in loading screen
  async function setUp() : Promise<boolean>
  {
    const urlToEndpointData = updateEndpoint // change to correct url whom will return endpoint data
    await axios.get(baseURL+urlToEndpointData).then(function (response: any) {
      setEndpoints(response.data)
    }).catch(function (error){
      console.log(error)
    });
    return true
  }

  const object = { get, post, setUp, endpoints } //object to manipulate this hook
  return [data, object] as const
}
export default useApi;
