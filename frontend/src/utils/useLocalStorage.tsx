import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';

const useLocalStorage = (itemName:string,value?:object) => {
    const [name, setName] = useState(itemName)

    async function setItem(value:object): Promise<object>
    {
        try{
            await AsyncStorage.setItem(name,JSON.stringify(value));
            return {"success":"Success"}
        }
        catch (err:any)
        {
            return {"error":500}
        }
    }

    async function getItem(): Promise<object>
    {
        try{
            const data = await AsyncStorage.getItem(name)
            if(data!==null)
                return JSON.parse(data)
            return {"error":404}
        } 
        catch{
            return {"error":500}
        }
    }

    useEffect(()=>{
        let a
        if(value !== undefined)
            a = setItem(value)
    },[])

    return {setItem, getItem}
}

export default useLocalStorage;
