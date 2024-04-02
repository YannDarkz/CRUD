import styled from "styled-components"
import { useRef, useEffect } from "react"
import axios from "axios";
import { toast } from "react-toastify";

const FormContainer = styled.form`
    display: flex;
    align-items: flex-end;
    gap: 10px;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 0px 5px #ccc;
`;

const InputArea = styled.div`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    width: 120px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;
`;

const Label = styled.label``

const Button = styled.button`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #2c73d2;
    color: white;
    height: 42px;
`;


const Form = ({ onEdit, setOnEdit, getUsers }) => {
    const ref = useRef()

    useEffect(() => {
        if(onEdit) {
            const user = ref.current;

            user.name.value = onEdit.name
            user.email.value = onEdit.email
            user.phone.value = onEdit.phone
            user.date_birth.value = onEdit.date_birth
        }
    }, [onEdit])

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const user = ref.current

        if (
            !user.name.value ||
            !user.email.value ||
            !user.phone.value ||
            !user.date_birth.value 

        ) {
            return toast.warn( "Preencha todos os campos")
        }

        if (onEdit) {
            await axios
            .put("http://localhost:8800/" + onEdit.id, {
                name : user.name.value,
                email : user.email.value,
                phone : user.phone.value,
                date_birth : user.date_birth.value,
            })
            .then(({data}) => toast.success(data)) 
            .catch(({data}) => toast.error(data));
        } else {
            await axios
            .post("http://localhost:8800", {
                name : user.name.value,
                email : user.email.value,
                phone : user.phone.value,
                date_birth: user.date_birth.value,
            })
            .then(({ data }) => toast.success(data))
            .catch(({data}) => toast.error(data));
        }

        
        
        user.name.value =  "";
        user.email.value = "";
        user.phone.value = ""
        user.date_birth.value = "";

        setOnEdit(null)
        getUsers()
    };

    return (
        <>
            <FormContainer ref={ref} onSubmit={handleSubmit}>
                <InputArea>
                    <Label>Nome</Label>
                    <Input name="name" />
                </InputArea>
                <InputArea>
                    <Label>Email</Label>
                    <Input name="email" type="email" />
                </InputArea>
                <InputArea>
                    <Label>phone</Label>
                    <Input name="phone" />
                </InputArea>
                <InputArea>
                    <Label>Data de Nacimento</Label>
                    <Input name="date_birth" type="date" />
                </InputArea>

                <Button> Salvar </Button>
            </FormContainer>
        </>
    )
}

export default Form;