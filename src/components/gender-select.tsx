import React, { useState } from 'react';
import styled from 'styled-components';

// `checked` 속성의 타입을 정의하는 interface 추가
interface LabelProps {
  checked: boolean;
}

const StyledDiv = styled.div`
    display: flex;
    justify-content: space-between;
`

const StyledLabel = styled.label<LabelProps>` // interface를 사용하여 타입 지정
    padding: 15px 0px;
    width: 48%;
    display: inline-flex;
    justify-content: center;
    border: 1px solid white;
    border-radius: 10px;
    cursor: pointer;

    color: ${props => props.checked ? 'black' : '#BFBFBF'};
    background-color: ${props => props.checked ? '#BFBFBF' : 'black'};

    input {
        display: none;
    };
    &:hover {
                opacity: 0.8;
        };
`;

export default function CustomRadio() {
    const [gender, setGender] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGender(e.target.value);
    }

    return (
        <StyledDiv>
        <StyledLabel checked={gender === 'female'}>
            <input
            type="radio"
            name="gender"
            value="female"
            checked={gender === 'female'}
            onChange={handleChange}
            />
            여성
        </StyledLabel>
        <StyledLabel checked={gender === 'male'}>
            <input
            type="radio"
            name="gender"
            value="male"
            checked={gender === 'male'}
            onChange={handleChange}
            />
            남성
        </StyledLabel>
        </StyledDiv>
    );
};
