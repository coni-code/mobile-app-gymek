import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Form from "../components/Form";
import {ReactElement} from "react";

function Login (props: { navigation: { navigate: (arg0: string) => void; }; }): ReactElement {
    const pressHandler = () => {
        props.navigation.navigate('Registration')
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Form name={"loginForm"} action={"loginUser"} prompt={"Login"} ico={"arrow-right"}/>
                <TouchableOpacity style={styles.bottomLink}>
                    <Text onPress={pressHandler}>I do not have an account</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    bottomLink: {
        marginTop: 50
    }
})

export default Login;
