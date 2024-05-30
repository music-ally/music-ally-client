import React from "react";
import KakaoLogin from "react-kakao-login";
import axios from "axios";
import KakaoButton from "../components/kakao-btn";

const KakaoOauth: React.FC=()=>{
    const handleSuccess = async(response:any)=>{
        const {code} =response;
        try{
            // const res=await axios.post('http://localhost:3000/login',{code})
            // console.log('Access Token:',res.data.access_token);
        }catch(error){
            console.error(error);
        }
    };

    const handleFailure=(error:any)=>{
        console.error(error);
    };

    return(
        <KakaoLogin
            token={import.meta.env.VITE_REST_API_KEY}
            onSuccess={handleSuccess}
            onFailure={handleFailure}
            getProfile={true}
            useLoginForm={true}
            render={
                (props)=>(
                    <KakaoButton onClick={props.onClick}/>
                )
            }
        />
    )
}

export default KakaoOauth;