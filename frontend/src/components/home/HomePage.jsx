import React, { useEffect, useState } from "react";
import HomeCard from "./HomeCard";
import axios from "axios";
import { API } from "../../util/API";
import { Box, SimpleGrid } from "@chakra-ui/react";

const HomePage = () => {
	const [books, setBooks] = useState([]);
	const getBooks = async () => {
		let data = await axios.get(`${API}/books`);
		setBooks(data.data.books);
	};
	useEffect(() => {
		getBooks();
	}, []);
	return (
		<div>
			<SimpleGrid columns={{ base: 2, sm: 2, md: 3, lg: 4, xl: 5 }}>
				{books.map((item) => (
					<Box key={item._id}>
						<HomeCard {...item} />
					</Box>
				))}
			</SimpleGrid>
		</div>
	);
};

export default HomePage;
