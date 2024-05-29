import { Link } from "react-router-dom";
import GoogleButton from "../components/google-btn";
import KakaoButton from "../components/kakao-btn";
import React, { useState } from "react";
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Divider, DividerText, Form, Input, LeftHalf, Name, RightHalf, RightWrapper, Row, Row1, ShowPwButton, Switcher, Title, Wrapper } from "../components/auth-components";


// 내부에 패딩을 줘야 하는데 flex 요소 때문인지 움직이네...


export default function Login() {
    const MYAPI = import.meta.env.VITE_GOOGLE_API_KEY;
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
                    <GoogleOAuthProvider clientId={ MYAPI }>
                        <GoogleButton />
                    </GoogleOAuthProvider>
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