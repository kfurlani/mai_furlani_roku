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
          </li>
        </ul>
      </div>
    </div>
    `,

    data() {
        return {
          movies: [],
        };
      },
      mounted() {
        this.fetchMovies();
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
      },
    }

