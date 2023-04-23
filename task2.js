// Retrieves user, product and shopping cart data
export const fetchData = async (URL) => {
	try {
		const response = await fetch(URL);
		if (!response.ok) {
			throw new Error("Response is not ok");
		}
		const jsonData = await response.json();
		return jsonData;
	} catch (err) {
		console.log(err.message);
	}
};

export function distance(lat1, long1, lat2, long2) {
	// Check if two points are not in the same place
	if (lat1 === lat2 && long1 === long2) {
		return 0;
	}
	const radlat1 = (Math.PI * lat1) / 180;
	const radlat2 = (Math.PI * lat2) / 180;
	const theta = long1 - long2;
	const radtheta = (Math.PI * theta) / 180;
	let dist =
		Math.sin(radlat1) * Math.sin(radlat2) +
		Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist);
	dist = (dist * 180) / Math.PI;
	dist = dist * 60 * 1.1515;
	return dist * 1.609344;
}

export const productCategories = (productsData) => {
	const productAndValues = new Map();
	for (const object of productsData) {
		// If property already exists
		if (productAndValues.has(object.category)) {
			const updatedValue = productAndValues.get(object.category);
			const totalValue = updatedValue + object.price;
			productAndValues.set(object.category, parseFloat(totalValue.toFixed(2)));
		} else {
			productAndValues.set(
				object.category,
				parseFloat(object.price.toFixed(2))
			);
		}
	}
	return productAndValues;
};

export const highestValueCard = (productsData, userData, cartsData) => {
	let maxValue = 0;
	let userId;
	for (const cart of cartsData) {
		let tempValue = 0;
		for (const product of cart.products) {
			tempValue += productsData[product.productId - 1].price * product.quantity;
		}

		if (tempValue > maxValue) {
			maxValue = tempValue;
			userId = cart.userId;
		}
	}

	// Get the fullName of the owner
	let fullName;
	for (const user of userData) {
		if (user.id === userId) {
			fullName = "".concat(user.name.firstname, " ", user.name.lastname);
		}
	}
	return `Highest value cart: ${maxValue} owned by ${fullName}`;
};

export const findFarthestUsers = () => {
	// Finds the two users living furthest away from each other
	let maxDistance = 0;
	let firstUser;
	let secondUser;
	for (let i = 0; i < userData.length - 1; i++) {
		const user1 = userData[i];
		for (let j = i + 1; j < userData.length; j++) {
			const user2 = userData[j];
			const currentDistance = distance(
				user1.address.geolocation.lat,
				user1.address.geolocation.long,
				user2.address.geolocation.lat,
				user2.address.geolocation.long
			);
			if (currentDistance > maxDistance) {
				maxDistance = currentDistance;
				firstUser = "".concat(user1.name.firstname, " ", user1.name.lastname);
				secondUser = "".concat(user2.name.firstname, " ", user2.name.lastname);
			}
		}
	}
	maxDistance = parseFloat(maxDistance.toFixed(2));
	return `Farthest users: ${firstUser} and ${secondUser} with distance of ${maxDistance} km`;
};
