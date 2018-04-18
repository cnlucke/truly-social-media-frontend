const URL1 = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US&query=`
const URL2 = '&page=1&include_adult=false'
const GENRE_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US`
const BASE_URL = 'https://image.tmdb.org/t/p/w400'

export const fetchSearchResults = (searchTerm, genres) => {
  return (dispatch) => {
    if (searchTerm.length > 0) {
      fetch(URL1 + searchTerm + URL2)
        .then(res => res.json())
        .then(items => {

          //sort by popularity first
          items.results.sort((a,b) => b.popularity - a.popularity)
          dispatch({
            type: 'LOAD_RESULTS',
            payload: transformMovies(items.results, genres),
          })
        }
      )
    } else {
      dispatch({
        type: 'LOAD_RESULTS',
        payload: [] })
    }
  }
}

const transformMovies = (movies, genres) => {
  return movies.map((movie) => {
    const date = movie.release_date || movie.first_air_date
    const title = movie.title || movie.name
    movie.date = formatDateString(date);
    movie.title = title;
    movie.api_id = movie.id
    movie.genres = transformGenres(movie.genre_ids, genres)
    if (movie.poster_path) {
      movie.poster_url = `${BASE_URL + movie.poster_path}`
    } else {
      movie.poster_url = null
    }
    if (movie.backdrop_path) {
      movie.backdrop_url = `${BASE_URL + movie.backdrop_path}`
    } else {
      movie.backdrop_url = null
    }
    return movie
  })
}

const transformGenres = (genre_ids, genres) => {
  let finalGenres = [];
  if (genre_ids) {
    genre_ids.forEach((id) => {
      // find matching genre in this.state.genres
      let foundGenre = genres.find((genre) => genre.id === id)

      if (foundGenre && foundGenre.name && !finalGenres.includes(foundGenre.name)) {
        finalGenres.push(foundGenre.name)
      }
    })
  }
  return finalGenres.join(', ')
}

const formatDateString = (dateString) => {
  if (!dateString) return null
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
  let dateArr = dateString.split('-')
  return months[dateArr[1] - 1] + ' ' + dateArr[0]
}

export const fetchGenres = () => {
  return (dispatch) => {
    fetch(GENRE_URL)
      .then(res => res.json())
      .then(results => dispatch({ type: 'SET_GENRES', payload: results.genres }))
  }
}

export const setSearchChoice = (item) => {
  return (dispatch) => {
    dispatch({
      type: 'SHOW_ITEM_CHOICE',
      payload: item
    })
  }
}

export const clearResults = () => {
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_RESULTS'
    })
  }
}
