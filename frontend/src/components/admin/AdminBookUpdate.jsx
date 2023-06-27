import React, { useState } from "react";

const AdminBookUpdate = () => {
	const { name, author, cover, _id } = JSON.parse(
		localStorage.getItem("book")
	);
	const [new_name, setName] = useState(name);
	const [new_author, setAuthor] = useState(author);
	const [new_cover, setCover] = useState(cover);

	return (
		<div>
			<form>
				<label htmlFor="name">Name</label>
				<input
					type="text"
					name="name"
					value={new_name}
					onChange={(e) => setName(e.target.value)}
				/>
			</form>
		</div>
	);
};

export default AdminBookUpdate;
