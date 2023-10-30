import { useState } from "react";
import axios from "axios";
import {baseURL, getEndpoint} from "../api/url.json"
import useLocalStorage from "./useLocalStorage";

const useApi = () => {
  const [data, setData] = useState<object>({});
  const storage = useLocalStorage("endpoints");
  async function get(endpoint: string,params?:string) : Promise<void>
  {
    const url =  baseURL+ await endpointToURL(endpoint,"GET") + (params?params:"")
  
    await axios.get(url).then(function (response: any) {
      setData(response.data)
    }).catch(function (error) {
      throw new Error(error);
    })
  }

  async function post(endpoint: string,data: any) : Promise<void>
  {
    const url = baseURL + await endpointToURL(endpoint,"POST")
  
    await axios.post(url,data).then(function (response: any) {
      setData(response.data)
    }).catch(function (error) {
      throw new Error(error);
    })
  }
  async function getEndpointData(): Promise<void>
  {
    const url = baseURL+ getEndpoint
    return await axios.get(url).then(async function (response: any) 
    {
      await storage.setItem(response.data as Endpoint)
    }).catch(function (error) 
    {
      throw new Error(error);
    })
  }

  async function endpointToURL(endpointName:string,method:string) : Promise<string>
  {
    const endpoints = await storage.getItem() as Endpoint
    const url = endpoints[endpointName].url
    const methods = endpoints[endpointName].method
    if(!(method in methods))
      throw new Error(`Endpoint ${endpointName} don't have ${method} method`)
    return url
  }
  const object = { get, post , getEndpointData}
  return [data, object] as const
}

export default useApi;
