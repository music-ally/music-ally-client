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

    const checkEmailExistence = async (email: string): Promise<boolean> => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/check/email`, {
                email: email,
            }, {
                withCredentials: true // 쿠키 포함 요청
            });
            return response.data; // true 중복, false 가능
        } catch(error) {
            console.error('Email 존재 여부 확인 오류: ', error);
            throw error;
        }
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/protected`, {
                withCredentials: true // 쿠키 포함 요청
            });
            console.log('Protected data: ', response.data);
            navigate("/"); // 요청 성공 후 홈으로 리디렉션
        } catch (error) {
            console.error('Error fetching protected data: ', error);
        }
    };

    // 이메일 가입 경로 확인
    const getUserByEmail = async (email: string): Promise<any> => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/user`, {
                params: { email }, // 쿼리 파라미터로 이메일 전달
                withCredentials: true // 쿠키 포함 요청
            });

            return response.data;
        } catch (error) {
            console.error('사용자 정보 조회 오류: ', error);
            throw error;
        }
    };


    const login = useGoogleLogin({
        onSuccess: async (credentialResponse) => {
            try {
                console.log(credentialResponse.access_token);
                // 쿠키에 토큰 저장
                Cookies.set('access_token', credentialResponse.access_token, {expires: 1}); // 1일동안 유효
                // navigate("/");

                // 토큰으로 사용자 정보 가져오기
                const {data} = await axios.get<UserInfo>('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: {
                        Authorization: `Bearer ${credentialResponse.access_token}`,
                    },
                });

                // 일단 지금은 백엔드 소통 않고 받은 이메일 정보 직접 이동 처리
                // navigate("/sns-signup", {state: {email: data.email, sub: data.sub}});
                // console.log(data.sub);
                ////
                /*
                if else 문 이용해서 email 백엔드에 존재하면 바로 로그인
                존재하지 않으면 sns-signup으로 이동
                */
                const emailExists = await checkEmailExistence(data.email);

                if(emailExists) {
                    // 이메일이 존재하는 경우, 경로를 확인합니다.
                    const user = await getUserByEmail(data.email); // 이메일로 사용자 정보 조회

                    if (user.path === 'email') {
                        // 이메일로 가입한 경우
                        alert("이미 가입된 이메일입니다. 이메일 로그인으로 시도해주세요.");
                    } else if (user.path === 'google') {
                        // 구글로 가입한 경우 구글 로그인 진행
                        fetchData(); 
                    }
                } else {
                    navigate("/sns-signup", {state: {email: data.email, sub: data.sub}});
                }

            } catch (error) {
                console.log("로그인 성공, 그러나 토큰 디코딩 에러:", error);
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