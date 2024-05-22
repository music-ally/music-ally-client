import axios from "axios";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";

interface UserInfo {
    name? : string;
    email? : string;
    profile? : string;
}

export default function GoogleUserInfo(){
    const [ userInfo, setUserInfo ] = useState<UserInfo>({});

    useEffect(() => {
        const accessToken = Cookies.get('access_token');

        if (accessToken) {
            const getUserInfo = async() => {
                try {
                    const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`
                        }
                    });
                    setUserInfo({
                        name: response.data.name,
                        email: response.data.email,
                        profile: response.data.picture,
                    });
    
                    console.log('UserEmail : ', response.data.email);
                    console.log(response.data);
                } catch (error) {
                    console.error(error);
                }
            };
            getUserInfo();
        }
    }, []);

    return (
        <div>
            {userInfo.email && <h1>{userInfo.email}</h1>}
            {userInfo.name && <h1>{userInfo.name}</h1>}
            {userInfo.profile && <img src={userInfo.profile} alt="Profile" />}
        </div>
    )
}