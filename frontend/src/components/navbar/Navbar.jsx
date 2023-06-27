import {
	Box,
	Flex,
	Avatar,
	HStack,
	Link,
	IconButton,
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuDivider,
	useDisclosure,
	useColorModeValue,
	Stack,
	Heading,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { Link as RLink } from "react-router-dom";

const Links = [
	{ name: "Home", to: "/" },
	{ name: "Library", to: "/library" },
	{ name: "Upload a Book", to: "/upload" },
];

const NavLink = ({ name, to }) => (
	<Link
		px={2}
		py={1}
		rounded={"md"}
		_hover={{
			textDecoration: "none",
			bg: useColorModeValue("gray.200", "gray.700"),
		}}
		as={RLink}
		to={to}
	>
		{name}
	</Link>
);

export default function Navbar() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { token, logoutFN } = useContext(AuthContext);
	const navigate = useNavigate();

	return (
		<>
			<Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
				<Flex
					h={16}
					alignItems={"center"}
					justifyContent={"space-between"}
				>
					<IconButton
						size={"md"}
						icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
						aria-label={"Open Menu"}
						display={{ md: "none" }}
						onClick={isOpen ? onClose : onOpen}
					/>
					<HStack spacing={8} alignItems={"center"}>
						<Box>
							<Heading size={16}>BookReview Club</Heading>
						</Box>
						<HStack
							as={"nav"}
							spacing={4}
							display={{ base: "none", md: "flex" }}
						>
							{Links.map((link) => (
								<NavLink key={link.name} {...link} />
							))}
						</HStack>
					</HStack>
					<Flex alignItems={"center"}>
						<Menu>
							<MenuButton
								as={Button}
								rounded={"full"}
								variant={"link"}
								cursor={"pointer"}
								minW={0}
							>
								<Avatar src="https://bit.ly/broken-link" />
							</MenuButton>
							<MenuList>
								<MenuItem
									onClick={
										token
											? logoutFN
											: () => navigate("/signin")
									}
								>
									{token ? "Logout" : "Sign In"}
								</MenuItem>
								<MenuItem
									onClick={
										token ? null : () => navigate("/signup")
									}
								>
									{token ? "" : "Register"}
								</MenuItem>
							</MenuList>
						</Menu>
					</Flex>
				</Flex>

				{isOpen ? (
					<Box pb={4} display={{ md: "none" }}>
						<Stack as={"nav"} spacing={4}>
							{Links.map((link) => (
								<NavLink key={link.name} {...link} />
							))}
						</Stack>
					</Box>
				) : null}
			</Box>
		</>
	);
}
