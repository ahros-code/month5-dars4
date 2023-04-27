import axios from 'axios';
import { useEffect, useState } from 'react';

const FetchData = () => {
	const [data, setData] = useState([]);
	const getData = async () => {
		try {
			let res = await axios.get('https://restcountries.com/v3.1/all');
			setData(res);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getData();
	}, []);

	return (
		<div>
			{data.map((element, index) => (
				<li key={index}>{element.name}</li>
			))}
		</div>
	);
};

export default FetchData;
