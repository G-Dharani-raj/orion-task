import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { API } from "../../util/API";
import HomeCard from "../home/HomeCard";
import { Text } from "@chakra-ui/react";

const Library = () => {
	const { token, id } = useContext(AuthContext);
	const [lib, setLib] = useState([]);
	const getData = async () => {
		try {
			let data = await axios.get(`${API}/user/${id}`);
			setLib([...data.data.library]);
			// console.log(data);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getData();
	}, []);
	return (
		<div>
			{lib.length > 0 ? (
				lib.map((item) => <HomeCard key={item._id} {...item} />)
			) : (
				<Text>No items added to the library</Text>
			)}
		</div>
	);
};

export default Library;
