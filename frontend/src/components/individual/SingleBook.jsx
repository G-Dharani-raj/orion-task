import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { API } from "../../util/API";
import {
	Box,
	Flex,
	HStack,
	Heading,
	Image,
	Text,
	VStack,
} from "@chakra-ui/react";
import ReactStars from "react-stars";
import { AuthContext } from "../context/AuthContext";
import ReviewComp from "./ReviewComp";

const SingleBook = () => {
	const { bookid } = useParams();
	const [details, setDetails] = useState({});
	const [bookRating, setRating] = useState({});
	const [bookReviews, setReviews] = useState([]);
	const [userRating, setUserRating] = useState(false);
	const { token } = useContext(AuthContext);
	const getBook = async () => {
		let data = await axios.get(`${API}/books/${bookid}`);
		setDetails({ ...data.data.book });
		let rat_det = await axios.get(`${API}/getrating/${bookid}`);
		setRating({ ...rat_det.data });
		try {
			let rev_det = await axios.get(`${API}/reviews/book/${bookid}`);
			setReviews([...rev_det.data]);
			// console.log(rev_det);
		} catch (error) {
			console.log("no reviews");
		}
	};
	const getUserRating = async () => {
		if (token) {
			console.log(token);
			let user_rating = await axios.get(
				`${API}/rating/userrating/${bookid}`,
				{
					headers: { Authorization: token },
				}
			);
			console.log(user_rating);
		} else {
			setUserRating(false);
		}
	};
	useEffect(() => {
		getBook();
		getUserRating();
	}, []);
	return (
		<div>
			<Box>
				<Flex>
					<Image src={details.cover} alt={details.name} />
					<VStack>
						<Heading>{details.name}</Heading>
						<Text>{details.author}</Text>
						<HStack>
							<ReactStars
								count={5}
								size={24}
								value={bookRating.rating}
								color2={"#ffd700"}
							/>
							<Text>({bookRating.count})</Text>
						</HStack>
						{userRating ? (
							<Text>your rating displayed here</Text>
						) : (
							<Text>You have not reviewed this book.</Text>
						)}
					</VStack>
				</Flex>
				<VStack>
					{bookReviews.map((item) => (
						<ReviewComp key={item.user} {...item} />
					))}
				</VStack>
			</Box>
		</div>
	);
};

export default SingleBook;
