import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import BasicReview from "../components/basicreview";
import MusicalCarousel from "../components/musicalcarousel";
import Actorprofile from "../components/actorprofile";
import ActorInfo from "../components/actorinfo"; // ActorInfo 컴포넌트 가져오기

const AppContainer = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
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

const Title = styled.h2`
  font-size: 34px;
  font-family: "Inter", sans-serif;
  color: #ebebeb;
  margin: 0 74px;
  display: flex;
  align-items: center;
`;

const VerticalSpacing = styled.div<{
  topMargin?: number;
  bottomMargin?: number;
}>`
  margin-top: ${({ topMargin }) => topMargin || 45}px;
  margin-bottom: ${({ bottomMargin }) => bottomMargin || 55}px;
`;

const HorizontalLine = styled.hr`
  width: 1131px;
  border-top: 1px solid #d1d1d1;
  margin: 75px 0;
`;

interface Musical {
  musical_id: string;
  poster_image: string;
}

interface Review {
  review_id: string;
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

interface Actor {
  actor_id: string;
  profile_image: string;
  actor_name: string;
  birthday: string;
  debut: string;
  agency: string;
  job: string;
  physical: string;
  works_count: number;
  works: Musical[];
  reviews: Review[];
}

const App: React.FC = () => {
  const [actor, setActor] = useState<Actor | null>(null);
  const [selectedActorId, setSelectedActorId] = useState<string | null>(null);

  const handleActorClick = (actor_id: string) => {
    setSelectedActorId(actor_id);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedActorId) return;

      try {
        const accessToken = Cookies.get("access_token");

        if (!accessToken) {
          console.error("No access token found");
          return;
        }

        const actorResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/actor/${selectedActorId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setActor(actorResponse.data.data);
        console.log("Actor data:", actorResponse.data.data); // 데이터 확인
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedActorId]);

  return (
    <AppContainer>
      {/* ActorInfo 컴포넌트 렌더링 */}
      <ActorInfo onActorClick={handleActorClick} actors={[]} />

      {actor ? (
        <>
          <Actorprofile actor={actor} />
          <LeftAlignedContainer>
            <Title>출연작</Title>
          </LeftAlignedContainer>
          <VerticalSpacing topMargin={30}>
            <MusicalCarousel works={actor.works} />
          </VerticalSpacing>
          <HorizontalLine />
          <VerticalSpacing topMargin={30}>
            {actor.reviews && actor.reviews.length > 0 ? (
              actor.reviews.map((review) => (
                <VerticalSpacing key={review.review_id}>
                  <BasicReview review={review} />
                </VerticalSpacing>
              ))
            ) : (
              <div>No reviews available.</div>
            )}
          </VerticalSpacing>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </AppContainer>
  );
};

export default App;
