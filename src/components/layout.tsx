import {Outlet} from 'react-router-dom';
import styled from 'styled-components';

// 상단 네비게이션 바 등

const FixedWidthWrapper = styled.div`
    max-width: 1280px;
    margin: 0 auto;
    padding: 0;
    background-color: wheat; // 임시로 구분하기 위해 색상 설정함
`

export default function Layout(){
    return (
        <FixedWidthWrapper>
            <h2> layout </h2>
            <Outlet />
        </FixedWidthWrapper>
    )
}