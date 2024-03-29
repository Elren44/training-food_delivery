import React, {useMemo, useState} from 'react'
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native'
import {useNavigation} from "@react-navigation/native";
import {themeColors} from "../../theme";
import * as Icon from "react-native-feather";
import {useDispatch, useSelector} from "react-redux";
import {selectRestaurant} from "../../slices/restaurantSlice";
import {removeFromCart, selectCartItems, selectCartTotal} from "../../slices/cartSlice";
import {urlFor} from "../../../sanity";

const CartScreen = () => {
	const restaurant = useSelector(selectRestaurant)
	const cartItems = useSelector(selectCartItems)
	const cartTotal = useSelector(selectCartTotal)
	const navigation = useNavigation()
	const dispatch = useDispatch()
	const deliveryFee = 2;

	const [groupedItems, setGroupedItems] = useState({})

	useMemo(() => {
		const gItems = cartItems.reduce((group, item) => {
			if (group[item._id]) {
				group[item._id].push(item);
			} else {
				group[item._id] = [item];
			}
			return group;
		}, {})
		setGroupedItems(gItems);
		// console.log('items: ',gItems);

	}, [cartItems])


	return (
		<View className="bg-white flex-1 mt-10">
			<View className="relative py-4 shadow-sm">
				<TouchableOpacity style={{backgroundColor: themeColors.bgColor(1)}}
				                  className="absolute z-10  rounded-full p-1 shadow top-5 left-2"
				                  onPress={() => navigation.goBack()}>
					<Icon.ArrowLeft strokeWidth={3} stroke="white"/>
				</TouchableOpacity>
				<View classsName="">
					<Text className="text-center font-bold text-xl">Your cart</Text>
					<Text className="text-center text-gray-500">{restaurant.name}</Text>
				</View>
			</View>

			{/* delivery time */}
			<View style={{backgroundColor: themeColors.bgColor(0.2)}} className="flex-row px-4 items-center">
				<Image source={require('../../../assets/images/bikeGuy.png')} className="w-20 h-20 rounded-full"/>
				<Text className="flex-1 pl-4">Deliver in 20-30 minutes</Text>
				<TouchableOpacity>
					<Text style={{color: themeColors.text}} className="font-bold">Change</Text>
				</TouchableOpacity>
			</View>

			{/* dishes */}
			<ScrollView
				showsVerticalScrollIndicator={false}
				className="bg-white pt-5"
				contentContainerStyle={{
					paddingBottom: 50
				}}

			>
				{
					Object.entries(groupedItems).map(([key, items]) => {
						let dish = items[0]
						return (
							<View key={key}
							      className="flex-row items-center space-x-3 py-2 px-4 bg-white rounded-3xl mx-2 mb-3 shadow-md">
								<Text style={{color: themeColors.text}} className="font-bold">{dish.length} x </Text>
								<Image className="h-14 w-14 rounded-full" source={{uri: urlFor(dish.image).url()}}/>
								<Text className="flex-1 font-bold text-gray-700">{dish.name}</Text>
								<Text className="font-semibold text-base">${dish.price}</Text>
								<TouchableOpacity
									className="p-1 rounded-full"
									style={{backgroundColor: themeColors.bgColor(1)}}
									onPress={() => dispatch(removeFromCart({id: dish.id}))}>
									<Icon.Minus strokeWidth={2} height={20} width={20} stroke="white"/>
								</TouchableOpacity>
							</View>
						)
					})
				}
			</ScrollView>
			{/* totals */}
			<View style={{backgroundColor: themeColors.bgColor(0.2)}} className=" p-6 px-8 rounded-t-3xl space-y-4">
				<View className="flex-row justify-between">
					<Text className="text-gray-700">Subtotal</Text>
					<Text className="text-gray-700">${cartTotal}</Text>
				</View>
				<View className="flex-row justify-between">
					<Text className="text-gray-700">Delivery Fee</Text>
					<Text className="text-gray-700">${deliveryFee}</Text>
				</View>
				<View className="flex-row justify-between">
					<Text className="font-extrabold">Order Total</Text>
					<Text className="font-extrabold">${deliveryFee + cartTotal}</Text>
				</View>
				<View>
					<TouchableOpacity
						style={{backgroundColor: themeColors.bgColor(1)}}
						onPress={() => navigation.navigate('PreparingOrder')}
						className="p-3 rounded-full">
						<Text className="text-white text-center font-bold text-lg">Place Order</Text>
					</TouchableOpacity>
				</View>
			</View>

		</View>

	);
}

export default CartScreen;
