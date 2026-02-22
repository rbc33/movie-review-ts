import axios from "axios";
const PORT = 8081;
const BACKEND_URL = process.env.BACKEND_URL || `http://localhost:${PORT}`;
// const BACKEND_URL = 'https://movies.rbenthem.com'

export interface Data {
  movie_id: string;
  review: string;
  user_id: string;
  name: string;
  review_id?: string;
}

class MovieDataService {
  getAll(page = 0) {
    return axios.get(`${BACKEND_URL}/api/v1/movies?page=${page}`);
  }

  get(id: string) {
    return axios.get(`${BACKEND_URL}/api/v1/movies/id/${id}`);
  }

  find(query: string, by = "title", page = 0) {
    return axios.get(
      `${BACKEND_URL}/api/v1/movies?${by}=${query}&page=${page}`,
    );
  }

  createReview(data: Data) {
    return axios.post(`${BACKEND_URL}/api/v1/movies/review`, data);
  }

  updateReview(data: Data) {
    return axios.put(`${BACKEND_URL}/api/v1/movies/review`, data);
  }

  deleteReview(id: string, userId: string) {
    return axios.delete(
      `${BACKEND_URL}/api/v1/movies/review`,

      { data: { review_id: id, user_id: userId } },
    );
  }

  getRatings() {
    return axios.get(`${BACKEND_URL}/api/v1/movies/ratings`);
  }
}

const movieDataService = new MovieDataService();

export default movieDataService;
