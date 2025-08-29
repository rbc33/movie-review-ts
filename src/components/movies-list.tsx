import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MovieDataService from '../services/movies'
import defaultImage from '../assets/Image-not-found.png'

interface Movie {
	_id: string
	title: string
	poster: string
	plot: string
	rated: string
	reviews?: object[]
}

const MoviesList = () => {
	const [movies, setMovies] = useState<Movie[]>([])
	const [searchTitle, setSearchTitle] = useState('')
	const [searchRating, setSearchRating] = useState('')
	const [ratings, setRatings] = useState<string[]>(['All Ratings'])

	const [currentPage, setCurrentPage] = useState(0)
	const [entriesPerPage, setEntriesPerPage] = useState(0)
	const [currentSearchMode, setCurrentSearchMode] = useState('')

	useEffect(() => {
		retrieveRatings()
	}, [])

	useEffect(() => {
		retrieveNextPage()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPage])

	const retrieveNextPage = () => {
		if (currentSearchMode === 'findByTitle') findByTitle()
		else if (currentSearchMode === 'findByRating') findByRating()
		else retrieveMovies()
	}

	const retrieveMovies = () => {
		MovieDataService.getAll()

			.then((response) => {
				console.log(response.data)
				setMovies(response.data.movies || [])
				setCurrentPage(response.data.page || 0)
				setEntriesPerPage(response.data.entries_per_page || 20)
			})

			.catch((e) => {
				console.log(e)
				setMovies([])
			})
	}

	const retrieveRatings = () => {
		MovieDataService.getRatings()

			.then((response) => {
				console.log(response.data)
				//start with 'All ratings' if user doesn't specify any ratings
				setRatings(['All Ratings'].concat(response.data))
			})

			.catch((e) => {
				console.log(e)
			})
	}
	const onChangeSearchTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		const searchTitle = e.target.value

		setSearchTitle(searchTitle)
	}

	const onChangeSearchRating = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const searchRating = e.target.value

		setSearchRating(searchRating)
	}
	const find = (query: string, by: string) => {
		setCurrentSearchMode('')
		MovieDataService.find(query, by)

			.then((response) => {
				setMovies(response.data.movies)
			})

			.catch((e) => {
				console.log(e)
			})
	}

	const findByTitle = () => {
		setCurrentSearchMode('findByTitle')

		find(searchTitle, 'title')
	}

	const findByRating = () => {
		setCurrentSearchMode('findByRating')

		if (searchRating === 'All Ratings') {
			retrieveMovies()
		} else {
			find(searchRating, 'rated')
		}
	}
	return (
		<div className="min-h-screen bg-gray-900 text-white p-6">
			<div className="container mx-auto">
				<div className="bg-gray-800 rounded-lg p-6 shadow-lg mb-8">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
						<div>
							<label className="block text-sm font-medium mb-2">
								Search by title
							</label>
							<div className="flex">
								<input
									type="text"
									placeholder="Search by title"
									value={searchTitle}
									onChange={(e) => onChangeSearchTitle(e)}
									className="w-full rounded-l-md bg-gray-700 border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
								/>
								<button
									onClick={findByTitle}
									className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold rounded-r-md px-4 py-2 transition-colors"
								>
									Search
								</button>
							</div>
						</div>

						<div>
							<label className="block text-sm font-medium mb-2">
								Filter by rating
							</label>
							<div className="flex">
								<select
									onChange={(e) => onChangeSearchRating(e)}
									className="w-full rounded-l-md bg-gray-700 border-gray-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
								>
									{ratings &&
										ratings.length > 0 &&
										ratings.map((rating) => (
											<option key={rating} value={rating}>
												{rating}
											</option>
										))}
								</select>
								<button
									onClick={findByRating}
									className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold rounded-r-md px-4 py-2 transition-colors"
								>
									Filter
								</button>
							</div>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{movies && movies.length > 0 ? (
						movies.map((movie) => (
							<div
								key={movie._id}
								className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
							>
								<div className="flex flex-col md:flex-row">
									<img
										src={
											movie.poster ? movie.poster + '/100px180' : defaultImage
										}
										alt={movie.title}
										onError={(e) => {
											;(e.target as HTMLImageElement).src = defaultImage
										}}
										className="h-80 w-full md:w-1/3 object-cover"
									/>
									<div className="p-4 flex flex-col justify-between w-full md:w-2/3">
										<div>
											<h3 className="text-xl font-bold text-yellow-400 mb-2">
												{movie.title}
											</h3>
											<div className="mb-2 text-sm inline-block px-2 py-1 bg-gray-700 rounded-full">
												Rating: {movie.rated}
											</div>
											<p className="text-gray-300 mb-4 line-clamp-3">
												{movie.plot}
											</p>
										</div>
										<Link
											to={`/movies/${movie._id}`}
											className="text-yellow-400 hover:text-yellow-300 font-medium inline-flex items-center"
										>
											View Reviews
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-4 w-4 ml-1"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M9 5l7 7-7 7"
												/>
											</svg>
										</Link>
									</div>
								</div>
							</div>
						))
					) : (
						<div className="col-span-full text-center text-gray-400 py-8">
							<p>Loading movies...</p>
						</div>
					)}
				</div>

				<div className="mt-8 text-center">
					<p className="mb-2">Showing page: {currentPage}</p>
					<button
						onClick={() => setCurrentPage(currentPage + 1)}
						className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
					>
						Get next {entriesPerPage} results
					</button>
				</div>
			</div>
		</div>
	)
}

export default MoviesList
