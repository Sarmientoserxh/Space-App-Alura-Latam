import styled from "styled-components";

const Campo = styled.input`
display: flex;
    justify-content: space-between;
    align-content: center;
    border-radius: 10px;
    border: 2px #C98CF1 solid;
    color: #D9D9D9
    
    
`

const CampoTexto = (props)=> {
    <Campo placeholder={props.place}>
        <img src="/images/buscar.png" alt="lupa buscar"/>
    </Campo>
}

export default CampoTexto;