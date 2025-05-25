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
		<div>
			{submitted ? (
				<div>
					<h4>Review submitted successfully</h4>
					{/* <Link to={"/movies/" + props.match.params.id}>Back to Movie</Link> */}
					<Link to={"/movies/" + params.id}>Back to Movie</Link>
				</div>
			) : (
				<form>
					<label>{editing ? "Edit" : "Create"} Review</label>
					<input
						type="text"
						required
						value={review}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setReview(e.target.value)
						}
					/>
					<button onClick={saveReview}>Submit</button>
				</form>
			)}
		</div>
	);
};

export default AddReview;
