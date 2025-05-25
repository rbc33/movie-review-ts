import { Link } from "react-router-dom";
import { User } from "../App";

interface NavbarProps {
	user?: User;
	onClick?: () => void;
}

const Navbar = ({ user, onClick }: NavbarProps) => {
	return (
		<div className="h-15 flex  text-white p-3 bg-gray-800 w-full border-b-2">
			<div className="font-bold text-xl mx-4.5 self-end">Movie Reviews</div>
			<div className="flex justify-between self-end">
				<Link to="/movies" className="text-white hover:text-gray-300 mx-3">
					Movies
				</Link>
			</div>
			<div className="text-white hover:text-gray-300 cursor-pointer self-end">
				{user ? (
					<a onClick={onClick}>Logout User</a>
				) : (
					<Link to="/login">Login</Link>
				)}
			</div>
		</div>
	);
};

export default Navbar;
