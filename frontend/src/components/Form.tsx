import React, {ReactElement, useEffect, useState} from "react";
import useApi from "../utils/useApi";
import { useTheme } from 'react-native-paper';
import { TextInput, Button } from 'react-native-paper';
import styles from "../styles/form_style";
import SelectGender from "./SelectGender";
import {NativeSyntheticEvent} from "react-native";
import validate, { errortype } from "../utils/validation";
export default function Form(props:any)
{
    const [data, Api] = useApi();
    const [form, setForm] = useState<Form>({});
    const [elements, setElements] = useState<React.JSX.Element[]>([]);
    const theme = useTheme();
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    useEffect(() => {
        renderForm(getKey(form));
    }, [form, secureTextEntry]);

    useEffect(() => {
        Api.get(props.name);
    }, []);
    
    useEffect(() => {
        const form = data as Form;
        setForm(form);
    }, [data]);

    const toggleSecureEntry = () => {
        setSecureTextEntry((prew)=>!prew);
    };

    function onChange(value: any, name: string){
        setForm((past) => {
            
            return {
                ...past,
                [name]: {
                    type: past[name].type,
                    value: value,
                    choices: past[name].choices||{},
                    patterns:past[name].patterns
                },
            };
        });
    }
    function renderForm(keys: string[]) {
        const elements: ReactElement[] = keys.map((e) => {
            let element: ReactElement = <></>;
            let type: string = form[e].type;
            let password: boolean = false;
            switch (type) {
            case "password":
                password = true;
            case "email":
            case "text":
                if (type == "password")
                    form[e].patterns = [
                        {
                            "pattern":".{6,}", 
                            "message":"Minimum 6 characters"
                        },
                        {
                            "pattern":"^(?=.*\\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[-_!@#$%^&*()+]).*$", 
                            "message":"Password must include at least: 1 upper case letter, 1 lower case letter, 1 number, 1 special character."
                        }
                    ]
                if(type == "email")
                    form[e].patterns = [
                        {
                            "pattern":"^[A-z0-9+_.-]+@[A-z0-9.-]+$",
                            "message": "invalid e-mail"
                        }
                    ]
                return(
                    <TextInput
                        key={e}
                        style={styles.inputStyle}
                        placeholder={e}
                        mode="outlined"
                        label={e}
                        onChange={(event: NativeSyntheticEvent<any>) => onChange(event.nativeEvent.text, e)}
                        value={form[e].value}
                        secureTextEntry={password?secureTextEntry:false}
                        right={
                        password ? (
                            <TextInput.Icon
                            icon="eye"
                            onPress={toggleSecureEntry}
                            />
                        ) : null
                        }
                    />
                );
            case "choice":
                 return(
                    <SelectGender key={e} name={e} onChange={(value:any, name:string)=>onChange(value,name)} />
                    )
          }
        }) as React.JSX.Element[];
        setElements(elements);
    }

    function getKey(form: Form | object | undefined) {
        if (!form) return [];
        let keys: any[] = [];
        for (const element in form) {
            keys.push(element);
        }
        return keys;
    }

    function handleSubmit() {
        let payload: Form = {} as Form;
        let formKeys: string[] = getKey(form);
        let isValid = true
        formKeys.forEach((key): void => {
            form[key].patterns?.forEach((pattern)=>{
                if(validate(form[key].value, pattern.pattern)!=errortype.good){
                    console.log(validate(form[key].value, pattern.pattern))
                    isValid = false
                    handleError(key,pattern.message)
                }else{
                    console.log(pattern.pattern + " good")
                }
            })
            payload[key] = { "type": form[key].type, "value": form[key].value };
        });
        if(!isValid) return
        Api.post(props.action, payload);
    }

    function handleError(name:string, message: string): void{
        console.log(message)
        setForm((past) => {
            return {
                ...past,
                [name]: {
                    type: past[name].type,
                    value: past[name].value,
                    choices: past[name].choices||{},
                    error: past[name].error ?   past[name].error?.concat([message]) : [message]
                },
            };
        });
    }
    return(
    <>
        {elements}
        <Button
            mode="contained-tonal"
            icon={props.ico||""}
            style={styles.buttonStyle}
            onPress={handleSubmit}
        >
            {props.prompt||""}
        </Button>
    </>
    )
}
