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
		<div className="min-h-screen bg-gray-900 text-white p-6 flex items-center justify-center">
			<div className="bg-gray-800 rounded-lg p-8 shadow-lg max-w-md w-full">
				<h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">
					Iniciar Sesión
				</h2>
				<form onSubmit={(e) => e.preventDefault()} className="space-y-6">
					<div>
						<label className="block text-sm font-medium mb-2">Username</label>
						<input
							type="text"
							placeholder="Enter username"
							value={name}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setName(e.target.value)
							}
							className="w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium mb-2">ID</label>
						<input
							type="text"
							placeholder="Enter id"
							value={id}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setId(e.target.value)
							}
							className="w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
						/>
					</div>
					<div className="pt-2">
						<button
							type="submit"
							onClick={login}
							className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-4 rounded-md transition-colors"
						>
							Iniciar Sesión
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
