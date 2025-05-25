import moment from "moment";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
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
		reviews: [],
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

			.then((response) => {
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
		<div>
			<Container>
				<Row>
					<Col>
						<Image src={movie.poster + "/100px250"} fluid />
					</Col>

					<Col>
						<Card>
							<Card.Header as="h5">{movie.title}</Card.Header>

							<Card.Body>
								<Card.Text>{movie.plot}</Card.Text>

								{/* {props.user && ( */}
								{/* <Link to={"/movies/" + props.match.params.id + "/review"}> */}
								{user && (
									<Link to={"/movies/" + id + "/review"}>Add Review</Link>
								)}
							</Card.Body>
						</Card>

						<br></br>

						<h2>Reviews</h2>
						<br></br>

						{movie.reviews.map((review, index) => {
							return (
								<Card key={index}>
									<Card.Body>
										<h5>
											{review.name + " reviewed on "}{" "}
											{moment(review.date).format("Do MMMM YYYY")}
										</h5>

										<p>{review.review}</p>

										{user && user.id === review.user_id && (
											<Row>
												<Col>
													<Link
														to={{
															pathname: `/movies/${id}/review`,
															state: { currentReview: review },
														}}
													>
														Edit
													</Link>
												</Col>

												<Col>
													<Button
														variant="link"
														onClick={() => deleteReview(review._id, index)}
													>
														Delete
													</Button>
												</Col>
											</Row>
										)}
									</Card.Body>
								</Card>
							);
						})}
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default Movie;
