import React, { useContext, useState } from "react";
import FormData from "form-data";

import { AuthContext } from "../context/AuthContext";
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { API } from "../../util/API";

const Upload = () => {
	const { token, id } = useContext(AuthContext);
	const [name, setName] = useState("");
	const [author, setAuthor] = useState("");
	const [file, setFile] = useState("");
	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: token,
		},
	};
	const handleUpload = async (e) => {
		e.preventDefault();
		console.log(file);
		const data = {
			author,
			name,
			cover: file,
		};
		try {
			let res = await axios.post(`${API}/books/add`, data, config);
			console.log(res);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div>
			<form onSubmit={handleUpload}>
				<FormControl id="name" isRequired>
					<FormLabel>Name</FormLabel>
					<Input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</FormControl>
				<FormControl id="author" isRequired>
					<FormLabel>Author</FormLabel>
					<Input
						type="text"
						value={author}
						onChange={(e) => setAuthor(e.target.value)}
					/>
				</FormControl>
				<FormControl id="cover">
					<FormLabel>Cover Image</FormLabel>
					<Input
						type="text"
						value={file}
						onChange={(e) => setFile(e.target.value)}
					/>
				</FormControl>
				<Button type="submit">Submit</Button>
			</form>
		</div>
	);
};

export default Upload;
