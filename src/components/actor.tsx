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
        // Commented out fetch call for backend connection
        // fetch('/actor/musical/:num')
        //     .then(response => response.json())
        //     .then(data => {
        //         setTitle(data.title);
        //         setMusicalId(data.id);
        //     });

        // Dummy data
        const musicals = [
            { musicalId: 1, title: '레미제라블' },
            { musicalId: 2, title: '오페라의 유령' },
            { musicalId: 3, title: '지킬 앤 하이드' },
            { musicalId: 4, title: '위키드' },
            { musicalId: 5, title: '캐츠' }
        ];

        const randomMusical = musicals[Math.floor(Math.random() * musicals.length)];
        setTitle(randomMusical.title);
        setMusicalId(randomMusical.musicalId);
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
