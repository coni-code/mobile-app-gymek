import React, { useEffect, useState } from "react"
import { Button } from "react-native-paper"
import { View } from "react-native"
import styles from "../styles/form_style"
type props = {
    name:string;
    onChange:(v:string,n:string) => void
}
export default function SeclectGender(props:props)
{
    const [buttons,setButtons] = useState<React.JSX.Element[]>([<></>])
    const choices = ["male","female","other"]
    useEffect(()=>{
        const b = choices.map((key)=><Button key={key} mode="contained-tonal" onPress={()=>click(key)}>{key}</Button>)
        setButtons(b)
    },[])
    const click = (v: string) => {
        props.onChange(v,props.name)
        return
    }
    return (
    <View style={styles.gender}>
        {buttons}
    </View>)
}
