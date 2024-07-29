import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom'; // useHistory를 useNavigate로 변경
import WriteReview from '../components/wirtereview';
import MusicalTicket from '../components/musicalticket';
import Actorcircle from '../components/actorcircle';
import MusicalSearchModal from '../components/musicalsearch'; // 뮤지컬 검색 모달 컴포넌트 임포트
import ActorSearchModal from '../components/actorcarousel'; // 배우 검색 모달 컴포넌트 임포트

const AppContainer = styled.div`
  background-image: url('/reviewpage.png');
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
  margin-left: 20px;
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

const SearchIcon1 = styled.img`
  width: 80px;
  height: 80px;
  cursor: pointer;
`;

const SearchIcon2 = styled.img`
  width: 50px;
  height: 50px;
  cursor: pointer;
`;

const ConfirmIcon = styled.img`
  width: 30px;
  height: 29px;
  cursor: pointer; /* 클릭 가능 표시 */
`;

const RightAlignedContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 20px;
  margin-left: -80px;
`;

const RightAlignedContent = styled.div`
  display: flex;
  align-items: center;
`;

interface MusicalData {
  musical_id: string;
  musical_name: string;
  theater_name: string;
  watch_at: string;
  poster_image: string;
}

interface Actor {
  actor_id: string;
  profile_image: string;
  actor_name: string;
}

const WriteReviewPage: React.FC = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const { review_id } = useParams<{ review_id: string }>(); // URL 파라미터에서 review_id 가져오기
  const [tickets, setTickets] = useState<MusicalData[]>([]);
  const [actors, setActors] = useState<Actor[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [isActorSearchModalOpen, setIsActorSearchModalOpen] = useState<boolean>(false);
  const [selectedTicket, setSelectedTicket] = useState<MusicalData | null>(null);
  const [selectedActor, setSelectedActor] = useState<Actor | null>(null);
  const [fear, setFear] = useState<number>(0);
  const [sensitivity, setSensitivity] = useState<number>(0);
  const [violence, setViolence] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [reviewerName, setReviewerName] = useState<string>('');
  const [reviewerHandle, setReviewerHandle] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ticketResponse = await axios.get('/api/musical');
        const ticketsData: MusicalData[] = ticketResponse.data?.data || [];
        setTickets(ticketsData);

        const actorResponse = await axios.get('/api/actor');
        const actorsData: Actor[] = actorResponse.data?.data?.actors || [];
        setActors(actorsData);

        setIsLoading(false);
      } catch (error) {
        console.error('데이터 가져오기 오류:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (review_id) {
      const fetchReviewData = async () => {
        try {
          const response = await axios.get(`/api/review/${review_id}`);
          const reviewData = response.data;

          setFear(reviewData.fear);
          setSensitivity(reviewData.sensitivity);
          setViolence(reviewData.violence);
          setComment(reviewData.content);
          setReviewerName(reviewData.reviewer_nickname);
          setReviewerHandle(reviewData.reviewer_email); // Assuming email as handle for this example

          // Set selected musical and actor if applicable
          const ticketResponse = await axios.get(`/api/musical/${reviewData.musical_id}`);
          setSelectedTicket(ticketResponse.data);

          const actorResponse = await axios.get(`/api/actor/${reviewData.actor_id}`);
          setSelectedActor(actorResponse.data);
        } catch (error) {
          console.error('리뷰 데이터 가져오기 오류:', error);
        }
      };

      fetchReviewData();
    }
  }, [review_id]);

  const handleReviewChange = (fear: number, sensitivity: number, violence: number, content: string) => {
    setFear(fear);
    setSensitivity(sensitivity);
    setViolence(violence);
    setComment(content);
  };

  const handleSaveReview = async () => {
    try {
      const response = await axios.post('/api/review', {
        fear,
        sensitivity,
        violence,
        content: comment,
        musical_id: selectedTicket?.musical_id,
        actor_id: selectedActor?.actor_id,
      });

      if (response.data.success) {
        alert('리뷰 저장 성공');
        navigate('/seereview'); // 리뷰 저장 후 페이지 이동
      } else {
        alert('리뷰 저장 실패');
      }
    } catch (error) {
      console.error('리뷰 저장 중 오류 발생:', error);
      alert('리뷰 저장 실패');
    }
  };

  return (
    <AppContainer>
      <LeftAlignedContainer>
        <MainTitle>
          MUSICAL
          <SearchIcon1 
            src="/search.png" 
            alt="Search Icon" 
            onClick={() => setIsSearchModalOpen(true)}
          />
        </MainTitle>
      </LeftAlignedContainer>
      <MusicalTicket tickets={selectedTicket ? [selectedTicket] : tickets} />
      <LeftAlignedContainer>
        <Title>
          ACTOR
          <SearchIcon2 
            src="/search.png" 
            alt="Search Icon" 
            onClick={() => setIsActorSearchModalOpen(true)}
          />
        </Title>
      </LeftAlignedContainer>
      <LeftAlignedContainer>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          actors.map((actor) => (
            <Actorcircle
              key={actor.actor_id}
              profile_image={actor.profile_image}
              actor_name={actor.actor_name}
            />
          ))
        )}
      </LeftAlignedContainer>
      <LeftAlignedContainer>
        <Title>
          REVIEW
        </Title>
      </LeftAlignedContainer>
      <VerticalSpacing>
        <WriteReview 
          onChange={handleReviewChange} 
          userName={reviewerName} 
          userHandle={reviewerHandle} 
        />
      </VerticalSpacing>
      <RightAlignedContainer>
        <RightAlignedContent>
          <ConfirmIcon 
            src="/confirm.png" 
            alt="Confirm Icon" 
            onClick={handleSaveReview} // ConfirmIcon 클릭 시 리뷰 저장
          />
        </RightAlignedContent>
      </RightAlignedContainer>

      {isSearchModalOpen && (
        <MusicalSearchModal 
          onSelect={(ticket) => {
            setSelectedTicket(ticket);
            setIsSearchModalOpen(false);
          }}
          onClose={() => setIsSearchModalOpen(false)}
        />
      )}

      {isActorSearchModalOpen && (
        <ActorSearchModal 
          onSelect={(actor) => {
            setSelectedActor(actor);
            setIsActorSearchModalOpen(false);
          }}
          onClose={() => setIsActorSearchModalOpen(false)}
        />
      )}
    </AppContainer>
  );
};

export default WriteReviewPage;
