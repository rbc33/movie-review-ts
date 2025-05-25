import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../App";

interface LoginProps {
	login: (user?: User) => void;
}

const Login = (props: LoginProps) => {
	const [name, setName] = useState("");
	const [id, setId] = useState("");
	const navigate = useNavigate();

	const login = () => {
		const user: User = { name, id };
		props.login(user);
		navigate("/");
	};

	return (
		<div>
			<form onSubmit={(e) => e.preventDefault()}>
				<label>Username</label>
				<input
					type="text"
					placeholder="Enter username"
					value={name}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setName(e.target.value)
					}
				/>

				<label>ID</label>
				<input
					type="text"
					placeholder="Enter id"
					value={id}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setId(e.target.value)
					}
				/>
				<button type="submit" onClick={login}>
					Submit
				</button>
			</form>
		</div>
	);
};

export default Login;
