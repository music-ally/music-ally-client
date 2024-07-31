import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Button = styled.button`
    margin-top: 20px;
    background-color: white;
    color: black;
    font-weight: 600;
    font-size: 16px;
    padding: 15px 0px;
    border-radius: 20px;
    border: 0;
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: center;
    width: 100%;
    cursor: pointer;
    &:hover {
        opacity: 0.8;
    }
`

const Logo = styled.img`
    height: 25px;
`

interface UserInfo {
    email: string;
    sub: number
}

export default function GoogleButton(){
    
    const navigate = useNavigate();

    const checkEmailExistence = async (email: string): Promise<{ is_duplicate: boolean; signup_method: string }> => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/check/email`, {
                email: email,
            });
    
            // 응답에서 중복 여부와 가입 방법을 반환
            return {
                is_duplicate: response.data.is_duplicate,
                signup_method: response.data.signup_method
            };
        } catch (error) {
            console.error('Email 존재 여부 확인 오류: ', error);
            throw error;
        }
    };

    const fetchData = async (email: string, sub: number) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login/social`, {
                email,
                sub,
            });
            console.log('Protected data: ', response.data);
            navigate("/"); // 요청 성공 후 홈으로 리디렉션
        } catch (error) {
            console.error('Error fetching protected data: ', error);
        }
    };


    const login = useGoogleLogin({
        onSuccess: async (credentialResponse) => {
            try {
                console.log(credentialResponse.access_token);
                // 쿠키에 토큰 저장
                Cookies.set('access_token', credentialResponse.access_token, {expires: 1}); // 1일동안 유효

                // 토큰으로 사용자 정보 가져오기
                const {data} = await axios.get<UserInfo>('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: {
                        Authorization: `Bearer ${credentialResponse.access_token}`,
                    },
                });

                // 일단 지금은 백엔드 소통 않고 받은 이메일 정보 직접 이동 처리
                navigate("/sns-signup", {state: {email: data.email, social_id: data.sub}});
                console.log(data.sub);
                ////
                /*
                if else 문 이용해서 email 백엔드에 존재하면 바로 로그인
                존재하지 않으면 sns-signup으로 이동
                */
                const {is_duplicate , signup_method} = await checkEmailExistence(data.email);

                if(is_duplicate) {
                    // 이메일이 존재하는 경우, 경로를 확인합니다.
                    if (signup_method === '구글') {
                        // 구글로 가입한 경우 구글 로그인 진행
                        fetchData(data.email, data.sub); 
                    } else{
                        // 이메일로 가입한 경우
                        alert("이미 가입된 이메일입니다. 이메일 로그인으로 시도해주세요.");
                    }
                } else {
                    navigate("/sns-signup", {state: {email: data.email, social_id: data.sub}});
                }

            } catch (error) {
                console.error("로그인 성공, 그러나 토큰 디코딩 에러:", error);
            }
        },
        onError: (error) => console.log("Login Failed:", error),
        flow: 'implicit',
    });

    return(
        <Button onClick = {() => login()}>
                    <Logo src="/google-logo.svg" />
                    구글로 계속하기
        </Button>
    )
}