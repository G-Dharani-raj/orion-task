import React from "react";
import { Route, Router, Routes } from "react-router";
import HomePage from "../home/HomePage";
import SingleBook from "../individual/SingleBook";
import SignIn from "../auth/SignIn";
import Signup from "../auth/SignUp";
import Library from "../lib/Library";

const AllRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/:bookid" element={<SingleBook />} />
			<Route path="/signin" element={<SignIn />} />
			<Route path="/signup" element={<Signup />} />
			<Route path="/library" element={<Library />} />
		</Routes>
	);
};

export default AllRoutes;
