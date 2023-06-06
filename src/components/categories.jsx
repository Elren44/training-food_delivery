import React, {useEffect, useState} from "react";
import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {getCategories} from "../../api";
import {urlFor} from "../../sanity";

const Categories = () => {
	const [activeCategory, setActiveCategory] = useState(null);
	const [categories, setCategories] = useState([])

	useEffect(() => {
		getCategories().then(data => {
			setCategories(data)
		})
	}, []);
	return (
		<View className="mx-4">
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				className="overflow-visible"
				contentContainerStyle={{
					paddingHorizontal: 15,
				}}
			>
				{categories.map((category) => {
					let isActive = category._id === activeCategory
					let btnClass = isActive ? ' bg-gray-600' : 'bg-gray-200'
					let textClass = isActive ? ' font-semibold text-gray-800' : ' text-gray-500'
					return (
						<View
							key={category._id}
							className="flex justify-center items-center mr-6"
						>
							<TouchableOpacity onPress={() => setActiveCategory(category._id)}
							                  className={"p-1 rounded-full shadow bg-gray-200 " + btnClass}>
								<Image
									style={{width: 45, height: 45, marginRight: -2}}
									source={{uri: urlFor(category.image).url()}}
								/>

							</TouchableOpacity>
							<Text className={"text-sm" + textClass}>{category.name}</Text>
						</View>)
				})}
			</ScrollView>
		</View>
	);
};

export default Categories;
