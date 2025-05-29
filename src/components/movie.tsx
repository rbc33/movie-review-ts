import moment from "moment";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { User } from "../App";
import MovieDataService from "../services/movies";

interface MovieProps {
	user?: User;
}

const Movie = ({ user }: MovieProps) => {
	const [movie, setMovie] = useState({
		id: null,
		title: "",
		rated: "",
		poster: "",
		plot: "",
		reviews: [
			{
				name: "",
				date: "",
				review: "",
				user_id: "",
				_id: "",
			},
		],
	});
	const { id } = useParams();

	const getMovie = (id: string) => {
		MovieDataService.get(id)

			.then((response) => {
				setMovie(response.data);

				console.log(response.data);
			})

			.catch((e: Error) => {
				console.log(e);
			});
	};

	useEffect(() => {
		// getMovie(props.match.params.id);
		getMovie(id!);
		// }, [props.match.params.id]);
	}, [id]);

	const deleteReview = (reviewId: string, index: number) => {
		MovieDataService.deleteReview(reviewId, user!.id)

			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			.then((_response) => {
				setMovie((currState) => {
					currState.reviews.splice(index, 1);

					return {
						...currState,
					};
				});
			})

			.catch((e: Error) => {
				console.log(e);
			});
	};

	return (
		<div className="min-h-screen bg-gray-900 text-white p-6">
			<div className="container mx-auto">
				<div className="bg-gray-800 rounded-s overflow-hidden shadow-lg mb-8">
					<div className="flex flex-col md:flex-row">
						<div className="md:w-1/3">
							<img
								src={movie!.poster + "/100px250"}
								alt={movie!.title}
								className="w-full h-auto object-cover"
							/>
						</div>
						<div className="p-6 flex-col md:w-2/3">
							<h1 className="text-2xl font-bold text-yellow-400 mb-4">
								{movie!.title}
							</h1>
							<p className="text-gray-300 mb-6">{movie!.plot}</p>
							{user && (
								<Link
									to={`/movies/${id}/review`}
									className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded-md inline-block transition-colors"
								>
									Add Review
								</Link>
							)}

							<h2 className="text-xl font-bold text-yellow-400 mb-4 text-center">
								Reviews
							</h2>

							{movie!.reviews!.length > 0 ? (
								<div className="space-y-4 pl-4">
									{movie!.reviews!.map((review, index) => (
										<div
											key={index}
											className="bg-gray-700 rounded-lg p-3 shadow-md"
										>
											<div className="flex justify-between items-start mb-4">
												<h3 className="text-lg font-medium text-yellow-400">
													{review.name}
												</h3>
												<span className="text-sm text-gray-400">
													{moment(review.date).format("Do MMMM YYYY")}
												</span>
											</div>
											<p className="text-gray-300 mb-2">{review.review}</p>

											{user && user.id === review.user_id && (
												<div className="flex space-x-4">
													<Link
														to={`/movies/${id}/review`}
														state={{ currentReview: review }}
														className="text-blue-400 hover:text-blue-300 transition-colors"
													>
														Edit
													</Link>
													<button
														onClick={() => deleteReview(review._id, index)}
														className="text-red-400 hover:text-red-300 transition-colors"
													>
														Delete
													</button>
												</div>
											)}
										</div>
									))}
								</div>
							) : (
								<p className="text-gray-400 italic">
									No reviews yet. Be the first to review!
								</p>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Movie;
