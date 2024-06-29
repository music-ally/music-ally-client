import { useLocation } from "react-router-dom";
import GoogleUserInfo from "../components/GoogleUserInfo";
import { useEffect } from "react";
import Cookies from 'js-cookie';
import { styled } from "styled-components";
// import { Wrapper } from "../components/auth-components";
import Banner from "../components/banner";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 1280px;
    min-width: 1280px;
`

export default function Home() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const accessToken = queryParams.get('access_token');

    useEffect(() => {
        if (accessToken) {
            Cookies.set('access_token', accessToken, {expires: 1});
        }
    }, [accessToken]);
    
    return (
        <Wrapper>
            <Banner />
            <h1> 로그인 테스트 </h1>
            {/* {accessToken && <GoogleUserInfo accessToken = {accessToken}/>} */}
            <GoogleUserInfo />
        </Wrapper>
    );
}