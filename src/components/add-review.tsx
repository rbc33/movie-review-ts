import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { User } from "../App";
import MovieDataService, { Data } from "../services/movies";

interface AddReviewProps {
	user?: User;
}

const AddReview = ({ user }: AddReviewProps) => {
	const params = useParams();
	const location = useLocation();
	let initialReviewState = "";
	let editing = false; // means adding. if editing, set to true

	//check if 'state' is passed inde
	// if (props.location.state && props.location.state.currentReview) {
	// 	editing = true;
	// 	initialReviewState = props.location.state.currentReview.review;
	// }
	if (location.state && location.state.currentReview) {
		editing = true;
		initialReviewState = location.state.currentReview.review;
	}

	const [review, setReview] = useState(initialReviewState);
	const [submitted, setSubmitted] = useState(false);

	const saveReview = () => {
		const data: Data = {
			review: review,
			name: user!.name,
			user_id: user!.id,
			// movie_id: props.match.params.id, // get movie id direct from url
			movie_id: params!.id!, // get movie id direct from url
		};

		if (editing) {
			// get existing review id
			// data.review_id = props.location.state.currentReview._id;
			data.review_id = location.state.currentReview._id;
			MovieDataService.updateReview(data)
				.then((response) => {
					setSubmitted(true);
					console.log(response.data);
				})
				.catch((e) => {
					console.log(e);
				});
		} else {
			MovieDataService.createReview(data)
				.then((response) => {
					setSubmitted(true);
					console.log(response.data);
				})
				.catch((e) => {
					console.log(e);
				});
		}
	};

	return (
		<div className="min-h-screen bg-gray-900 text-white p-6">
			<div className="container mx-auto max-w-2xl">
				<div className="bg-gray-800 rounded-lg p-6 shadow-lg">
					{submitted ? (
						<div className="text-center py-8">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-16 w-16 mx-auto text-green-500 mb-4"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M5 13l4 4L19 7"
								/>
							</svg>
							<h4 className="text-xl font-bold text-green-400 mb-4">
								Review submitted successfully
							</h4>
							<Link
								to={`/movies/${params.id}`}
								className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-6 rounded-md inline-block transition-colors"
							>
								Back to Movie
							</Link>
						</div>
					) : (
						<div>
							<h2 className="text-xl font-bold text-yellow-400 mb-6">
								{editing ? "Edit" : "Create"} Review
							</h2>
							<div className="mb-6">
								<label className="block text-sm font-medium mb-2">
									Your Review
								</label>
								<textarea
									required
									rows={4}
									value={review}
									onChange={(e) => setReview(e.target.value)}
									className="w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
									placeholder="Share your thoughts about this movie..."
								/>
							</div>
							<div className="flex justify-between">
								<Link
									to={`/movies/${params.id}`}
									className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
								>
									Cancel
								</Link>
								<button
									onClick={saveReview}
									className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-6 rounded-md transition-colors"
								>
									Submit
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default AddReview;
