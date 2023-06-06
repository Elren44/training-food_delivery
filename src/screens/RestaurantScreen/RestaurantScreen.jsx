import React, {useEffect, useLayoutEffect} from "react";
import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import * as Icon from "react-native-feather";
import {themeColors} from "../../theme";
import DishRow from "../../components/DishRow";
import CartIcon from "../../components/CartIcon";
import {StatusBar} from "expo-status-bar";
import {useDispatch, useSelector} from "react-redux";
import {setRestaurant} from "../../slices/restaurantSlice";
import {urlFor} from "../../../sanity";
import {emptyCart} from "../../slices/cartSlice";

const RestaurantScreen = () => {
	const navigation = useNavigation()
	const dispatch = useDispatch()
	const restaurant = useSelector(setRestaurant);
	const {
		params: {
			id,
			title,
			imgUrl,
			rating,
			type,
			address,
			description,
			dishes,
			lng,
			lat
		}
	} = useRoute();
	useLayoutEffect(() => {
		navigation.setOptions({headerShown: false})
	}, [])
	useEffect(() => {
		if (restaurant && restaurant._id != id) {
			dispatch(emptyCart());
		}
		dispatch(setRestaurant({
			id,
			title,
			imgUrl,
			rating,
			type,
			address,
			description,
			dishes,
			lng,
			lat
		}))
	}, [])


	return (
		<View>
			<CartIcon/>
			<StatusBar style={"light"}/>
			<ScrollView>
				<View className="relative">
					<Image className="w-full h-72" source={{uri: urlFor(imgUrl).url()}}/>
					<TouchableOpacity className="absolute top-14 left-4 bg-gray-50 p-2 rounded-full shadow"
					                  onPress={() => navigation.goBack()}>
						<Icon.ArrowLeft strokeWidth={3} stroke={themeColors.bgColor(1)}/>
					</TouchableOpacity>
				</View>
				<View className="bg-white -mt-12 pt-6" style={{
					borderTopLeftRadius: 40, borderTopRightRadius: 40
				}}>
					<View className="px-5">
						<Text className="text-3xl font-bold">{title}</Text>
						<View className="flex-row space-x-2 my-1">
							<Image source={require('../../../assets/images/fullStar.png')} className="h-4 w-4"/>
							<Text className="text-xs">
								<Text className="text-green-700">{rating}</Text>
								<Text className="text-gray-700"> (4.6k review)</Text> · <Text
								className="font-semibold text-gray-700">{type}</Text>
							</Text>
							<View className="flex-row items-center space-x-1">
								<Icon.MapPin color="gray" width={15} height={15}/>
								<Text className="text-gray-700 text-xs">Nearby • {address}</Text>
							</View>
						</View>
						<Text className="text-gray-500 mt-2">{description}</Text>
					</View>
				</View>

				<View className="pb-36 bg-white">
					<Text className="px-4 py-4 text-2xl font-bold">Menu</Text>

					{/*dishes*/}
					{
						dishes.map((dish) => {
							return (
								<DishRow item={{...dish}} key={dish._id}/>
							)
						})
					}
				</View>
			</ScrollView>
		</View>
	)
		;
};

export default RestaurantScreen;
