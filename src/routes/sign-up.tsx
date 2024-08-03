import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { LeftHalf, Name, RightHalf, RightWrapper, Switcher, Title, Wrapper } from "../components/auth-components";
import styled, { createGlobalStyle } from "styled-components";
import isPropValid from '@emotion/is-prop-valid';
import GenderSelect from "../components/gender-select";
import Birthday from "../components/birth-select";
import Address from "../components/address-select";
import axios from "axios";

const GlobalStyle = createGlobalStyle`
  font-family: 'Inter';
`;

interface TextProps {
    isError ?: boolean;
    isEmailError ?: boolean;
    isNameError ?: boolean
}

const Text = styled.span.withConfig({
    shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'isError',
  })<TextProps>`
      font-size: 10px;
      color: ${({ isError }) => isError ? '#FF6666' : '#CBCBCB'};
      margin-bottom: 5px;
  `;

const AlertText = styled.span.withConfig({
    shouldForwardProp: (prop) => isPropValid(prop) && !['isEmailError, isNameError'].includes(prop)
})<TextProps>`
    font-size: 10px;
    color: ${({ isEmailError, isNameError }) => (isEmailError || isNameError) ? '#FF6666' : '#CBCBCB'};
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

const Input = styled.input`
    padding: 15px;
    border-radius: 10px;
    width: 100%;
    font-size: 16px;
    background-color: black;
    color: #BFBFBF;
    box-sizing: border-box; // padding 조절하여도 너비 그대로
    border: 1px solid #ffffff; /* 테두리 색상과 두께 조절 */

    &[type = "submit"] {
        cursor: pointer;
        &:hover {
            opacity: 0.8;
        };
        background-color: white;
        color: #222222;
        font-weight: bold;
        width: 100%;
        margin-top: 10px;
    }
`

export default function SignUp() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [emailMsg, setEmailMsg] = useState("");
    const [isEmailError, setIsEmailError] = useState(false);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [pwMessage, setPwMessege] = useState("");
    const [isError, setIsError] = useState(false);

    const [nickname, setNickname] = useState("");
    const [nicknameMsg, setNicknameMsg] = useState("");
    const [isNameError, setIsNameError] = useState(false);

    const [gender, setGender] = useState("");

    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [day, setDay] = useState("");

    const [address, setAddress] = useState("");

    const handleEmailBlur = async (e : React.ChangeEvent<HTMLInputElement>) => {
        // 입력 값 추출
        const email = e.target.value;
        try{
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/check/email`, {
                email: email,
            });

            const { success, message, data } = response.data;

            if(success) {
                const {is_duplicate, signup_method} = data;

                if(is_duplicate) {
                    setEmailMsg(`이미 존재하는 이메일입니다. 가입 방법: ${signup_method}`);
                    setIsEmailError(true);
                } else {
                    setEmailMsg("사용 가능한 이메일입니다.");
                    setIsEmailError(false);
                }

            } else {
                setEmailMsg(message);
                setIsEmailError(true);
            }
            
        } catch(error) {
            console.error("이메일 중복 확인 오류: ", error);
        }
    };

    const handleNicknameBlur = async (e : React.ChangeEvent<HTMLInputElement>) => {
        // 입력 값 추출
        const nickname = e.target.value;
        try{
            // 입력 값 추출
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/check/nickname`, {
                nickname: nickname,
            });
            const { success, message, data } = response.data;

            if(success) {
                if(data){
                    setNicknameMsg("이미 존재하는 닉네임입니다. ");
                    setIsNameError(true);
                } else{
                    setNicknameMsg("사용 가능한 닉네임입니다.")
                    setIsNameError(false);
                }
                
            } else {
                setNicknameMsg(message);
                setIsNameError(true);
            }
            
            
        } catch(error) {
            console.error("닉네임 중복 확인 오류: ", error);
        }
    };
    

    const onChange = async (e : React.ChangeEvent<HTMLInputElement>) => {
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
        // Password regex condition: 6-12 characters, must contain letters and numbers
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/;
    
        if (password) {
            if (!passwordRegex.test(password)) {
                setPwMessege("비밀번호는 6~12자이며, 영어와 숫자를 포함해야 합니다.");
                setIsError(true);
            } else if (password && confirmPassword && password === confirmPassword) {
                setPwMessege("비밀번호가 일치합니다.");
                setIsError(false);
            } else if (password && confirmPassword && password !== confirmPassword) {
                setPwMessege("비밀번호가 일치하지 않습니다. 다시 입력해 주십시오.");
                setIsError(true);
            } else {
                setPwMessege("");
                setIsError(false);
            }
        } else {
            setPwMessege("");
            setIsError(false);
        }
    }, [password, confirmPassword]);
    


    const onSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // 이메일 중복 오류 검사
        if (isEmailError) {
            alert("이미 사용중인 이메일입니다.");
            return;
        }

        // 닉네임 중복 오류 검사
        if (isNameError) {
            alert("이미 사용중인 닉네임입니다.");
            return;
        }

        // 비밀번호 조건 검사
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/;

        if( !passwordRegex.test(password) ) {
            alert("비밀번호는 6~12자 사이이며, 영어와 숫자를 반드시 포함해야 합니다.");
            return;
        }

        // 비밀번호 일치 검사
        if( password !== confirmPassword ){
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        try{
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/join`, {
                email,
                password,
                nickname,
                sex: gender,
                birthday: `${year}-${month}-${day}`, // 생년월일을 하나의 문자열로 조합
                homearea_name: address,
            });

            // 성공 알람 문구
            alert(`${nickname}님 회원가입이 완료되었습니다!!`)
            navigate("/login");


            } catch (error) {
                // 오류 발생 시 처리 로직
                console.error("회원가입 오류 : ", error);
            }
    };

    return (
        <>
        <GlobalStyle />
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
                            onBlur={handleEmailBlur}
                            placeholder="이메일"
                            required
                        />
                        <AlertText isEmailError = {isEmailError}>
                            {emailMsg}
                            {/* 다른 곳 클릭하면 중복 메시지 발생
                            */}
                        </AlertText>
                        <Input
                            onChange={onChange}
                            name="password"
                            value={password}
                            type="password"
                            placeholder="비밀번호 (6~12자리, 영어와 숫자를 포함하세요)"
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
                            onBlur={handleNicknameBlur}
                            placeholder="닉네임 (최대 20자)"
                            maxLength={20}
                            required
                        />
                        <AlertText isNameError = {isNameError}>
                            {nicknameMsg}
                            {/* 다른 곳 클릭하면 중복 메시지 발생
                            */}
                        </AlertText>
                        {/* 구분선 */}
                        <Divider/>
                        {/* 생년월일 입력 */}
                        <Name> 생년월일 </Name>
                        <Birthday year={year} month={month} day={day} setYear={setYear} setMonth={setMonth} setDay={setDay} />
                        {/* 성별 입력 */}
                        <Name> 성별 </Name>
                        <GenderSelect gender={gender} setGender={setGender} />
                        {/* 거주지 ( 시/ 도 ) */}
                        <Name> 거주지 </Name>
                        <Address address={address} setAddress={setAddress}/>
                        <Input 
                            type="submit"
                            value = "가입하기"
                        />
                    </Form>
                </RightWrapper>
            </RightHalf>
        </Wrapper>
        </>
    )
}