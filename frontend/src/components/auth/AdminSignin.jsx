import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	Checkbox,
	Stack,
	Link,
	Button,
	Heading,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { API } from "../../util/API";
import { useNavigate } from "react-router";

export default function AdminSignIn() {
	const [mail, setMail] = useState("");
	const [password, setPassword] = useState("");
	const { token, setToken, setAuth, setId, setIsAdmin, isAdmin } =
		useContext(AuthContext);
	const navigate = useNavigate();
	const handleSignin = async () => {
		try {
			let data = await axios.post(`${API}/user/login`, {
				email: mail,
				password,
			});
			console.log(data);
			setToken(data.data.token);
			setAuth(true);
			setId(data.data.id);
			setIsAdmin(data.data.admin);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		if (isAdmin) navigate("/admindashboard");
	}, [isAdmin]);
	return (
		<Flex
			minH={"100vh"}
			align={"center"}
			justify={"center"}
			bg={useColorModeValue("gray.50", "gray.800")}
		>
			<Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
				<Stack align={"center"}>
					<Heading fontSize={"4xl"}>Sign in to your account</Heading>
					<Text fontSize={"lg"} color={"gray.600"}>
						to enjoy all of our cool{" "}
						<Link color={"blue.400"}>features</Link> ✌️
					</Text>
				</Stack>
				<Box
					rounded={"lg"}
					bg={useColorModeValue("white", "gray.700")}
					boxShadow={"lg"}
					p={8}
				>
					<Stack spacing={4}>
						<FormControl id="email">
							<FormLabel>Email address</FormLabel>
							<Input
								type="email"
								value={mail}
								onChange={(e) => setMail(e.target.value)}
							/>
						</FormControl>
						<FormControl id="password">
							<FormLabel>Password</FormLabel>
							<Input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</FormControl>
						<Stack spacing={10}>
							<Button
								bg={"blue.400"}
								color={"white"}
								_hover={{
									bg: "blue.500",
								}}
								onClick={handleSignin}
							>
								Sign in
							</Button>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
}
