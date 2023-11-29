import React, {ReactElement, useEffect, useState} from "react";
import useApi from "../utils/useApi";
import { useTheme } from 'react-native-paper';
import { TextInput, Button } from 'react-native-paper';
import styles from "../styles/form_style";
import SelectGender from "./SelectGender";
import {NativeSyntheticEvent} from "react-native";
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
                element = (
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
                break;
            case "choice":
                element = (
                    <SelectGender key={e} name={e} onChange={(value:any, name:string)=>onChange(value,name)} />
                )
              break;
          }
          return element;
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

        formKeys.forEach((key): void => {
            payload[key] = { "type": form[key].type, "value": form[key].value };
        });

        Api.post(props.action, payload);
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
