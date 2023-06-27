import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { API } from "../../util/API";
import { Box, SimpleGrid } from "@chakra-ui/react";
import AdminCard from "./AdminCard";

const Dashboard = () => {
	const { token, isAdmin } = useContext(AuthContext);
	const [books, setBooks] = useState([]);
	const getBooks = async () => {
		try {
			let data = await axios.get(`${API}/admin/books`, {
				headers: { Authorization: token },
			});
			setBooks(data.data.books);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getBooks();
	}, []);
	return (
		<div>
			<SimpleGrid columns={{ base: 2, sm: 2, md: 3, lg: 4 }} gap={10}>
				{books.map((item) => (
					<Box key={item._id} w={"100%"}>
						<AdminCard {...item} getBooks={getBooks} />
					</Box>
				))}
			</SimpleGrid>
		</div>
	);
};

export default Dashboard;
