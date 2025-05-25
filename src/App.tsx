import { useState } from "react";
import NavBar from "./components/navbar";
import { Routes, Route, Link, useActionData } from "react-router-dom";
import AddReview from "./components/add-review";
import MoviesList from "./components/movies-list";
import Movie from "./components/movie";
import Login from "./components/login";

export interface User {
	name: string;
	id: string;
}
function App() {
	const [user, setUser] = useState<User | undefined>(undefined);
	async function login(user?: User) {
		setUser(user);
	}
	async function logout() {
		setUser(undefined);
	}
	return (
		<div className="w-screen h-screen flex bg-gray-800 ">
			<NavBar user={user} onClick={logout} />
			<Routes>
				<Route path="/" element={<MoviesList />} />
				<Route path="/movies" element={<MoviesList />} />

				<Route
					path="/movies/:id/review"
					element={<AddReview user={user} />}
				></Route>

				<Route path="/movies/:id/" element={<Movie user={user} />}></Route>

				<Route
					path="/login"
					element={<Login login={(user?: User) => login(user)} />}
				></Route>
			</Routes>
		</div>
	);
}

export default App;
