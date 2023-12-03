import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import AuthForm from "components/AuthForm";
import {ReactElement} from "react";
import i18n from 'translations/i18n';

function Login (props: { navigation: { navigate: (arg0: string) => void; }; }): ReactElement {
    const pressHandler = () => {
        props.navigation.navigate('Registration')
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <AuthForm onlyRequired name={"loginForm"} action={"loginUser"} prompt={i18n.t('auth.form.submit.login')} ico={"arrow-right"}/>
                <TouchableOpacity style={styles.bottomLink}>
                    <Text onPress={pressHandler}>{i18n.t("auth.change_to_register")}</Text>
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
