//BLOCO DE IMPORTAÇÃO
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import './style.css';
import api from "./services/api"

function App (){
  //atribui um nome para uma constante e indica o valor da sua variável
  const [input, setInput] = useState('');
  const [cnpj, setCnpj] = useState({});

  //ASYNC FUNCTION: função assícrona para trazer informações ao api
  async function handleSearch(){
    //IF (INPUT === ''): verificando se o usuário escreveu o cep, caso nao, emite um alerta pedindo para fornecer um cep
    if(input === ''){
      alert ("Preenha algum CNPJ")
      return;
    }
    //TRY: executa a ação desejada, consullta api e armazena a informação 
    try{
      const response = await api.get(`${input}`)
      setCnpj(response.data)
      setInput("")


    //CATCH: sempre que a aplicação 'try' não der como esperado, emite um alerta
    }catch{
      alert("Erro ao buscar CNPJ")
      setInput("")
    }
  }

  //RETURN: retorna a aquisição
  return (
    <div className="container">
      <h1 className="title">Consultar CNPJ</h1>

  <div className="containerInput">
      <input
      type="text"
      placeholder="Digite o CNPJ..."
      //value:  valor do INPUT
      value={input}

    //ON CHANGE: captar qualquer tecla que estiver na variavel input
    //SET INPUT: allter o valor da variavel forneecida pelo usuário 
      onChange={(e) => setInput(e.target.value)} 
      />

      <button className="buttonSearch" onClick= {handleSearch}>
      
        <FiSearch size={25} color="FFF"/>
      </button> 
    </div>
    {Object.keys(cnpj).length > 0 && (
      <main className="main">
        <h2>Razão Social: {cnpj.razao_social}</h2>
        <span>Fundação: {cnpj.data_inicio_atividade}</span>
        <span>Situação Cadastral: {cnpj.desrição_situacao_cadastral}</span>
        <span>Contato: {cnpj.ddd_fax}</span>
      </main>
    )}  

    </div>
  );
}

export default App;


//Object.keys(cep).length > 0 &&: se CEP pr maior que 0, será renderizado
//ONCLICK; quando o usuário apertar o botão, vai chamar a função HANDLESEARCH