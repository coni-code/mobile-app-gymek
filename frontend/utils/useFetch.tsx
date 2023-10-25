import { useEffect, useState } from "react";
import axios from "axios";
const useFetch = (options:{}) =>{
    const [json, setJson] = useState("");

    function call(option:{}){
          axios.request(option).then(function (response:any){
            setJson(response.data);
          }).catch(function (error:string) {
            console.error(error);
          })
    }
    
    useEffect(()=>{
        call(options)
    },[])

    return [json, call] as const
}
export default useFetch; 