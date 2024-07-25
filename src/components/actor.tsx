import React from 'react';
import ReviewCarousel from './reviewcarousel';
import styled from 'styled-components';

const Title = styled.h1`
    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    line-height: 134.698%; 
    letter-spacing: 1.02px;
    background: linear-gradient(90deg, #E8E1B1 0%, #BB9D59 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom : 15px; 
`;

const Container = styled.div`
    margin-top : 200px;
`

const Actor: React.FC = () => {
    return (
        <Container>
            <Title>레미제라블 출연진을 한눈에 보기!</Title>
            <ReviewCarousel />

            <Title>가수 출신 뮤지컬 배우 누가 있을까?</Title>
            <ReviewCarousel />

            <Title>2030 최애 배우 모아보기</Title>
            <ReviewCarousel />
        </Container>
    );
};

export default Actor;