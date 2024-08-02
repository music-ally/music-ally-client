import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function ProtectedRoute({
    children,
} : {
    children: React.ReactNode;
}){
    // 쿠키나 로컬 스토리지에서 accesstoken null 이면 로그인화면

    // const token = Cookies.get("access_token"); // 쿠키에서 토큰 확인
    const token = localStorage.getItem("access_token"); // 로컬스토리지에서 토큰 확인

    if (!token) {
        return <Navigate to="/login" />;
    }
    return children; // 보호된 컴포넌트 반환
}