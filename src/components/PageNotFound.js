import React from 'react'
import { Link } from 'react-router-dom';

export default function PageNotFound() {
    return (
        <div>
            <h2>Pagina Não Encontrada</h2>
            <p>
                <Link to='/'>Pagina Inicial</Link>
            </p>
        </div>
    )
}
