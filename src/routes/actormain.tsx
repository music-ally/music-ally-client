import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import BasicReview from "../components/basicreview";
import MusicalCarousel from "../components/musicalcarousel";
import Actorprofile from "../components/actorprofile";

const AppContainer = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
  padding: 0px 74px 100px;
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
  display: flex;
  align-items: center;
`;

const VerticalSpacing = styled.div<{
  topMargin?: number;
  bottomMargin?: number;
}>`
  margin-top: ${({ topMargin }) => topMargin || 10}px;
  margin-bottom: ${({ bottomMargin }) => bottomMargin || 0}px;
`;

const HorizontalLine = styled.hr`
  width: 1131px;
  border-top: 1px solid #d1d1d1;
  margin: 75px 0;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageNumber = styled.span<{ active: boolean }>`
  padding: 10px;
  margin: 0 5px;
  cursor: pointer;
  font-size: 20px;
  color: ${({ active }) => (active ? "#E8E1B1" : "#A7A7A7")};
  background: transparent; /* 배경색 투명 */
  border-radius: 5px;
  transition: color 0.3s;

  &:hover {
    color: #e8e1b1;
  }
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

const ActorDetail: React.FC = () => {
  const { actorId } = useParams<{ actorId: string }>();
  const [actor, setActor] = useState<Actor | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");

        if (!accessToken) {
          console.error("No access token found");
          return;
        }

        const actorResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/actor/${actorId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setActor(actorResponse.data.data);
        console.log("Actor data:", actorResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [actorId]);

  if (!actor) {
    return <div>Loading...</div>;
  }

  // 페이지네이션 로직
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = actor.reviews.slice(
    indexOfFirstReview,
    indexOfLastReview
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(actor.reviews.length / reviewsPerPage);

  return (
    <AppContainer>
      <Actorprofile actor={actor} />
      <LeftAlignedContainer>
        <Title>출연작</Title>
      </LeftAlignedContainer>
      <VerticalSpacing topMargin={30}>
        <MusicalCarousel works={actor.works} />
      </VerticalSpacing>
      <HorizontalLine />
      <LeftAlignedContainer>
        <Title>연관 리뷰</Title>
      </LeftAlignedContainer>
      <VerticalSpacing topMargin={30}>
        {currentReviews.length > 0 ? (
          <>
            {currentReviews.map((review) => (
              <VerticalSpacing key={review.review_id}>
                <BasicReview review={review} />
              </VerticalSpacing>
            ))}
            <PaginationContainer>
              {[...Array(totalPages).keys()].map((page) => (
                <PageNumber
                  key={page + 1}
                  onClick={() => handlePageChange(page + 1)}
                  active={currentPage === page + 1}
                >
                  {page + 1}
                </PageNumber>
              ))}
            </PaginationContainer>
          </>
        ) : (
          <div>No reviews available.</div>
        )}
      </VerticalSpacing>
    </AppContainer>
  );
};

export default ActorDetail;
