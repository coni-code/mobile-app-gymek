import React, { useEffect, useState } from "react";
import useApi from "../utils/useApi";
import { useTheme } from 'react-native-paper';
import { TextInput, Button } from 'react-native-paper';
import styles from "../styles/form_style";
import SeclectGender from "./SelectGender";
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
        const elements = keys.map((e) => {
          let element = <></>;
          let type = form[e].type;
          let password = false;
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
                  onChange={(event) => onChange(event.nativeEvent.text, e)}
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
                element = (<SeclectGender key={e} name={e} onChange={(value:any,name:string)=>onChange(value,name)}></SeclectGender>)
              break;
          }
          return element;
        }) as React.JSX.Element[];
        setElements(elements);
      }
    
      function getKey(form: Form | object | undefined){
        if (undefined) return [];
        let keys = [];
        for (const element in form) {
          keys.push(element);
        }
        return keys;
      }
    
      function handleSubmit() {
        // validate
        let payload = {} as Form
        let key = getKey(form)
        key.forEach((k)=>{
          payload[k] = {"type":form[k].type,"value":form[k].value}
        })
        Api.post("registerUser", payload)
      }

    return(
    <>
        {elements}
        <Button mode="contained-tonal" icon="account-plus" style={styles.buttonStyle} onPress={handleSubmit}>Register</Button>
    </>
    )
}
