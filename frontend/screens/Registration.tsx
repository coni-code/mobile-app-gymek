import React, { useEffect, useState } from "react";
import useApi from "../utils/useApi";
import { StyleSheet, SafeAreaView, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useTheme } from 'react-native-paper';
import { TextInput, Button } from 'react-native-paper';

const Registration = () => {
  const [data, Api] = useApi();
  const [form, setForm] = useState<Form>({});
  const [elements, setElements] = useState<React.JSX.Element[]>([]);
  const theme = useTheme();
  const [secureTextEntry, setSecureTextEntry] = useState(true);


  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  useEffect(() => {
    Api.get("registrationForm");
  }, []);

  useEffect(() => {
    const form = data as Form;
    setForm(form);
  }, [data]);

  useEffect(() => {
    renderForm(getKey(form));
  }, [form]);

  function onChange(event: any, name: string) {
    const value = event;
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
              secureTextEntry={secureTextEntry}
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
          const options = getKey(form[e].choices).map((e) => (
            <Picker.Item key={e} label={e} value={e} />
          ));
          element = (  
            <SafeAreaView style={styles.pickerContainer}> 
            <Picker
              key={e}
              selectedValue={form[e].value}
              onValueChange={(item) => onChange(item, e)}
              mode="dropdown"
              style={styles.picker}
            >
              {options}
            </Picker>
            </SafeAreaView>      
          );
          break;
      }
      return element;
    }) as React.JSX.Element[];
    setElements(elements);
  }

  function getKey(form: Form | object | undefined) {
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

  return (
    <SafeAreaView>
      {elements}
      <Button mode="contained-tonal" icon="account-plus" style={styles.buttonStyle} onPress={handleSubmit}>Register</Button>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  inputStyle: {
    margin: 3,
    minWidth: 300,
    maxWidth: 300,
    backgroundColor: "white"
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 25,
    top: 6,
    margin: 3,
  },

  buttonStyle: {
    minWidth: 300,
    maxWidth: 300,
    minHeight: 50,
    justifyContent: 'center',
    alignItems: 'center',
    top: 30,
    margin: 3,
    backgroundColor: '#ED3D63'
  },

  picker: {
    minHeight: 55,
    width: '100%', 
  },
});
export default Registration;
