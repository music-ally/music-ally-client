import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Input, LeftHalf, Name, RightHalf, RightWrapper, Row1, Switcher, Title, Wrapper } from "../components/auth-components";
import styled from "styled-components";

interface TextProps {
    isError ?: boolean;
}

const Text = styled.span<TextProps>`
    font-size: 10px;
    color: ${({ isError }) => isError ? '#FF6666' : '#CBCBCB'};
    margin-bottom: 5px;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
`

const Divider = styled.div`
    width: 100%;
    height: 0.5px;
    background-color: #BFBFBF;
    margin: 15px 0px;
    display: flex;
    justify-content: center; /* 가운데 정렬 */
    align-items: center; /* 가운데 정렬 */
`


export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [pwMessage, setPwMessege] = useState("");
    const [isError, setIsError] = useState(false);


    const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const { target : {name, value}} = e;
        if(name === "email"){
            setEmail(value);
        } else if(name === "password"){
            setPassword(value);
        } else if(name === "confirmPassword"){
            setConfirmPassword(value);
        } else if(name === "nickname"){
            setNickname(value);
        }
    };

    useEffect(() => {
        if( password && confirmPassword ) {
            if( password === confirmPassword ){
                setPwMessege("비밀번호가 일치합니다.");
                setIsError(false);
            } else {
                setPwMessege("비밀번호가 일치하지 않습니다. 다시 입력해 주십시오.");
                setIsError(true);
            }
        }
    }, [password, confirmPassword]);


    const onSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if( password !== confirmPassword ){
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }
    };

    return (
        <Wrapper>
            <LeftHalf />
            <RightHalf>
                <Switcher>
                    <Link to="/login">Musically 로그인으로 돌아가기 &rarr;</Link>
                </Switcher>
                <RightWrapper>
                    <Title> 회원정보입력 </Title>
                    {/* 이메일 입력 */}
                    {/* 비밀번호 입력 */}
                    {/* 비밀번호 확인 */}
                    {/* 닉네임 입력 */}
                    <Form onSubmit={ onSubmit }>
                        <Input
                            onChange={onChange}
                            name="email"
                            value={email}
                            type="email"
                            placeholder="이메일"
                            required
                        />
                        <Text>
                            이미 존재하는 이메일입니다.
                        </Text>
                        <Input
                            onChange={onChange}
                            name="password"
                            value={password}
                            type="password"
                            placeholder="비밀번호"
                            required
                        />
                        <Input
                            onChange={onChange}
                            name="confirmPassword"
                            value={confirmPassword}
                            type="password"
                            placeholder="비밀번호 확인"
                            required
                        />
                        <Text isError = {isError}>
                            {pwMessage}
                        </Text>
                        <Input
                            onChange={onChange}
                            name="nickname"
                            value={nickname}
                            type="name"
                            placeholder="닉네임"
                            required
                        />
                        <Text>
                            이미 존재하는 닉네임입니다.
                        </Text>
                        {/* 구분선 */}
                        <Divider/>
                    </Form>
                </RightWrapper>
            </RightHalf>
        </Wrapper>
    )
}