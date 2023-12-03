import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Form from "components/AuthForm";
import {ReactElement} from "react";
import i18n from 'translations/i18n';

function Registration (props: { navigation: { navigate: (arg0: string) => void; }; }): ReactElement {
    const pressHandler = () => {
        props.navigation.navigate('Login')
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Form name={"registrationForm"} action={"registerUser"} prompt={i18n.t('auth.form.submit.register')} ico={"account-plus"}/>
                <TouchableOpacity style={styles.bottomLink}>
                    <Text onPress={pressHandler}>{i18n.t("auth.change_to_login")}</Text>
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

export default Registration;
