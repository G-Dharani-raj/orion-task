import React, { useState } from "react";

export const AuthContext = React.createContext();

const AuthContextProvider = ({ children }) => {
	const [isAuth, setAuth] = React.useState(false);
	const [token, setToken] = React.useState(null);
	const [id, setId] = useState("");
	const [isAdmin, setIsAdmin] = useState(false);
	const logoutFN = () => {
		setAuth(false);
		setToken(null);
	};
	return (
		<AuthContext.Provider
			value={{
				isAuth,
				token,
				logoutFN,
				setToken,
				setAuth,
				id,
				setId,
				isAdmin,
				setIsAdmin,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
