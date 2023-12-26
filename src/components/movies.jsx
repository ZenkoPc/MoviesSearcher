function ListOfMovies ({ movies }) {
    return <ul> {
             movies.map((ob) => {
                return <li key={ob.id}>
                      <h3>{ob.title}</h3>
                     <span>{ob.year}</span>
                     <img src={ob.poster} alt={ob.title} />
                </li>
             })
        }
    </ul>
}

function NoMovies(){
    return <p>No se han encontrado peliculas para esta busqueda</p>
}

export function Movies({ movies }){

    const hasMovies = movies?.length > 0

    return (
        hasMovies
        ? <ListOfMovies movies={movies} />
        : <NoMovies />
    )
}