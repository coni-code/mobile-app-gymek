import { useState } from "react";
import axios from "axios";
import {baseURL, getEndpoint} from "../api/url.json"

const useApi = () => {
  const [data, setData] = useState<object>({});

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

  async function endpointToURL(endpoint:string,method:string): Promise<string>
  {
    const url = baseURL+ getEndpoint + "/" + endpoint
  
    return await axios.get(url).then(function (response: any) {
      if(response.data?.url){
          if(method in response.data.methods){
            return response.data.url
          }
          throw new Error("Method not matched!")
      }
      }).catch(function (error) {
      throw new Error(error);
    })
  }

  const object = { get, post }
  return [data, object] as const
}

export default useApi;
