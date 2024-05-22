import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
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

// export const GOOGLE_REST_API_KEY = '546543909975-l5o9sl09237bkj369r10u5tb7ssqt0qf.apps.googleusercontent.com'

export default function GoogleButton(){
    
    const navigate = useNavigate();
    const onClick = () => {
        // // redirect to the home page
        // navigate("/");
    };

    const login = useGoogleLogin({
        onSuccess: (credentialResponse) => {
            try {
                console.log(credentialResponse.access_token);
                // navigate("/");
                navigate(`/?access_token=${encodeURIComponent(credentialResponse.access_token)}`);
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