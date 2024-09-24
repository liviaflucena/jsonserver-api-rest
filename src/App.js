// Importa o componente "LogoIcon" do arquivo "icons" localizado na pasta "assets"
import { LogoIcon } from "./assets/icons"

// Importa o componente "CrudUser" do arquivo "CrudUser" localizado na pasta "components"
import CrudUser from "./components/CrudUser"

// Importa o arquivo de estilos "App.css" localizado na pasta "styles"
import "./styles/App.css"

// Função principal do aplicativo, que retorna o JSX da interface do usuário
function App() {
	return (
		<>
			{/* Header da página */}
			<header>
				<div className='header__content'>
					{/* Logo da aplicação */}
					<div className='logo'>
						{/* Componente "LogoIcon" que renderiza o ícone da logo */}
						<LogoIcon />
						{/* Texto em negrito que serve como título ou nome da API */}
						<strong>JSON SERVER API</strong>
					</div>
				</div>
			</header>

			{/* Main: conteúdo principal da página */}
			<main>
				{/* Componente "CrudUser" que provavelmente contém o CRUD de usuários */}
				<CrudUser />
			</main>
		</>
	)
}

// Exporta o componente "App" permitindo seu uso em outros arquivos
export default App
