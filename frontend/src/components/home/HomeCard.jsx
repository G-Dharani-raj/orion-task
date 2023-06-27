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
import React from "react";
import { useNavigate } from "react-router";

const HomeCard = ({ cover, name, author, _id }) => {
	const navigate = useNavigate();
	const handleClick = (id) => {
		navigate(`/${id}`);
	};
	return (
		<div>
			<Card maxW="sm">
				<CardBody>
					<Image src={cover} alt={name} borderRadius="lg" />
					<Stack mt="6" spacing="3">
						<Heading size="md">{name}</Heading>
						<Text>{author}</Text>
					</Stack>
				</CardBody>
				<Divider />
				<CardFooter>
					<Button onClick={() => handleClick(_id)}>Learn More</Button>
				</CardFooter>
			</Card>
		</div>
	);
};

export default HomeCard;
