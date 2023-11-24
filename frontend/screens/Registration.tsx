import { SafeAreaView } from "react-native";
import Form from "../components/Form";
const Registration = () => {
  return (
    <SafeAreaView>
      <Form name={"registrationForm"} action={"registerUser"} prompt={"register"} ico={"account-plus"}/>
    </SafeAreaView>
  );
};
export default Registration;
