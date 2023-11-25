import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import Registration from '../screens/Registration';

const screens = {
    Login: {
        screen: Login,
    },
    Registration: {
        screen: Registration,
    },
};

const AuthStack = createStackNavigator();

const AuthNavigator = () => {
    return (
        <AuthStack.Navigator>
            {Object.entries(screens).map(([name, component]) => (
                <AuthStack.Screen
                    key={name}
                    name={name}
                    component={component.screen}
                />
            ))}
        </AuthStack.Navigator>
    );
};

export default AuthNavigator;
