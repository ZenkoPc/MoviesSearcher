import { useCallback, useEffect, useState } from 'react'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import debounce from 'just-debounce-it'

export default function App(){

    const [sort, setSort] = useState(false)
    const { search, setSearch, error } = useSearch()
    const { movies, loading, getMovies } = useMovies({ search, sort })

    const debouncedGetMovies = useCallback(debounce( search => {
        getMovies({ search })
    },500),[getMovies])

    const handleSubmit = (event) => {
        event.preventDefault()
        getMovies({ search })
    }

    const handleChange = (event) => {
        const newSearch = event.target.value
        setSearch(newSearch)
        debouncedGetMovies(newSearch)
    }

    const handleSort = () => {
        setSort(!sort)
    }

    return (
        <div className="page">
             <header>
                <h1>Buscador de Peliculas</h1>
                <form className="form" onSubmit={handleSubmit}>
                    <input onChange={handleChange} name='search' type="text" placeholder="Avengers. Matrix ...." />
                    <input type="checkbox" onChange={handleSort} checked={sort}/>
                    <button type="submit">Buscar</button>
                </form>
                {error && <p style={{color: 'red'}}>{error}</p>}
             </header>
             <main>
                {
                    loading ? <p>Cargando...</p> 
                    : <Movies movies={movies} />
                }
             </main>
        </div>
    )
}