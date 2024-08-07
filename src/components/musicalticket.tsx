import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

// 타입 정의
interface MusicalData {
  musical_id: string;
  poster_image: string;
  musical_name: string;
  theater_name: string;
  watch_at: string;
}

interface TicketProps {
  musical_id: string;
  buyerName: string;
  showTime: string;
}

const defaultPoster = "/default-poster.png";
const defaultMusicalName = "MUSICALLY";
const defaultPlace = "-";
const defaultDate = "-";
const defaultName = "예매자명: -";

const Ticket = styled.div`
  display: flex;
  width: 1082px;
  height: 400px;
  background-color: black;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  margin: 20px 0 55px 0;
`;

const Poster = styled.img`
  width: 282px;
  height: 400px;
  object-fit: cover;
`;

const DetailsContainer = styled.div`
  width: 800px;
  height: 400px;
  position: relative;
  overflow: hidden;
`;

const Details = styled.div<{ backgroundImage?: string }>`
  width: 120%;
  height: 120%;
  background-image: ${({ backgroundImage }) =>
    `url(${backgroundImage || "/empty.png"})`};
  background-size: cover;
  background-position: center bottom;
  filter: blur(4px);
  position: absolute;
  top: -10%;
  left: -10%;
  z-index: 1;
`;

const DarkOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2;
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  z-index: 3;
`;

const TextOverlay = styled.div`
  position: absolute;
  top: 40px;
  left: 20px;
  color: white;
  z-index: 4;
  text-align: left;
  padding: 20px;
  box-sizing: border-box;
  width: calc(100% - 40px);
`;

const Title = styled.h1`
  font-size: 47px;
  font-family: "Inter", sans-serif;
  font-weight: 600;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  color: #f2f2f2;
  margin: 0;
`;

const Info = styled.p`
  font-size: 24px;
  font-family: "Inter", sans-serif;
  font-weight: 600;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  color: #f1f1f1;
  margin: 20px 0;
`;

const BuyerInfo = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  display: flex;
  justify-content: space-between;
  font-family: "Inter", sans-serif;
  color: #888888;
  font-size: 16px;
  font-weight: 600;
  z-index: 4;
`;

const BuyerName = styled.p`
  margin: 0;
`;

const Time = styled.p`
  margin: 0;
`;

const MusicalTicket: React.FC<TicketProps> = ({
  musical_id,
  buyerName,
  showTime,
}) => {
  const [ticketData, setTicketData] = useState<MusicalData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("musical_id:", musical_id);
    console.log("data", ticketData);

    if (!musical_id) {
      setError("Invalid musical ID");
      setLoading(false);
      return;
    }

    const fetchMusicalData = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
          throw new Error("No access token found");
        }

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/musical/${musical_id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log("API response:", response);
        setTicketData(response.data.data);
      } catch (err) {
        console.error("Failed to fetch ticket data:", err);
        setError("Failed to fetch ticket data");
      } finally {
        setLoading(false);
      }
    };

    fetchMusicalData();
  }, [musical_id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Ticket>
      <Poster src={ticketData?.poster_image || defaultPoster} alt="Poster" />
      <DetailsContainer>
        <Details backgroundImage={ticketData?.poster_image} />
        <DarkOverlay />
        <GradientOverlay />
        <TextOverlay>
          <Title>{ticketData?.musical_name}</Title>
          <Info>장 소 : {ticketData?.theater_name}</Info>
          <Info>
            일 시 :{" "}
            {ticketData?.watch_at
              ? new Date(ticketData.watch_at).toLocaleDateString()
              : defaultDate}
          </Info>
        </TextOverlay>
        <BuyerInfo>
          <BuyerName>예매자명 : {buyerName}</BuyerName>
          <Time>{showTime || new Date().toLocaleString()}</Time>
        </BuyerInfo>
      </DetailsContainer>
    </Ticket>
  );
};

export default MusicalTicket;
