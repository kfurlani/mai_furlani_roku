export default {
  name: 'TheKidsHomePageComponent',

  template: `
    <div class="kid__container">
      <h1>IMDb Movie List</h1>
      <div class="kid__listing">
        <ul>
          <li v-for="movie in movies" :key="movie.id">
            <img :src="movie.image" alt="Movie Poster" class="kids_movies">
            <h3 class="kids_titles">{{ movie.title }}</h3>
            <p>Year: {{ movie.year }}</p>
            <p>Rating: {{ movie.imDbRating }} / 10</p>
            <video :src="getVideoUrl(movie.id)" controls class="kids_movies"></video>
          </li>
        </ul>
      </div>
    </div>
  `,

  data() {
    return {
      movies: [],
      videos: [],
    };
  },

  mounted() {
    this.fetchMovies();
    this.fetchVideos();
  },

  methods: {
    fetchMovies() {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(
        "https://imdb-api.com/API/AdvancedSearch/k_je93q399?title_type=feature&release_date=1950-01-01,1999-01-01&certificates=us:G,us:PG",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.results) {
            this.movies = result.results;
          } else {
            this.movies = [];
          }
        })
        .catch((error) => console.log("error", error));
    },

    fetchVideos() {
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": "ac74eb31femsh5a6e6ed80df43a7p10857djsn00f94077808e",
          "X-RapidAPI-Host": "imdb8.p.rapidapi.com",
        },
      };

      fetch(
        "https://imdb8.p.rapidapi.com/title/get-videos?tconst=tt0944947&limit=25&region=US",
        options
      )
        .then((response) => response.json())
        .then((result) => {
          if (result) {
            this.videos = result;
          } else {
            this.videos = [];
          }
        })
        .catch((error) => console.log("error", error));
    },

    getVideoUrl(movieId) {
      const video = this.videos.find((v) => v.parentTitleId === movieId);
      if (video) {
        return `https://www.imdb.com/video/imdb/${video.id}/imdb/embed?autoplay=true&ref_=vp_c_wl`;
      }
      return null;
    },
  },
};
