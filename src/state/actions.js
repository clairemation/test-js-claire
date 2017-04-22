import moment from 'moment'
import movies from './movies'


export function getPopularMovies () {
  // Combine the two lists
  var allMovies = movies[0].concat(movies[1]);
  // Sift movies into year lists
  var yearLists = {},
    m = null,
    year = null;
  for (let i = 0; i < allMovies.length; i++){
    m = allMovies[i];
    year = (new Date(m.releaseDate)).getFullYear();
    m.releaseYear = year;
    yearLists[year] = yearLists[year] ? yearLists[year].concat(m) : [m] ;
  }
  // Put the years in order
  var orderedYearLists = Object.keys(yearLists).sort().map(year => yearLists[year]);
  // Sort each year's movie list by title
  orderedYearLists = orderedYearLists.map(list =>
    list.sort((a, b) => {
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;
      return 0;
    })
  );
  // Flatten the array of lists
  const combinedResults = orderedYearLists.reduce((acc, curr) => acc.concat(curr) );

  return {
    type: 'GET_MOVIES_SUCCESS',
    movies: combinedResults
  }
}


