import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface PaginationProps {
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages }) => {
  const [current, setCurrent] = useState<number>(1);
  const [pageData, setPageData] = useState<any>(null);

  const buttonStyle = {
    fontFamily: 'inter',
    color: '#A7A7A7',
    fontSize: '20px',
    cursor: 'pointer',
    marginRight: '10px', // 버튼 간 간격 조정
    border: 'none', // 기본 테두리 제거
    background: 'none', // 기본 배경 제거
    padding: '5px 10px', // 선택 사항: 버튼 모양을 위한 패딩 추가
  };

  const selectedButtonStyle = {
    color: '#E8E1B1',
    fontWeight: 'bold',
  };

  const containerStyle = {
    display: 'inline-flex', // 흰색 상자 제거를 위해 inline-flex 사용
    backgroundColor: 'transparent', // 배경 색을 투명으로 설정
  };

  useEffect(() => {
    // 현재 페이지에 대한 데이터 요청
    const fetchPageData = async () => {
      try {
        // 여기를 실제 API 엔드포인트로 변경!!!
        const response = await axios.get(`https://api.example.com/data?page=${current}`);
        setPageData(response.data);
      } catch (error) {
        console.error('페이지 데이터 가져오기 오류:', error);
      }
    };

    fetchPageData();
  }, [current]);

  return (
    <div style={containerStyle}>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          style={{ ...buttonStyle, ...(current === index + 1 && selectedButtonStyle) }}
          onClick={() => setCurrent(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      {pageData && (
        <div>
          {/* 페이지 데이터 렌더링 */}
          {JSON.stringify(pageData)}
        </div>
      )}
    </div>
  );
};

export default Pagination;
