import styled from "styled-components"
import bgimg from "../assets/bgimage_00.png"
import { Link } from "react-router-dom";
import GoogleButton from "../components/google-btn";
import KakaoButton from "../components/kakao-btn";
import React, { useState } from "react";
import { FiEye, FiEyeOff } from 'react-icons/fi';

const Wrapper = styled.div`
    display: flex;
    height: 100%;
`

const LeftHalf = styled.div`
    flex: 1; /* 왼쪽 절반 */
    width: 50%;
    background-image: url(${bgimg});
    background-size: cover;
    background-position: center;
    display: flex;
    height: 100vh;
`;

const RightHalf = styled.div`
    flex: 1; /* 오른쪽 절반 */
    width: 50%;
    background-color: black;
    color: white;
    display: flex;
    flex-direction: column;
    // justify-content: center; /* 수평가운데 */
    align-items: center; /* 수직가운데 */
`;

const RightWrapper = styled.div`
    width: 500px;
`

const Switcher = styled.span`
    margin-top: 40px;
    margin-right: 40px;
    a {
        color: #BFBFBF
    };
    // 오른쪽 끝에 위치
    align-self: self-end;
`
const Title = styled.h1`
    color: #BFBFBF;
    font-weight: 400;
    margin: 50px 0;
`

const Divider = styled.div`
    width: 50%;
    height: 0.5px;
    background-color: #BFBFBF;
    margin: 45px 10px;
    display: flex;
    justify-content: center; /* 가운데 정렬 */
    align-items: center; /* 가운데 정렬 */
`

const DividerText = styled.span`
    display: inline-block; /* 블록 요소로 설정하여 가로 크기를 설정할 수 있게 함 */
    margin: 35px 10px; /* 좌우 마진 추가 */
    color: #BFBFBF;
`

const Row = styled.div`
    display: flex;
    margin: 10px 0;
`

const Row1 = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 10px;
    width: 100%;
`

const Name = styled.span`
    color: #BFBFBF;
    font-size: 15px;
`

const ShowPwButton = styled.button`
  background-color: transparent;
  border: none;
  color: #BFBFBF;
  cursor: pointer;
`;

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
        background-color: #222222;
        color: #BFBFBF;
        border-radius: 20px;
        width: 50%;
        align-self: self-end;
        padding:15px 0px;
    }
`


// 내부에 패딩을 줘야 하는데 flex 요소 때문인지 움직이네...


export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const passwordVisible = (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    };

    const onSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    };

    return (
        <Wrapper>
            <LeftHalf />
            <RightHalf>
                <Switcher>
                    <Link to="/sign-up">Musically가 처음이라면? &rarr;</Link>
                </Switcher>
                <RightWrapper>
                    <Title> 로그인 </Title>
                    {/* 구글로그인 버튼 */}
                    <GoogleButton />
                    {/* 카카오로그인 버튼 */}
                    <KakaoButton onClick={onclick} />
                    {/* 구분선 */}
                    <Row>
                        <Divider/>
                            <DividerText>OR</DividerText>
                        <Divider/>
                    </Row>
                    {/* 로그인 input */}
                    <Form onSubmit={ onSubmit }>
                        <Name>
                            이메일
                        </Name>
                        <Input 
                            name="email"
                            type="email"
                            required
                        />
                        <Row1>
                            <Name>
                                비밀번호
                            </Name>
                            <ShowPwButton onClick={ passwordVisible }>
                                {showPassword ? <FiEyeOff /> : <FiEye />}
                                {showPassword ? " Hide":" Show" }
                            </ShowPwButton>
                        </Row1>
                        <Input 
                            name="password"
                            //type="password"
                            type={showPassword ? "text" : "password" }
                            required
                        />
                        <Input 
                            type="submit"
                            value = "로그인하기"
                        />
                    </Form>
                </RightWrapper>
            </RightHalf>
        </Wrapper>
    )
}