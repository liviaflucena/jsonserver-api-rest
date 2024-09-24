// Importa a biblioteca React, que é usada para criar componentes e a interface do usuário
import React from "react";

// Importa a biblioteca ReactDOM, que é usada para manipular o DOM 
import ReactDOM from "react-dom";

// Importa o componente "App" do arquivo "App.js", que é o componente principal da aplicação
import App from "./App";

// O método "ReactDOM.render" renderiza o componente "App" dentro de um elemento do DOM
ReactDOM.render(
  // O componente "React.StrictMode" é uma ferramenta para destacar possíveis problemas no código.
  // Ele ativa verificações e avisos adicionais em desenvolvimento.
  <React.StrictMode>
    {/* Componente "App", que contém toda a estrutura da aplicação */}
    <App />
  </React.StrictMode>,
  // Seleciona o elemento HTML com o id "root" e renderiza o componente "App" dentro dele
  document.getElementById("root")
);
