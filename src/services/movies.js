const API_KEY = 'c6c37e2a'

export const searchMovies = async ({ search }) => {

    if(search === '') return null

    try{

        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
        const json = await response.json()

        const movies = json.Search

        return movies?.map((ob) => ({
            id: ob.imdbID,
            title: ob.Title,
            year: ob.Year,
            poster: ob.Poster
        }))

    }catch(e){
        throw new Error('Error searching movies')
    }
}