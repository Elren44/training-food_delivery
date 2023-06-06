import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import React from "react";
import RestaurantScreen from "../screens/RestaurantScreen/RestaurantScreen";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import CartScreen from "../screens/CartScreen/CartScreen";
import PreparingOrderScreen from "../screens/PreparingOrderScreen/PreparingOrderScreen";
import DeliveryScreen from "../screens/DeliveryScreen/DeliveryScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{headerShown: false}}>
				<Stack.Screen name="Home" component={HomeScreen}/>
				<Stack.Screen name="Restaurant" component={RestaurantScreen}/>
				<Stack.Screen name="Cart" options={{presentation: 'modal', headerShown: false}} component={CartScreen}/>
				<Stack.Screen name="PreparingOrder" options={{presentation: 'fullScreenModal', headerShown: false}}
				              component={PreparingOrderScreen}/>
				<Stack.Screen name="Delivery" options={{presentation: 'fullScreenModal', headerShown: false}}
				              component={DeliveryScreen}/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default Navigation;
