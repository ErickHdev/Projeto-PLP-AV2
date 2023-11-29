function Tabela({vetor, selecionar}){
    return(
        <div className="bg">
            <table className='table'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Marca</th>
                        <th>Selecionar</th>
                    </tr>
                </thead>

                <tbody>
                    { vetor.map((obj, indice) => (
                        <tr key={indice}>
                            <td>{indice+1}</td>
                            <td>{obj.nome}</td>
                            <td>{obj.marca}</td>
                            <td><button onClick={() => {selecionar(indice)}} className="btn btn-success">Selecionar</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Tabela;