import React from "react";
import { Route, Router, Routes } from "react-router";
import HomePage from "../home/HomePage";
import SingleBook from "../individual/SingleBook";
import SignIn from "../auth/SignIn";
import Signup from "../auth/SignUp";
import Library from "../lib/Library";
import Upload from "../upload/Upload";
import AdminSignIn from "../auth/AdminSignin";
import Dashboard from "../admin/Dashboard";
import AdminBookUpdate from "../admin/AdminBookUpdate";

const AllRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/:bookid" element={<SingleBook />} />
			<Route path="/signin" element={<SignIn />} />
			<Route path="/signup" element={<Signup />} />
			<Route path="/library" element={<Library />} />
			<Route path="/upload" element={<Upload />} />
			<Route path="/adminlogin" element={<AdminSignIn />} />
			<Route path="/admindashboard" element={<Dashboard />} />
			<Route path="/admin/update/:id" element={<AdminBookUpdate />} />
		</Routes>
	);
};

export default AllRoutes;
