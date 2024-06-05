import {Outlet} from 'react-router-dom';

// 상단 네비게이션 바 등

export default function Layout(){
    return (
        <>
        <h2> layout </h2>
            <Outlet />
        </>
    )
}