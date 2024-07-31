import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import GoogleButton from "../components/google-btn";
import KakaoOauth from "../api/kakao";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { GoogleOAuthProvider } from "@react-oauth/google";
import {
  Divider,
  DividerText,
  Form,
  Input,
  LeftHalf,
  Name,
  RightHalf,
  RightWrapper,
  Row,
  Row1,
  ShowPwButton,
  Switcher,
  Title,
  Wrapper,
} from "../components/auth-components";
import { createGlobalStyle } from "styled-components";


const GlobalStyle = createGlobalStyle`
  font-family: 'Inter';
`;


export default function Login() {
  const MYAPI = import.meta.env.VITE_GOOGLE_API_KEY;
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const passwordVisible = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  // 폼 제출 처리 함수
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // 이전 에러 메시지 초기화

    try {
      console.log(`${import.meta.env.VITE_BACKEND_URL}/auth/login`);

      // 이메일과 비밀번호를 URL 쿼리 문자열로 인코딩
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        {
          email: email,
          password: password,
        }
      );

      const { success, message, data } = response.data;

      if (success) {
        const { access_token, refresh_token } = data;

        // JWT 토큰을 쿠키에 저장
        Cookies.set("access_token", access_token, { expires: 1 }); // 1일 만료
        Cookies.set("refresh_token", refresh_token, { expires: 7 }); // 7일 만료

        // 홈 페이지 또는 다른 보호된 경로로 이동
        navigate("/home");
      } else {
        setError(message); // 서버에서 보낸 에러 메시지 설정
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("로그인을 실패했습니다. 이메일이나 비밀번호를 확인하세요."); // 에러 메시지 설정
    }
  };

  return (
    <>
    <GlobalStyle />
    <Wrapper>
      <LeftHalf />
      <RightHalf>
        <Switcher>
          <Link to="/sign-up">Musically가 처음이라면? &rarr;</Link>
        </Switcher>
        <RightWrapper>
          <Title>로그인</Title>
          {/* 구글로그인 버튼 */}
          <GoogleOAuthProvider clientId={MYAPI}>
            <GoogleButton />
          </GoogleOAuthProvider>
          {/* 카카오로그인 버튼 */}
          <KakaoOauth />
          {/* 구분선 */}
          <Row>
            <Divider />
            <DividerText>OR</DividerText>
            <Divider />
          </Row>
          {/* 로그인 input */}
          <Form onSubmit={onSubmit}>
            <Name>이메일</Name>
            <Input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Row1>
              <Name>비밀번호</Name>
              {/* 에러 메시지 표시 */}
              {error && (
                <span
                  style={{
                    color: "red",
                    fontSize: "0.8em",
                    marginLeft: "5px",
                    marginRight: "10px",
                  }}
                >
                  {error}
                </span>
              )}
              <ShowPwButton onClick={passwordVisible}>
                {showPassword ? <FiEyeOff /> : <FiEye />}
                {showPassword ? " Hide" : " Show"}
              </ShowPwButton>
            </Row1>
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Input type="submit" value="로그인하기" />
          </Form>
        </RightWrapper>
      </RightHalf>
    </Wrapper>
    </>
  );
}
