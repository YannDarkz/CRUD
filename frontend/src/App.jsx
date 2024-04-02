import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import axios from "axios";


import GlobalStyle from "./styles/global";
import styled, { StyleSheetManager } from "styled-components";

import Form from "./components/form";
import Grid from "./components/grid";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

function App() {
  const [users, setUsers] = useState([])
  const [onEdit, setOnEdit] = useState(null)

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800")
      setUsers(res.data.sort((a,b) => (a.nome > b.nome ? 1 : -1)));
      toast.success("Usuários carregados com sucesso!");
    } catch (error) {
      toast.error(error);
    }
  }

  useEffect(() => {
    getUsers();
  }, [setUsers])


  return (
    <div>
      <Container>
        <Title> Usuários </Title>

        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
        <StyleSheetManager shouldForwardProp={(prop) => !['onlyWeb', 'alignCenter', 'width'].includes(prop)}>
          <Grid users={users} setUsers={setUsers} setOnEdit={setOnEdit}/>
        </StyleSheetManager>,

      </Container>
      <ToastContainer  autoClose={2000} position="bottom-left"   />
      <GlobalStyle />


    </div>
  )
}

export default App
