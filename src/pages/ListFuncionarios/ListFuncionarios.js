import React, { useState, useEffect } from 'react';
import Api from '../../services/Api';
import './Styles.css';

const ListFuncionarios = () => {
	const [funcionarios, setFuncionarios] = useState([]);
	const [departamentos, setDepartamentos] = useState([]);
	const [nome, setNome] = useState('');
	const [idDep, setDep] = useState();
	const [funcao, setFuncao] = useState('');
	const [dataNasc, setDataNasc] = useState('');

	useEffect(() => {
		getFuncionarios();
	}, []);

	async function getFuncionarios() {
		await Api.get('/funcionario.php').then(resp => {
			setFuncionarios(resp.data);
		}).catch(err => {
			console.log(err);
		});
	}

	async function handleSubmit(event) {
		event.preventDefault();

		if(nome != '' && idDep != '' && funcao != '' && dataNasc != ''){
			const itens = {
				'nome': nome, 
				'id_dep': idDep,
				'funcao': funcao,
				'data_nascimento': dataNasc
			};

			await Api.post('/funcionario.php', itens).then(resp => {
				getFuncionarios();
				setNome('');
				setDep('');
				setFuncao('');
				setDataNasc('');
			}).catch(err => {
				console.log(err);
			});
		} else {
			alert('Alguns campos não foram preenchidos!');
		}
	}

	return (
		<div class="external-div">
			<div class="title-div">		
					<h1 class="text-center title">
						Lista de Funcionários
					</h1>

					<button type="button" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#exampleModal">
					+
					</button>
			</div>

			<div class="lista">
				{
					funcionarios.map(funcionario => (
						<div class="list-group">
							<a href="#" class="list-group-item list-group-item-action" aria-current="true">
								<div class="d-flex w-100 justify-content-between">
									<h5 class="mb-1">{funcionario.nome}</h5>
									<small>Idade: {funcionario.idade} anos</small>
								</div>
								<small>Função: {funcionario.funcao} | Departamento: {funcionario.departamento}</small>
							</a>

							<div>
								<button type="button" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#exampleModal">
									Alterar
								</button>

								<button type="button" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#exampleModal">
									Excluir
								</button>
							</div>
						</div>
					))
				}
			</div>


			<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="exampleModalLabel">Novo Funcionário</h5>
							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
							<div class="modal-body">
								<form onSubmit={handleSubmit}>
									<div>
										<label class="form-label">Nome</label>
										<input class="form-control" value={nome} onChange={text => setNome(text.target.value)}/>
									</div>

									<div>
										<label class="form-label mt-3">Departamento</label>
										<select class="form-select" aria-label="Default select example" value={idDep} onChange={text => setDep(text.target.value)}>
											<option value="1">One</option>
											<option value="2">Two</option>
											<option value="3">Three</option>
										</select>
									</div>

									<div>
										<label class="form-label mt-3">Função</label>
										<input class="form-control" value={funcao} onChange={text => setFuncao(text.target.value)}/>
									</div>

									<div>
										<label class="form-label mt-3">Data de Nascimento:</label>
										<input class="form-control" value={dataNasc} onChange={text => setDataNasc(text.target.value)}/>
									</div>

									<div class="modal-footer">
										<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
										<button type="submit" class="btn btn-primary">Save changes</button>
									</div>
								</form>
							</div>
					</div>
				</div>
			</div>

		</div>
	);
};

export default ListFuncionarios;