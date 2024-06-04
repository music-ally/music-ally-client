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
}

export default function GoogleButton(){
    
    const navigate = useNavigate();

    const checkEmailExistence = async (email: string): Promise<boolean> => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/check-email`, {
                email: email,
            }, {
                withCredentials: true // 쿠키 포함 요청
            });
            return response.data.exists;
        } catch(error) {
            console.error('Email 존재 여부 확인 오류: ', error);
            throw error;
        }
    };

    const fetchData = () => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/protected`, {
            withCredentials: true // 쿠키 포함 요청
        })
        .then(response => {
            console.log('Protected data: ', response.data);
            navigate("/"); //요청 성공 후 홈으로 redirection
        })
        .catch(error => {
            console.error('Error fetching protected data: ', error);
        })
    }

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
                navigate("/sns-signup", {state: {email: data.email}});
                
                ////
                /*
                if else 문 이용해서 email 백엔드에 존재하면 바로 로그인
                존재하지 않으면 sns-signup으로 이동
                */
               const emailExists = await checkEmailExistence(data.email);

               if(emailExists) {
                    fetchData(); // 이메일 존재하면 보호된 데이터 요청
               } else {
                    navigate("/sns-signup", {state: {email: data.email}});
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