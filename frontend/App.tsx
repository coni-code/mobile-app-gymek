import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import StartUp from "./src/screens/StartUp"
import { PaperProvider, MD3LightTheme as DefaultTheme } from 'react-native-paper';
import AuthStack from "./src/navigation/AuthStack";
import { NavigationContainer } from "@react-navigation/native";

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        registrationButton: '#ED3D63',
    },
};

export default function App() {
    const [startup, setStartUp] = useState(false)
    const [logged, setLogged] = useState(false)

    function setDone(success:boolean){
        setStartUp(success)
    }

    if(!startup) {
        return(
            <View style={styles.container}>
                <View style={styles.container}>
                    <StartUp setdone={setDone}></StartUp>
                </View>
            </View>
        );
    }

    return (
        <NavigationContainer>
            <PaperProvider theme={theme}>
                <View style={styles.container}>
                    {logged ? <></> : <AuthStack />}
                </View>
            </PaperProvider>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
});
