import React, { useEffect, useState } from 'react';
import ActorCarousel from './actorcarousel';
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
    margin-bottom: 15px; 
`;

const Container = styled.div`
    margin-top: 200px;
`;

const Actor: React.FC = () => {
    const [title, setTitle] = useState('');
    const [musicalId, setMusicalId] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.VITE_BACKEND_URL}/actor/musical/:num`);
                const data = await response.json();
                setTitle(data.title);
                setMusicalId(data.id);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Container>
            <Title>{title} 출연진을 한눈에 보기!</Title>
            <ActorCarousel musicalId={musicalId} />

            <Title>가수 출신 뮤지컬 배우 모아보기</Title>
            <ActorCarousel musicalId={musicalId}/>

            <Title>최근 핫한 배우 모아보기</Title>
            <ActorCarousel musicalId={musicalId}/>
        </Container>
    );
};

export default Actor;
