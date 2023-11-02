import React, { useEffect, useState } from "react"
import useApi from "../utils/useApi"
import { StyleSheet ,TextInput, SafeAreaView } from "react-native"

const Registration = () => 
{
    const [data,Api] = useApi()
    const [form, setForm] = useState({})
    const [elements, setElements] = useState<React.JSX.Element[]>([])
    useEffect(()=>{
        Api.get("getRegistrationForm")
    },[])
    useEffect(()=>{
        const form = data as Form
        let keys = []
        for(const element in form){
            keys.push(element)
        }
        setForm(form)
        const elements = keys.map((e)=><TextInput style={styles.input} placeholder={e} key={Math.random()} value={form[e].value} onChange={(event)=>onChange(event,e)}></TextInput>) as React.JSX.Element[]
        setElements(elements)
    },[data])
    function onChange(event:any, name:string){
        const value = event.target.value
        console.log(name, value)
    }
    return(
        <SafeAreaView>
            {elements}
        </SafeAreaView>
    )
    
}
const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },});
export default Registration
