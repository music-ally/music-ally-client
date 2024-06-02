import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { LeftHalf, Name, RightHalf, RightWrapper, Row1, Switcher, Title, Wrapper } from "../components/auth-components";
import styled from "styled-components";
import isPropValid from '@emotion/is-prop-valid';
import GenderSelect from "../components/gender-select";
import Birthday from "../components/birth-select";
import Address from "../components/address-select";
import axios from "axios";

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

    const handleBlur = async (e: React.ChangeEvent<HTMLInputElement>, checkType: 'email' | 'nickname') => {
        try {
            // 입력 값 추출
            const value = e.target.value;
    
            // 백엔드 경로와 상태 업데이트 함수를 조건에 따라 선택
            const apiUrl = checkType === 'email' ? '/api/check-email' : '/api/check-nickname';
            const setMsg = checkType === 'email' ? setEmailMsg : setNicknameMsg;
            const setMsgError = checkType === 'email' ? setIsEmailError : setIsNameError;
    
            // .env 파일에 백엔드 주소 추가하여 요청 보내기
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}${apiUrl}`, { [checkType]: value });
    
            if (response.data.exists) {
                setMsg(`이미 존재하는 ${checkType === 'email' ? '이메일' : '닉네임'}입니다.`);
                setMsgError(true);
            } else {
                setMsg(`사용 가능한 ${checkType === 'email' ? '이메일' : '닉네임'}입니다.`);
                setMsgError(false);
            }
            setMsg(`이미 존재하는 ${checkType === 'email' ? '이메일' : '닉네임'}입니다.`);
            setMsgError(true);
        } catch (error) {
            console.error(`${checkType === 'email' ? '이메일' : '닉네임'} 중복 확인 오류: `, error);
        }
    }
    

    // setIsEmailError(true) 이면 submit 불가하도록
    

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
        // Password regex condition: 8-12 characters, must contain letters and numbers
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$/;
    
        if (password) {
            if (!passwordRegex.test(password)) {
                setPwMessege("비밀번호는 8~12자이며, 영어와 숫자를 포함해야 합니다.");
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
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,12}$/;

        if( !passwordRegex.test(password) ) {
            alert("비밀번호는 8~12자 사이이며, 영어와 숫자를 반드시 포함해야 합니다.");
            return;
        }

        // 비밀번호 일치 검사
        if( password !== confirmPassword ){
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        try{
            // 회원가입 정보 백엔드 전달
            // 비밀번호 확인, required 필수는 프론트에서 처리
            // 백에서는 email과 nickname이 unique한지 확인
            console.log({
                email,
                password, // 비밀번호 확인은 서버에서 다시 검증해야 합니다.
                nickname,
                gender,
                birthDate: `${year}-${month}-${day}`, // 생년월일을 하나의 문자열로 조합
            });

            navigate("/login");

            // // 회원가입 정보 백엔드로 전달
            // const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/register`, {
            //     email,
            //     password, // 비밀번호 확인은 서버에서 다시 검증해야 합니다.
            //     nickname,
            //     gender,
            //     birthDate: `${year}-${month}-${day}`, // 생년월일을 하나의 문자열로 조합
            // });

            // // 성공적으로 회원가입 정보가 전달되었다면, 로그인 페이지로 이동
            // navigate("/login");

            // // 백엔드에서 반환된 데이터를 콘솔에 출력 (개발 목적)
            // console.log(response.data);

            } catch (error) {
                // 오류 발생 시 처리 로직
                console.error("회원가입 오류 : ", error);
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
                            onBlur={(e) => handleBlur(e, 'email')}
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
                            placeholder="비밀번호 (8~12자리, 영어와 숫자를 포함하세요)"
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
                            onBlur={(e) => handleBlur(e, 'nickname')}
                            placeholder="닉네임"
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
    )
}