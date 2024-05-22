import { useLocation } from "react-router-dom";
import GoogleUserInfo from "../components/GoogleUserInfo";
import { useEffect } from "react";
import Cookies from 'js-cookie';

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
        <>
            <h1> 로그인 테스트 </h1>
            {/* {accessToken && <GoogleUserInfo accessToken = {accessToken}/>} */}
            <GoogleUserInfo />
        </>
    );
}