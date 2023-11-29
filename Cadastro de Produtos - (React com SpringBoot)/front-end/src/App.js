import { useEffect, useState } from 'react';
import './App.css';
import Formulario from './components/Formulario';
import Tabela from './components/Tabela';

function App() {

  const produto = {
    codigo : 0,
    nome : '',
    marca : ''
  }

  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [produtos, setProdutos] = useState([]);
  const [objProduto, setObjProduto] = useState(produto);

  useEffect(()=>{
    fetch("http://localhost:8080/listar")
    .then(retorno => retorno.json())
    .then(retorno_convertido => setProdutos(retorno_convertido));
  }, []);

  const handleWrite = (e) => {
    setObjProduto({...objProduto, [e.target.name]:e.target.value});
  }

  const clearForm = () => {
    setObjProduto(produto);
    setBtnCadastrar(true);
  }

  const selectProduct = (indice) => {
    setObjProduto(produtos[indice]);
    setBtnCadastrar(false);
  }

  const cadastrar = () => {
    fetch('http://localhost:8080/cadastrar',{
      method:'post',
      body:JSON.stringify(objProduto),
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
      
      if(retorno_convertido.mensagem !== undefined){
        alert(retorno_convertido.mensagem);
      }else{
        setProdutos([...produtos, retorno_convertido]);
        alert('Produto cadastrado com sucesso!');
        clearForm();
      }
      
    })
  }

  const alterar = () => {
    fetch('http://localhost:8080/alterar',{
      method:'put',
      body:JSON.stringify(objProduto),
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
      
      if(retorno_convertido.mensagem !== undefined){
        alert(retorno_convertido.mensagem);
      }else{
        
        alert('Produto alterado com sucesso!');

        let vetorTemp = [...produtos];

        let indice = vetorTemp.findIndex((p) =>{
          return p.codigo === objProduto.codigo;
        });

        vetorTemp[indice] = objProduto;
        setProdutos(vetorTemp);
        clearForm();
      }
      
    })
  }

  const remover = () => {
    fetch('http://localhost:8080/remover/'+objProduto.codigo,{
      method:'delete',
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
      alert(retorno_convertido.mensagem);

      let vetorTemp = [...produtos];

      let indice = vetorTemp.findIndex((p) =>{
        return p.codigo === objProduto.codigo;
      });

      vetorTemp.splice(indice, 1);
      setProdutos(vetorTemp);
      clearForm();
      
    })
  }

  return (
    <div>
      <div className='title'>
        <h1>Produtos</h1>
      </div>
      <Formulario botao={btnCadastrar} eventoTeclado={handleWrite} cadastrar={cadastrar} obj={objProduto} remover={remover} alterar={alterar} />                                   
      <Tabela vetor={produtos} selecionar={selectProduct} /> 
    </div>
  );
}

export default App;
