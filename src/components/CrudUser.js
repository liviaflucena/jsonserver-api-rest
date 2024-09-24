import React, { useState, useEffect } from "react" // Importa React e os hooks useState e useEffect
import Form from "./Form" // Importa o componente Form, responsável pelo formulário de criação de usuários
import Table from "./Table" // Importa o componente Table, responsável por exibir a tabela de usuários

import { httpHelper } from "../helpers/httpHelper" // Importa a função httpHelper, que auxilia nas requisições HTTP na Api

// Define o componente CrudUser
const CrudUser = () => {
  // Declara o estado 'users' para armazenar a lista de usuários. Inicialmente é null.
  const [users, setUsers] = useState(null)

  // Define a URL base da Api
  const url = "http://localhost:5000/users"

  // Cria uma instância do helper para facilitar as requisições HTTP
  const api = httpHelper()

  // Quando houver carregamento da página, useEffect para buscar os usuários assim que o componente for montado
  useEffect(() => {
    getUsers() // Chama a função para obter os usuários
  }, []) 

  // Função para adicionar um novo usuário por POST
  const postUser = user => {
    api
      .post(`${url}`, { body: user }) // Envia uma requisição POST para a URL com o corpo contendo os dados do usuário em JSON
      .then(res => getUsers()) // Após inserir novo usuário, busca novamente a lista atualizada de usuários em forma de promessa
      .catch(err => console.log(err)) // Em caso de erro, retorna o erro no console
  }

  // Função para atualizar um usuário existente por PUT
  const updateUser = (id, user) => {
    api
      .put(`${url}/${id}`, { body: user }) // Envia uma requisição PUT para a URL específica do usuário com os dados atualizados
      .then(res => getUsers()) // Após atualizar novo usuário, busca novamente a lista atualizada de usuários depois da atualização em forma de promessa
      .catch(err => console.log(err)) // Em caso de erro, retorna o erro no console
  }

  // Função para deletar um usuário por DELETE
  const deleteUser = id => {
    api
      .del(`${url}/${id}`, {}) // Envia uma requisição DELETE para a URL específica do usuário
      .then(res => getUsers()) // Após o delete, busca novamente a lista atualizada de usuários depois de deletar um dos usuários em forma de promessa
      .catch(err => console.log(err)) // Em caso de erro, retorna o erro no console
  }

  // Função para obter a lista de usuários por GET
  const getUsers = () => {
    api
      .get(`${url}?_expand=companies`) // Envia uma requisição GET para a URL com a query parameter '_expand=companies' para incluir dados da empresa associada
      .then(res => {
        setUsers(res) // Atualiza o estado 'users' com os dados recebidos quando a promessa for cumprida
      })
      .catch(err => console.log(err)) // Em caso de erro, retorna o erro no console
  }

  // Se 'users' ainda não foi carregado, não renderiza nada
  if (!users) return null

  // Retorna o JSX que compõe a interface
  return (
    <>
      {/* Título para a seção de criação de um novo usuário */}
      <h3>New user</h3>
      {/* Componente Form recebe a função postUser como prop para adicionar novos usuários */}
      <Form postUser={postUser} />
      
      {/* Contêiner para exibir todos os usuários */}
      <div className='all-users'>
        {/* Título para a seção de listagem de usuários */}
        <h3>All users</h3>
        {/* Componente Table recebe os usuários e as funções para manipulação como props */}
        <Table
          users={users}           // Lista de usuários a ser exibida na tabela
          setUsers={setUsers}     // Função para atualizar o estado 'users' se necessário
          postUser={postUser}     // Função para adicionar um novo usuário
          updateUser={updateUser} // Função para atualizar um usuário existente
          deleteUser={deleteUser} // Função para deletar um usuário
        />
      </div>
    </>
  )
}

// Exporta o componente CrudUser para ser utilizado em outros arquivos
export default CrudUser
