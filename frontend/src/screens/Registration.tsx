import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Form from "../components/Form";
import {ReactElement} from "react";

function Registration (props: { navigation: { navigate: (arg0: string) => void; }; }): ReactElement {
    const pressHandler = () => {
        props.navigation.navigate('Login')
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Form name={"registrationForm"} action={"registerUser"} prompt={"register"} ico={"account-plus"}/>
                <TouchableOpacity style={styles.bottomLink}>
                    <Text onPress={pressHandler}>I already have an account</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

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

export default Registration;
