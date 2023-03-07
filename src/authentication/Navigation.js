import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Add from "../Add";
import ShowData from "../showData";
import UpdateData from "../Update";
import LoginPage from "./LoginPage";
import Register from "./Registration";
import ShowDeails from "./ShowDeails";
const Stack = createStackNavigator()
const MyNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='login'>
                <Stack.Screen name='login' component={LoginPage} />
                <Stack.Screen name='Register' component={Register} />
                <Stack.Screen name='show' component={ShowDeails} />
                <Stack.Screen name='Add' component={Add} />
                <Stack.Screen name='getData' component={ShowData} />
                <Stack.Screen name='updateData' component={UpdateData} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default MyNavigation