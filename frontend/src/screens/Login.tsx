import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Form from "../components/Form";
import {ReactElement} from "react";
import i18n from '../translations/i18n';

function Login (props: { navigation: { navigate: (arg0: string) => void; }; }): ReactElement {
    const pressHandler = () => {
        props.navigation.navigate('Registration')
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Form name={"loginForm"} action={"loginUser"} prompt={i18n.t('login.form.submit')} ico={"arrow-right"}/>
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
