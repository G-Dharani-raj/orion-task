import {
	Button,
	ButtonGroup,
	Card,
	CardBody,
	CardFooter,
	Divider,
	Heading,
	Image,
	Stack,
	Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { API } from "../../util/API";
import { AuthContext } from "../context/AuthContext";

const AdminCard = ({ cover, name, author, _id, getBooks }) => {
	const navigate = useNavigate();
	const { token } = useContext(AuthContext);
	const handleClick = (id) => {
		navigate(`/admin/${id}`);
	};
	const handleUpdate = () => {
		localStorage.setItem(
			"book",
			JSON.stringify({ cover, name, author, _id })
		);
		navigate(`/admin/update/${_id}`);
	};
	const handleDelete = async () => {
		try {
			await axios.delete(`${API}/admin/books/${_id}`, {
				headers: { Authorization: token },
			});
			getBooks();
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div>
			<Card w={"100%"} onClick={() => handleClick(_id)}>
				<CardBody>
					<Image
						src={cover}
						alt={name}
						borderRadius="lg"
						w={"100%"}
					/>
					<Stack mt="6" spacing="3">
						<Heading size="md">{name}</Heading>
						<Text>{author}</Text>
					</Stack>
				</CardBody>
				<Divider />
				<CardFooter>
					<ButtonGroup>
						{/* <Button onClick={() => handleClick(_id)}>
							Learn More
						</Button> */}
						<Button onClick={handleUpdate}>Update</Button>
						<Button onClick={handleDelete}>Delete</Button>
					</ButtonGroup>
				</CardFooter>
			</Card>
		</div>
	);
};

export default AdminCard;
