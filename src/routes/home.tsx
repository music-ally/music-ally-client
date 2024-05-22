import { useLocation } from "react-router-dom";
import GoogleUserInfo from "../components/GoogleUserInfo";

export default function Home() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const accessToken = queryParams.get('access_token');


    return (
        <>
            <h1> 로그인 테스트 </h1>
            
            {accessToken && <GoogleUserInfo accessToken = {accessToken}/>}
        </>
    );
}