import React from 'react';
import KakaoLogin from "react-kakao-login";
import KakaoButton from '../components/kakao-btn';

interface KakaoResponse{
    response:{
        access_token:string;
    }
}

interface KakaoError{
    error:string;
    error_description:string;
}

const Kakao:React.FC=()=>{
    const kakaoClientId:string=process.env.VITE_KAKAO_JAVASCRIPT_KEY;
    const kakaoOnSuccess = async(data:KakaoResponse)=>{
        console.log(data);
        const idToken = data.response.access_token;
    }

    const kakaoOnFailure = (error:KakaoError)=>{
        console.log(error);
    };
    return(
            <KakaoLogin
            token={kakaoClientId}
            onSuccess={kakaoOnSuccess}
            onFail={kakaoOnFailure}
            render={({ onClick }) => <KakaoButton onClick={onClick} />}/>
    )
}

export default Kakao;