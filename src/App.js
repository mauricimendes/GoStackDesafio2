import React, { useState, useEffect } from "react"
import api from './services/api'
import "./styles.css"

function App() {

	const [repositories, setRepositories] = useState([])
	const [deleteRepository, setDeleteRepository] = useState(false)

	useEffect(() => {
		api.get('repositories').then(response => {
			setRepositories( ... repositories, response.data )
		})
	}, [])

	async function handleAddRepository() {
		const response = await api.post('repositories', {
			title: `Repositório ${Date.now()}`,
			techs: [
				"NodeJS",
				"ReactJS",
				"React Native"
			]
		})
		const repository = response.data
		if(!repository) { alert('error') }
		setRepositories([ ... repositories, repository ])
	}

	async function handleRemoveRepository(id) {
		await api.delete(`repositories/${id}`)
		setRepositories(repositories.filter(repository => repository.id !== id))
	}

	return (
		<div>
			<ul data-testid="repository-list">
			{
				repositories.map(repository => (
					<li key={repository.id}>
						{repository.title}
						<button onClick={() => handleRemoveRepository(repository.id)}>
							Remover
						</button>
					</li>	
				))
			}
			</ul>

			<button onClick={handleAddRepository}>Adicionar</button>
		</div>
	)
}

export default App
