import axios from "axios";
import React, { useEffect } from "react";
import { API } from "../../util/API";
import { Heading, Text, VStack } from "@chakra-ui/react";

const ReviewComp = ({ user, review }) => {
	return (
		<div>
			<VStack>
				<Heading size={"sm"}>{user}</Heading>
				<Text>{review}</Text>
			</VStack>
		</div>
	);
};

export default ReviewComp;
