import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Actorcircle from '../components/actorcircle';
import MusicalTicket from '../components/musicalticket';
import Cookies from 'js-cookie';

// 스타일 컴포넌트
const AppContainer = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
  padding: 162px 74px 100px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LeftAlignedContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
`;

const MainTitle = styled.h1`
  font-size: 75px;
  font-family: 'Bebas', sans-serif;
  color: #BB9D59;
  background: linear-gradient(to right, #E8E1B1, #BB9D59);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 6px 0;
  display: flex;
  align-items: center;
  font-weight: 300;
`;

const Title = styled.h2`
  font-size: 52px;
  font-family: 'Bebas', sans-serif;
  color: #BB9D59;
  background: linear-gradient(to right, #E8E1B1, #BB9D59);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 6px 0;
  display: flex;
  align-items: center;
  font-weight: 300;
`;

const VerticalSpacing = styled.div`
  margin-top: 20px;
  margin-bottom: 30px;
`;

const LeftAlignedActorContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 50px;
  gap: 32px;
`;

const ConfirmIcon = styled.img`
  width: 30px;
  height: 29px;
  cursor: pointer;
`;

const RightAlignedContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 30px;
  margin-left: -30px;
`;

const EditContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  max-width: 1000px; // 최대 너비 설정
  display: flex; // 플렉스 박스 사용
  flex-wrap: wrap; // 항목들이 줄 바꿈을 하도록 설정
  gap: 20px; // 항목들 간의 간격 설정
`;

const TextArea = styled.textarea`
  width: 1000px; // 가로 사이즈를 800으로 고정
  height: 150px; // 높이 설정
  margin-bottom: 20px;
  padding: 10px;
  font-size: 16px;
  background: #FFFCE5;
  border: 10px solid #500908; // 빨간색 테두리
  border-radius: 5px;
  resize: none; // 크기 조절 비활성화
  box-shadow: 0 0 0 0px #500908; // 빨간색 그림자
`;

const InputContainer = styled.div`
  background: #500908; // 배경색 설정
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #500908; // 테두리 색상 추가
  flex: 1; // 항목이 가능한 공간을 차지하도록 설정
  min-width: 200px; // 최소 너비 설정
`;

const Label = styled.label`
  display: block;
  font-size: 16px;
  margin-bottom: 5px;
  color: #FFFCE5;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  background: #FFFCE5;
  border-radius: 4px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

// 상수 정의
const MIN_RATING = 0;
const MAX_RATING = 5;

// 타입 정의
interface Actor {
  actor_id: string;
  profile_image: string;
  actor_name: string;
}

interface Musical {
  musical_id: string;
  musical_name: string;
  theater_name: string;
  watch_at: string;
  poster_image: string;
}

interface ReviewData {
  review_id: string;
  musical: Musical;
  actors: Actor[];
  reviewer_profile_image: string | null;
  reviewer_nickname: string;
  reviewer_email: string;
  like_num: number;
  is_like: boolean;
  violence: number;
  fear: number;
  sensitivity: number;
  content: string;
  create_at: string;
}

const SeeReviewPage: React.FC = () => {
  const { reviewId } = useParams<{ reviewId: string }>();
  const [reviewData, setReviewData] = useState<ReviewData | null>(null);
  const [updatedContent, setUpdatedContent] = useState<string>('');
  const [updatedViolence, setUpdatedViolence] = useState<number>(0);
  const [updatedFear, setUpdatedFear] = useState<number>(0);
  const [updatedSensitivity, setUpdatedSensitivity] = useState<number>(0);
  const [error, setError] = useState<string | null>(null); // 에러 메시지 상태
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        const accessToken = localStorage.getItem("access_token"); // 로컬 스토리지에서 access_token 가져오기

        if (!accessToken) {
          console.error("No access token found");
          return;
        }

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/review/${reviewId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.data.success) {
          const data = response.data.data;
          setReviewData(data);
          setUpdatedContent(data.content);
          setUpdatedViolence(data.violence);
          setUpdatedFear(data.fear);
          setUpdatedSensitivity(data.sensitivity);
        } else {
          console.error('리뷰 데이터 조회 실패:', response.data.message);
          setError('리뷰 데이터 조회 실패');
        }
      } catch (error) {
        console.error('리뷰 데이터 조회 중 오류 발생:', error);
        setError('리뷰 데이터 조회 중 오류 발생');
      }
    };

    fetchReviewData();
  }, [reviewId]);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<number>>) => (event: React.ChangeEvent<HTMLInputElement>) => {
    // 입력값을 숫자로 변환하고 최대값을 5로 제한
    const value = Math.max(MIN_RATING, Math.min(MAX_RATING, Number(event.target.value)));
    setter(value);
  };

  const handleSaveEdit = async () => {
    try {
      const accessToken = Cookies.get("access_token");

      if (!accessToken) {
        console.error("No access token found");
        return;
      }

      const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/review/${reviewId}`, {
        content: updatedContent,
        violence: updatedViolence,
        fear: updatedFear,
        sensitivity: updatedSensitivity
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.data.success) {
        alert('리뷰 수정 성공');
        setReviewData(prevData => prevData ? { ...prevData, content: updatedContent, violence: updatedViolence, fear: updatedFear, sensitivity: updatedSensitivity } : null);
        navigate(-1); // 이전 페이지로 돌아가기
      } else {
        alert('리뷰 수정 실패');
      }
    } catch (error) {
      console.error('리뷰 수정 중 오류 발생:', error);
      setError('리뷰 수정 중 오류 발생');
    }
  };

  if (!reviewData) return <div>Loading...</div>;

  const { musical, actors, reviewer_profile_image, reviewer_nickname, reviewer_email, create_at } = reviewData;

  return (
    <AppContainer>
      <LeftAlignedContainer>
        <MainTitle>MUSICAL</MainTitle>
      </LeftAlignedContainer>
      <MusicalTicket
        tickets={[{
          musical_id: musical.musical_id,
          musical_name: musical.musical_name,
          theater_name: musical.theater_name,
          watch_at: musical.watch_at,
          poster_image: musical.poster_image
        }]}
        buyerName={reviewer_nickname}
        showTime={new Date(create_at).toLocaleString()}
      />
      <LeftAlignedContainer>
        <Title>ACTOR</Title>
      </LeftAlignedContainer>
      <LeftAlignedActorContainer>
        {actors.map(actor => (
          <Actorcircle
            key={actor.actor_id}
            profile_image={actor.profile_image}
            actor_name={actor.actor_name}
          />
        ))}
      </LeftAlignedActorContainer>
      <LeftAlignedContainer>
        <Title>REVIEW</Title>
      </LeftAlignedContainer>
      <VerticalSpacing>
        <EditContainer>
          <InputContainer>
            <Label htmlFor="violence">폭력성</Label>
            <Input
              type="number"
              id="violence"
              value={updatedViolence}
              onChange={handleInputChange(setUpdatedViolence)}
              min={MIN_RATING}
              max={MAX_RATING}
            />
          </InputContainer>
          <InputContainer>
            <Label htmlFor="fear">공포</Label>
            <Input
              type="number"
              id="fear"
              value={updatedFear}
              onChange={handleInputChange(setUpdatedFear)}
              min={MIN_RATING}
              max={MAX_RATING}
            />
          </InputContainer>
          <InputContainer>
            <Label htmlFor="sensitivity">선정성</Label>
            <Input
              type="number"
              id="sensitivity"
              value={updatedSensitivity}
              onChange={handleInputChange(setUpdatedSensitivity)}
              min={MIN_RATING}
              max={MAX_RATING}
            />
          </InputContainer>
          {error && <div style={{ color: 'red', marginBottom: '20px' }}>{error}</div>} {/* 에러 메시지 표시 */}
          <TextArea value={updatedContent} onChange={e => setUpdatedContent(e.target.value)} />
          <RightAlignedContainer>
            <ConfirmIcon
              src="/confirm.png"
              alt="Save Icon"
              onClick={handleSaveEdit}
            />
          </RightAlignedContainer>
        </EditContainer>
      </VerticalSpacing>
    </AppContainer>
  );
};

export default SeeReviewPage;
