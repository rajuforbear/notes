import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginPage from "./LoginPage";
import Register from "./Registration";
import ShowDeails from "./ShowDeails";
   const Stack=createStackNavigator()
const MyNavigation=()=>{
    return(
        <NavigationContainer>
           <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='login'>
            <Stack.Screen name='login' component={LoginPage}/>
            <Stack.Screen name='Register' component={Register}/>
            <Stack.Screen name='show' component={ShowDeails}/>
           </Stack.Navigator>
        </NavigationContainer>
    )
}
export default MyNavigation