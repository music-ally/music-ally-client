import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Cookies from 'js-cookie';
import { styled } from "styled-components";
import Banner from "../components/banner";
import Carousel from '../components/main-carousel';


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 1280px;
    min-width: 1280px;
`
// 전체 페이지 컨테이너 스타일
const AppContainer = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0 100px;
`;

// 왼쪽 정렬을 위한 스타일
const LeftAlignedContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
`;

// BestReview 제목 스타일
const BestReviewTitle = styled.h2`
  font-size: 75px;
  font-family: 'Bebas', sans-serif;
  color: #BB9D59;
  background: linear-gradient(to right, #E8E1B1, #BB9D59);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  display: flex;
  align-items: center;
  font-weight: 300;
  margin-top: 47px;
  margin-left: 45px;
`;

// BasicReview 제목 스타일
const BasicReviewTitle = styled.h2`
  font-size: 34px;
  font-family: 'Inter', sans-serif;
  color: #BB9D59;
  background: linear-gradient(to right, #E8E1B1, #BB9D59);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  display: flex;
  align-items: center;
  font-weight: 600;
  margin-top: 100px;
  margin-left: 45px;
  margin-bottom: 5px;

`;


// BasicReview와 Pagination 사이의 수직 간격 스타일
const VerticalSpacing = styled.div`
  margin-top: 45px;
  margin-bottom: 55px;
`;

const HorizontalLine = styled.hr`
  width: 1131px;
  border-top: 1px solid #D1D1D1;
  margin: 75px 0;
`;



export default function Home() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const accessToken = queryParams.get('access_token');

    useEffect(() => {
        if (accessToken) {
            Cookies.set('access_token', accessToken, {expires: 1});
        }
    }, [accessToken]);
    

return (
    <Wrapper>
    <AppContainer>
         <Banner />
      <LeftAlignedContainer>
        <BestReviewTitle>Musical Ranking</BestReviewTitle>
      </LeftAlignedContainer>
      <Carousel/>
      <LeftAlignedContainer>
        <BasicReviewTitle>본격 N회차! 회전문을 돌아보자</BasicReviewTitle>
      </LeftAlignedContainer>
      <Carousel/>
      <LeftAlignedContainer>
        <BasicReviewTitle>현생팔아뮤덕살기 님 주변에서 열리는 뮤지컬</BasicReviewTitle>
      </LeftAlignedContainer>
      <Carousel/>
      <LeftAlignedContainer>
        <BasicReviewTitle>믿고 보는 배우 ㅇㅇㅇ의 출연작</BasicReviewTitle>
      </LeftAlignedContainer>
      <Carousel/>
        </AppContainer>
    </Wrapper>
    );
};