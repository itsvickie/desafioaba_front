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

	const [idEdit, setIdEdit] = useState();
	const [nomeEdit, setNomeEdit] = useState('');
	const [idDepEdit, setDepEdit] = useState();
	const [funcaoEdit, setFuncaoEdit] = useState('');
	const [idadeEdit, setIdadeEdit] = useState('');

	useEffect(() => {
		getFuncionarios();
		getDepartamento();
	}, []);

	async function getFuncionarios() {
		await Api.get('/funcionario.php').then(resp => {
			setFuncionarios(resp.data);
		}).catch(err => {
			console.log(err);
		});
	}

	async function handleDelete(id) {
		await Api.delete(`/funcionario.php?id=${id}`).then(resp => {
			getFuncionarios();
		}).catch(err => {
			console.log(err);
		});
	}

	async function handleEdit(id) {
		await Api.get(`/funcionario.php?id=${id}`).then(resp => {
			setNomeEdit(resp.data.nome);
			setDepEdit(resp.data.id_dep);
			setFuncaoEdit(resp.data.funcao);
			setIdadeEdit(resp.data.data_nasc);
			setIdEdit(resp.data.id);
		}).catch(err => {
			console.log(err);
		});
	}

	async function getDepartamento() {
		await Api.get('/departamento.php').then(resp => {
			setDepartamentos(resp.data);
			console.log(resp.data);
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

	async function handleSubmitEdit(event) {
		event.preventDefault();

		const itens = {
			'nome': nomeEdit, 
			'id_dep': idDepEdit,
			'funcao': funcaoEdit,
			'data_nascimento': '22/04/1999'
		};

		await Api.put(`/funcionario.php?id=${idEdit}`, itens).then(resp => {
			getFuncionarios();
		}).catch(err => {
			console.log(err);
		});
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
							<div class="list-group-item list-group-item-action">
								<div class="d-flex w-100 justify-content-between">
									<h5 class="mb-1">{funcionario.nome}</h5>
									<small>Idade: {funcionario.idade} anos</small>
								</div>
								<small>Função: {funcionario.funcao} | Departamento: {funcionario.departamento}</small>
							</div>

							<div>
								<button type="button" class="btn btn-light" data-bs-target="#exampleModal2" data-bs-toggle="modal" onClick={ () => handleEdit(funcionario.id) }>
									Alterar
								</button>

								<button type="button" class="btn btn-light" onClick={ () => handleDelete(funcionario.id) }>
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
											{
												departamentos.map(departamento => (
													<option value={departamento.id}>{departamento.descricao}</option>
												))
											}
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
										<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
										<button type="submit" class="btn btn-primary" data-dismiss="modal" aria-label="Close">Adicionar</button>
									</div>
								</form>
							</div>
					</div>
				</div>
			</div>

			<div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="exampleModalLabel">Editar Funcionário</h5>
							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
							<div class="modal-body">
								<form onSubmit={handleSubmitEdit}>
									<div>
										<label class="form-label">Nome</label>
										<input class="form-control" value={nomeEdit} onChange={text => setNomeEdit(text.target.value)}/>
									</div>

									<div>
										<label class="form-label mt-3">Departamento</label>
										<select class="form-select" aria-label="Default select example" value={idDepEdit} onChange={text => setDepEdit(text.target.value)}>
											{
												departamentos.map(departamento => (
													<>
													{
														departamento.id === idDepEdit ? (
															<option value={departamento.id} selected>{departamento.descricao}</option>
														) : (
															<option value={departamento.id}>{departamento.descricao}</option>
														)
													}
													</>
												))
											}
										</select>
									</div>

									<div>
										<label class="form-label mt-3">Função</label>
										<input class="form-control" value={funcaoEdit} onChange={text => setFuncaoEdit(text.target.value)}/>
									</div>

									<div>
										<label class="form-label mt-3">Data de Nascimento:</label>
										<input class="form-control" value={idadeEdit} onChange={text => setIdadeEdit(text.target.value)}/>
									</div>

									<div class="modal-footer">
										<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
										<button type="submit" class="btn btn-primary">Adicionar</button>
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