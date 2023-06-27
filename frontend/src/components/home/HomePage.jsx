import React, { useEffect, useState } from "react";
import HomeCard from "./HomeCard";
import axios from "axios";
import { API } from "../../util/API";

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
			HomePage
			{books.map((item) => (
				<HomeCard key={item._id} {...item} />
			))}
		</div>
	);
};

export default HomePage;
