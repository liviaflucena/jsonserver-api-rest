import React, { useState } from "react" // Importa o hook UseState do React
import DropComapies from "./DropCompanies" // Importa o componente DropComanies de ./DropCompanies

// Define o componente Form, que renderiza um formulário para adicionar ou editar informações de usuário
const Form = ({ userData = {}, postUser, updateUser }) => {
  // Estado para armazenar os dados do usuário em edição/adicionar
  const [user, setUser] = useState({
    name: userData.name ?? "",               // Nome do usuário, se fornecido via props, caso contrário, vazio
    username: userData.username ?? "",       // Username do usuário, se fornecido via props, caso contrário, vazio
    email: userData.email ?? "",             // Email do usuário, se fornecido via props, caso contrário, vazio
    phone: userData.phone ?? "",             // Número de telefone do usuário, se fornecido via props, caso contrário, vazio
    companiesId: userData.companiesId ?? "0" // ID da empresa associada ao usuário, se fornecido via props, caso contrário, "0"
  })

  // Função para atualizar o estado do usuário com base nos eventos de entrada do formulário
  const handleValue = e => {
    setUser({ ...user, [e.target.name]: e.target.value })  // Atualiza o estado 'user' conforme o campo do formulário é preenchido
  }

  // Função para lidar com a submissão do formulário
  const submitUser = e => {
    e.preventDefault()  // Previne o comportamento padrão de submissão do formulário

    if (user.companiesId === "0") return  // Verifica se uma empresa foi selecionada antes de prosseguir

    // Verifica se existe um ID de usuário; se existir, chama a função 'updateUser' para atualizar o usuário, caso contrário, chama 'postUser' para adicionar um novo usuário
    if (userData.id) {
      updateUser(userData.id, user)  // Chama a função 'updateUser' passando o ID do usuário e os dados atualizados
    } else {
      postUser(user)  // Chama a função 'postUser' para adicionar um novo usuário com os dados fornecidos
    }
  }

  // Renderiza o formulário de adição/edição de usuário
  return (
    <form onSubmit={submitUser} className='row'>
      {/* Campo de entrada para o nome do usuário */}
      <input
        type='text'
        name='name'
        value={user.name}
        placeholder='Name'
        onChange={e => handleValue(e)}  // Atualiza o estado 'user' quando o campo de entrada é alterado
      />
      {/* Campo de entrada para o email do usuário */}
      <input
        type='email'
        name='email'
        value={user.email}
        placeholder='Email'
        onChange={e => handleValue(e)}  // Atualiza o estado 'user' quando o campo de entrada é alterado
      />
      {/* Campo de entrada para o telefone do usuário */}
      <input
        type='tel'
        name='phone'
        value={user.phone}
        placeholder='Phone (10)'
        pattern='[0-9]{10}'  // Define um padrão para o número de telefone (10 dígitos numéricos)
        onChange={e => handleValue(e)}  // Atualiza o estado 'user' quando o campo de entrada é alterado
      />
      {/* Componente DropComapies para selecionar a empresa associada ao usuário */}
      <DropComapies companiesId={user.companiesId} handleValue={handleValue} />
      {/* Botão de submit para adicionar ou salvar usuário */}
      <input
        className='btn-submit'
        type='submit'
        value={`${!userData.id ? "Add new user" : "Save user"}`}  // Define o texto do botão com base na existência do ID do usuário
      />
    </form>
  )
}

// Exporta o componente para ser utilizado em outros arquivos do projeto
export default Form
