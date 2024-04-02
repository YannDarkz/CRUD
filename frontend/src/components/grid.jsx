import styled from "styled-components";

import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";



const Table = styled.table`
    width: 100%;
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shawdow: 0px 0px 5px #ccc;
    max-width: 800px;
    margin: 20px auto;
    word-brask:  break-all;
`

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

const StyledTd = styled.td`
    padding-top: 15px;
    text-align: ${(props) => (props.alignCenter ? "center" : "start")};
    width: ${(props) => (props.width ? props.width : "auto")};

    @media (max-width: 500px) {
        display: ${({ onlyWeb }) => (onlyWeb ? 'none' : 'table-cell')};
   }
` 

export const Td = ({ onlyWebTd, alignCenterTd, widthTd, children }) => {
    return (
        <StyledTd onlyWeb={onlyWebTd} alignCenter={alignCenterTd} width={widthTd}>
            {children}
        </StyledTd>
    );
};

const StyledTh = styled.th`
    text-align: start;
    border-bottom: inset;
    padding-bottom: 5px;

    @media (max-width: 500px) {
        display: ${({ onlyWeb }) => (onlyWeb ? 'none' : 'table-cell')};
    }
`

export const Th = ({ onlyWebTh, children }) => {
    return <StyledTh onlyWeb={onlyWebTh} > {children} </StyledTh>
}

const Grid = ({ users, setUsers, setOnEdit }) => {

    const handleEdit = (user) => {
        setOnEdit(user)
    }

    const handleDelete = async (id) => {
        await axios
        .delete("http://localhost:8800/" + id)
        .then(({data}) => {
            const newArray = users.filter((user) => user.id !== id);

            setUsers(newArray);
            toast.success(data);
        })
        .catch(({data}) => toast.error(data));

        setOnEdit(null)
    }

    return (
        <Table>
            <Thead>
                <Tr>
                    <Th>Nome</Th>
                    <Th >Email</Th>
                    <Th onlyWebTh>Phone</Th>
                    <Th></Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {users.map((user, index) => (
                    <Tr key={index}>
                        <Td widthTd="30%"> {user.name} </Td>
                        <Td widthTd="30%"> {user.email} </Td>
                        <Td widthTd="20%" onlyWebTd> {user.phone} </Td>
                        <Td alignCenterTd widthTd="5%">
                        <FaEdit onClick={() => handleEdit(user)} />
                        </Td>
                        <Td alignCenter widthTd="5%">
                           
                            <FaTrash onClick={() => handleDelete(user.id)} />
                        </Td>
                    </Tr>

                ))}
            </Tbody>
        </Table>
    )
}

export default Grid