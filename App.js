import Navigation from "./src/navigation/navigation";
import React from "react";
import {Provider} from "react-redux";
import {store} from "./store";
import 'react-native-url-polyfill/auto';

const App = () => {
	return (
		<Provider store={store}><Navigation/></Provider>
	);
};

export default App;
