import React, { useEffect, useState } from "react";
import useApi from "../utils/useApi";
import { StyleSheet, TextInput, SafeAreaView, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";

const Registration = () => {
  const [data, Api] = useApi();
  const [form, setForm] = useState<Form>({});
  const [elements, setElements] = useState<React.JSX.Element[]>([]);
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
              style={styles.input}
              placeholder={e}
              onChange={(event) => onChange(event.nativeEvent.text, e)}
              value={form[e].value}
              secureTextEntry={password}
            />
          );
          break;
        case "choice":
          const options = getKey(form[e].choices).map((e) => (
            <Picker.Item key={e} label={e} value={e} />
          ));
          element = (
            <Picker
            key={e}
              selectedValue={form[e].value}
              onValueChange={(item) => onChange(item, e)}
              mode="dropdown"
            >
              {options}
            </Picker>
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
      <Button title={"Register"} onPress={handleSubmit}/>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 32,
    margin: 3,
    borderWidth: 1,
    minWidth: 200,
    padding: 12,
  },
});
export default Registration;
