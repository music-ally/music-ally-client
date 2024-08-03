import React, { useEffect, useState } from "react";
import ActorCarousel from "./actorcarousel";
import styled from "styled-components";
import token from "./token";
import { AxiosError } from "axios";

const Title = styled.h1`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  line-height: 134.698%;
  letter-spacing: 1.02px;
  background: linear-gradient(90deg, #e8e1b1 0%, #bb9d59 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 15px;
`;

const Container = styled.div`
  margin-top: 200px;
`;

const Actor: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [actorIds, setActorIds] = useState<string[]>([]);
  const [singerActors, setSingerActors] = useState<any[]>([]);
  const [hotActors, setHotActors] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async (endpoint: string, setter: Function) => {
    try {
      const response = await token.get(endpoint);
      console.log(`Data from ${endpoint}:`, response.data);
      setter(response.data.data);
    } catch (error) {
      const axiosError = error as AxiosError; // 타입 캐스팅
      console.error(
        "데이터 가져오기 오류:",
        axiosError.response ? axiosError.response.data : axiosError.message
      );
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        await fetchData(`/actor/musical`, (data: any) => {
          setTitle(data.musical_name);
          setActorIds(data.actors.map((actor: any) => actor.actor_id)); // 배우 ID 설정
        });
        await fetchData(`/actor/job`, (data: any) => {
          setSingerActors(data.actors || []);
        });
        await fetchData(`/actor/view`, (data: any) => {
          setHotActors(data.actors || []);
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (loading) {
    return <Container>로딩 중...</Container>;
  }

  return (
    <Container>
      <Title>{title ? `${title} 출연진을 한눈에 보기!` : "로딩 중..."}</Title>
      {actorIds.length > 0 && <ActorCarousel actorId={actorIds} />}

      <Title>가수 출신 뮤지컬 배우 모아보기</Title>
      {singerActors.length > 0 ? (
        <ActorCarousel
          actorId={singerActors.map((actor: any) => actor.actor_id)}
        />
      ) : (
        <p>가수 출신 배우 정보가 없습니다.</p>
      )}

      <Title>최근 핫한 배우 모아보기</Title>
      {hotActors.length > 0 ? (
        <ActorCarousel
          actorId={hotActors.map((actor: any) => actor.actor_id)}
        />
      ) : (
        <p>최근 핫한 배우 정보가 없습니다.</p>
      )}
    </Container>
  );
};

export default Actor;
