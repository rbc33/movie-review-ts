import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../App";

interface LoginProps {
	login: (user?: User) => void;
}

const Login = ({ login }: LoginProps) => {
	const [name, setName] = useState("");
	const [id, setId] = useState("");
	const navigate = useNavigate();

	const logIn = () => {
		login({ name: name, id: id });

		navigate("/");
	};

	const onChangeName = (e) => {
		const name = e.target.value;
		setName(name);
	};

	const onChangeId = (e) => {
		const id = e.target.value;
		setId(id);
	};

	return (
		<div>
			<form>
				<label>Username</label>
				<input
					type="text"
					placeholder="Enter username"
					value={name}
					onChange={onChangeName}
				/>

				<label>ID</label>
				<input
					type="text"
					placeholder="Enter id"
					value={id}
					onChange={onChangeId}
				/>
				<button onClick={logIn}>Submit</button>
			</form>
		</div>
	);
};

export default Login;
