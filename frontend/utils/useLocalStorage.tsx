import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const useLocalStorage = (itemName:string,value:object|null) => {
    const [name, setName] = useState(itemName)

    async function SetItem(value:object): Promise<object>
    {
        try{
            await AsyncStorage.setItem(name,JSON.stringify(value));
            return {success:"Success"}
        }
        catch{
            return {error:500}
        }
    }

    async function GetItem(): Promise<object>
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
        if(value !== null)
            SetItem(value)
    },[])

    return [SetItem, GetItem]
}

export default useLocalStorage;
