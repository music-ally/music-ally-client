import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import WriteReview from "../components/writereview";
import MusicalTicket from "../components/musicalticket";
import Actorcircle from "../components/actorcircle";
import MusicalSearchModal from "../components/musicalsearch";
import ActorSearchModal from "../components/actorsearch";

const AppContainer = styled.div`
  background-image: url("/reviewpage.png");
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
  font-family: "Bebas", sans-serif;
  color: #bb9d59;
  background: linear-gradient(to right, #e8e1b1, #bb9d59);
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
  font-family: "Bebas", sans-serif;
  color: #bb9d59;
  background: linear-gradient(to right, #e8e1b1, #bb9d59);
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
  cursor: pointer;
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

interface Musical {
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

interface WriteReviewPageProps {
  userName: string;
  userHandle: string;
  userProfileImage: string;
}

const WriteReviewPage: React.FC = () => {
  const navigate = useNavigate();
  const { review_id } = useParams<{ review_id: string }>();
  const [tickets, setTickets] = useState<Musical[]>([]);
  const [actors, setActors] = useState<Actor[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [isActorSearchModalOpen, setIsActorSearchModalOpen] =
    useState<boolean>(false);
  const [selectedTicket, setSelectedTicket] = useState<Musical | null>(null);
  const [selectedActor, setSelectedActor] = useState<Actor | null>(null);
  const [fear, setFear] = useState<number>(0);
  const [sensitivity, setSensitivity] = useState<number>(0);
  const [violence, setViolence] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [userHandle, setUserHandle] = useState<string>("");
  const [userProfileImage, setUserProfileImage] = useState<string>("");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const accessToken = Cookies.get("access_token");

        if (!accessToken) {
          console.error("No access token found");
          return;
        }

        const profileResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/review/writer/profile`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const profileData = profileResponse.data.data;
        setUserProfileImage(profileData.reviewer_profile_image);
        setUserName(profileData.reviewer_nickname);
        setUserHandle(profileData.reviewer_email);

        setIsLoading(false);
      } catch (error) {
        console.error("데이터 가져오기 오류:", error);
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  useEffect(() => {
    if (review_id) {
      const fetchReviewData = async () => {
        try {
          const accessToken = Cookies.get("access_token");

          if (!accessToken) {
            console.error("No access token found");
            return;
          }

          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/review/${review_id}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          const reviewData = response.data;

          setFear(reviewData.fear);
          setSensitivity(reviewData.sensitivity);
          setViolence(reviewData.violence);
          setComment(reviewData.content);

          const ticketResponse = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/musical/${
              reviewData.musical_id
            }`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          setSelectedTicket(ticketResponse.data);

          const actorResponse = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/actor/${reviewData.actor_id}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          setSelectedActor(actorResponse.data);
        } catch (error) {
          console.error("리뷰 데이터 가져오기 오류:", error);
        }
      };

      fetchReviewData();
    }
  }, [review_id]);

  const handleReviewChange = (
    fear: number,
    sensitivity: number,
    violence: number,
    content: string
  ) => {
    setFear(fear);
    setSensitivity(sensitivity);
    setViolence(violence);
    setComment(content);
  };

  const handleSaveReview = async () => {
    try {
      const accessToken = Cookies.get("access_token");

      if (!accessToken) {
        console.error("No access token found");
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/review/`,
        {
          fear,
          sensitivity,
          violence,
          content: comment,
          musical_id: selectedTicket?.musical_id,
          actor_id: selectedActor?.actor_id,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data.success) {
        alert("리뷰 저장 성공");
        navigate("/seereview");
      } else {
        alert("리뷰 저장 실패");
      }
    } catch (error) {
      console.error("리뷰 저장 중 오류 발생:", error);
      alert("리뷰 저장 실패");
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
      <MusicalTicket tickets={selectedTicket ? [selectedTicket] : []} />
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
          selectedActor && (
            <Actorcircle
              key={selectedActor.actor_id}
              profile_image={selectedActor.profile_image}
              actor_name={selectedActor.actor_name}
            />
          )
        )}
      </LeftAlignedContainer>
      <LeftAlignedContainer>
        <Title>REVIEW</Title>
      </LeftAlignedContainer>
      <VerticalSpacing>
        <WriteReview
          onChange={handleReviewChange}
          userName={userName}
          userHandle={userHandle}
          userProfileImage={userProfileImage}
        />
      </VerticalSpacing>
      <RightAlignedContainer>
        <RightAlignedContent>
          <ConfirmIcon
            src="/confirm.png"
            alt="Confirm Icon"
            onClick={handleSaveReview}
          />
        </RightAlignedContent>
      </RightAlignedContainer>

      {isSearchModalOpen && (
        <MusicalSearchModal
          musicals={tickets}
          isOpen={isSearchModalOpen}
          onSelect={(ticket) => {
            setSelectedTicket(ticket);
            setIsSearchModalOpen(false);
          }}
          onClose={() => setIsSearchModalOpen(false)}
        />
      )}

      {isActorSearchModalOpen && (
        <ActorSearchModal
          actors={actors}
          isOpen={isActorSearchModalOpen}
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
