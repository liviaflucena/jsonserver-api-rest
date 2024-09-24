// Exporta a função `httpHelper`, que é um objeto de ajuda para realizar requisições HTTP (GET, POST, PUT, DELETE)
export const httpHelper = () => {
  
	// Função assíncrona personalizada que faz a requisição HTTP
	const customFetch = async (url, options = {}) => {
	  
	  // Define o método HTTP padrão como GET
	  const defaultMethod = "GET"
	  
	  // Define os cabeçalhos padrão para requisições com JSON
	  const defaultHeaders = {
		"Content-Type": "application/json", // Define o tipo de conteúdo como JSON
		Accept: "application/json",         // Especifica que aceita respostas em JSON
	  }
	  
	  // Cria um controlador para permitir cancelar a requisição
	  const controller = new AbortController()
	  
	  // Atribui o sinal do controlador à opção `signal`, permitindo abortar a requisição
	  options.signal = controller.signal
  
	  // Define o método da requisição, caso não seja fornecido, usa o método padrão (GET)
	  options.method = options.method || defaultMethod
  
	  // Mescla os cabeçalhos fornecidos com os cabeçalhos padrão
	  options.headers = options.headers
		? { ...defaultHeaders, ...options.headers }
		: defaultHeaders
  
	  // Converte o corpo da requisição para JSON se houver, ou o define como `false`
	  options.body = JSON.stringify(options.body) || false
	  
	  // Remove o campo `body` das opções se ele for `false`, para evitar erros em requisições GET
	  if (!options.body) delete options.body
  
	  // Define um tempo limite de 3 segundos para abortar a requisição, se demorar muito
	  setTimeout(() => {
		controller.abort()
	  }, 3000)
  
	  // Tenta fazer a requisição e retorna o resultado como JSON
	  try {
		const response = await fetch(url, options) // Faz a requisição HTTP com a URL e opções fornecidas
		return await response.json()               // Converte a resposta para JSON e a retorna
	  } catch (err) {
		return err   // Em caso de erro (como timeout ou erro de rede), retorna o erro
	  }
	}
  
	// Função para requisições GET, utilizando o `customFetch` com o método GET
	const get = (url, options = {}) => customFetch(url, options)
  
	// Função para requisições POST, define o método como POST e utiliza o `customFetch`
	const post = (url, options) => {
	  options.method = "POST"
	  return customFetch(url, options)
	}
  
	// Função para requisições PUT, define o método como PUT e utiliza o `customFetch`
	const put = (url, options) => {
	  options.method = "PUT"
	  return customFetch(url, options)
	}
  
	// Função para requisições DELETE, define o método como DELETE e utiliza o `customFetch`
	const del = (url, options) => {
	  options.method = "DELETE"
	  return customFetch(url, options)
	}
  
	// Retorna as funções GET, POST, PUT e DELETE, permitindo que elas sejam usadas externamente
	return {
	  get,
	  post,
	  put,
	  del,
	}
  }
  