// Importa as bibliotecas e hooks necessários do React e a função httpHelper
import React, { useState, useEffect } from "react"
import { httpHelper } from "../helpers/httpHelper"

// Define o componente DropCompanies, que exibe um dropdown de empresas
const DropCompanies = ({ companiesId, handleValue }) => {
  // Estado para armazenar a lista de empresas obtidas da API
  const [companies, setCompanies] = useState(null)

  // Estado para armazenar a empresa selecionada. Inicialmente é o valor recebido via props (companiesId)
  const [company, setCompany] = useState(companiesId)

  // URL base para as requisições da API de empresas
  const url = "http://localhost:5000/companies"

  // Instância do helper HTTP para realizar as requisições
  const api = httpHelper()

  // useEffect é usado para buscar a lista de empresas quando o componente é montado
  useEffect(() => {
    api
      .get(url) // Faz uma requisição GET para obter a lista de empresas
      .then(res => {
        // Define o estado 'companies' com a lista de empresas, adicionando uma opção inicial "Select Company"
        setCompanies([{ id: 0, name: "Select Company" }, ...res])
      })
      .catch(err => console.log(err)) // Loga qualquer erro que ocorra durante a requisição
  }, []) // O array vazio faz com que o efeito rode apenas uma vez, após a montagem do componente

  // Verifica se as empresas já foram carregadas; se não, retorna null (não renderiza nada até os dados estarem prontos)
  if (!companies) return null

  // Renderiza o dropdown de empresas
  return (
    <select
      name='companiesId'  // Nome do campo que será enviado em um formulário
      value={company}     // O valor do select é controlado pelo estado 'company'
      onChange={e => {
        setCompany(e.target.value)  // Atualiza o estado 'company' quando uma nova empresa é selecionada
        handleValue(e)              // Chama a função passada via props para manipular o valor selecionado
      }}
    >
      {/* Mapeia a lista de empresas para criar uma <option> para cada empresa */}
      {companies.map(c => (
        <option value={c.id} key={c.id}>
          {c.name}  {/* Exibe o nome da empresa no dropdown*/}
        </option>
      ))}
    </select>
  )
}

// Exporta o componente para ser utilizado em outros arquivos do projeto
export default DropCompanies
