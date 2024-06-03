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


export default function GoogleButton(){
    
    const navigate = useNavigate();
    const onClick = () => {
        // // redirect to the home page
        // navigate("/");
    };

    const login = useGoogleLogin({
        onSuccess: async (credentialResponse) => {
            try {
                console.log(credentialResponse.access_token);
                // 쿠키에 토큰 저장
                Cookies.set('access_token', credentialResponse.access_token, {expires: 1}); // 1일동안 유효
                // navigate("/");

                // 토큰으로 사용자 정보 가져오기
                const {data} = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: {
                        Authorization: `Bearer ${credentialResponse.access_token}`,
                    },
                });

                // 일단 지금은 백엔드 소통 않고 받은 이메일 정보 직접 이동 처리
                navigate("/sns-signup", {state: {email: data.email}});


            /*
                // 추후 백엔드에 쿠키를 포함한 요청 보내기 코드
                axios.get('http://백엔드도메인.com/api/protected', {
                    withCredentials: true // 쿠키 포함 요청
                })
                .then(response => {
                    console.log('Protected data: ', response.data);
                    navigate("/"); //요청 성공 후 홈으로 redirection
                })
                .catch(error => {
                    console.error('Error fetching protected data: ', error);
                })
            */

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