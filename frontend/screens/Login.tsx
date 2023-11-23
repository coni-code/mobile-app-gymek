import { SafeAreaView } from "react-native";
import Form from "../components/Form";
const Login = () => {
  return (
    <SafeAreaView>
      <Form name={"loginForm"} action={"loginUser"} prompt={"Login"} ico={"arrow-right"}/>
    </SafeAreaView>
  );
};
export default Login;
