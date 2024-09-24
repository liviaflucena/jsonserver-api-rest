import React from "react" // Importa a biblioteca do React
import Form from "./Form" // Importa o componente Form de ./Form 

// Componente funcional Table que renderiza uma tabela de usuários
const Table = ({ users, postUser, updateUser, deleteUser }) => {
  // Função para exibir ou ocultar o formulário de atualização de usuário
  const showUpdateUser = id => {
    const form = document.getElementsByClassName(`show-form-${id}`)
    form[0].classList.toggle("hide-form")  // Adiciona ou remove a classe 'hide-form' para exibir ou ocultar o formulário
  }

  // Componente funcional Row que representa uma linha na tabela de usuários
  const Row = ({ user }) => {
    return (
      <>
        {/* Div para exibir os detalhes do usuário */}
        <div className='row'>
          <div>{user.name}</div>             {/* Nome do usuário */}
          <div>{user.email}</div>            {/* Email do usuário */}
          <div>{user.phone}</div>            {/* Número de telefone do usuário */}
          <div>{user.companies.name}</div>   {/* Nome da empresa associada ao usuário */}
          <div className='buttons'>
            {/* Botão para exibir/ocultar o formulário de atualização */}
            <button onClick={() => showUpdateUser(user.id)}>Update</button>
            {/* Botão para deletar o usuário */}
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </div>
        </div>
        {/* Div para exibir o formulário de atualização do usuário */}
        <div className={`hide-form show-form-${user.id}`}>
          {/* Renderiza o componente Form para editar o usuário */}
          <Form userData={user} postUser={postUser} updateUser={updateUser} />
        </div>
      </>
    )
  }

  // Renderiza a tabela de usuários
  return (
    <div className='table'>
      {/* Títulos das colunas da tabela */}
      <div className='titles'>
        <div>Name</div>      {/* Nome */}
        <div>Email</div>     {/* Email */}
        <div>Phone</div>     {/* Telefone */}
        <div>Company</div>   {/* Empresa */}
        <div>Actions</div>   {/* Ações */}
      </div>
      {/* Linhas da tabela, renderiza cada usuário como uma Row */}
      <div className='rows'>
        {users && users.map(u => <Row user={u} key={u.id} />)}  {/* Mapeia os usuários para exibir cada um como uma Row */}
      </div>
    </div>
  )
}

export default Table  // Exporta o componente Table para ser utilizado em outros arquivos
