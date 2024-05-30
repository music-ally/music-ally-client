import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  margin: 0 5px 15px 5px;
  display: inline-block;
  align-self: flex-start;
  word-break: break-word;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 34px;
  letter-spacing: 1px;
  line-height: 1.347;
  background: linear-gradient(90deg, #E8E1B1, #BB9D59);
  color: transparent;
  background-clip: text;
`;

//타이틀이 이미지 열을 기준으로 왼쪽정렬되어야 하는데 안됨.. 방법을 모르겠음..


const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Image = styled.img`
  border-radius: 20.5px;
  margin: 0 17.8px 0 17.8px; /* 이미지 간격 조절 */
  width: 275.2px;
  height: 389.3px;
`;

const Button = styled.img`
  width: 50px;
  height: 50px;
  cursor: pointer;
`;



/* 
백에서 포스터 이미지 가져오려면 이렇게 해야하는 듯... 
const Carousel: React.FC = () => {
    const [images, setImages] = useState<string[]>([]);
  
    useEffect(() => {
      fetch('https://example.com/api/images')
        .then(response => response.json())
        .then(data => setImages(data))
        .catch(error => console.error('Error fetching images:', error));
    }, []);
  
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const handleLeftButtonClick = () => {
      setCurrentIndex((prevIndex) => {
        const newIndex = prevIndex === 0 ? images.length - 1 : prevIndex - 1;
        return newIndex;
      });
    };
  
    const handleRightButtonClick = () => {
      setCurrentIndex((prevIndex) => {
        const newIndex = prevIndex === images.length - 1 ? 0 : prevIndex + 1;
        return newIndex;
      });
    };
  
    return (
      <Container>
        <Title>믿고 보는 배우 ㅇㅇㅇ의 출연작</Title>
        <Row>
          <Button src="/carouselbutton-left.png" alt="Left Button" onClick={handleLeftButtonClick} />
          {images.map((image, index) => {
            const displayIndex = (index + currentIndex) % images.length;
            return (
              <Image
                key={index}
                src={images[displayIndex]}
                style={{
                  display: index < 4 ? 'block' : 'none',
                }}
              />
            );
          })}
          <Button src="/carouselbutton-right.png" alt="Right Button" onClick={handleRightButtonClick} />
        </Row>
      </Container>
    );
  };
  
  export default Carousel;
*/


const Component: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0); 
  const images = ["/musicalposter-1.jpeg", "/musicalposter-2.jpeg", "/musicalposter-3.jpeg", "/musicalposter-4.jpeg", "/musicalposter-5.jpeg", "/musicalposter-6.jpeg"];

  const handleLeftButtonClick = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? images.length - 1 : prevIndex - 1;
      return newIndex;
    });
  };

  const handleRightButtonClick = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex === images.length - 1 ? 0 : prevIndex + 1;
      return newIndex;
    });
  };

  return (
    <Container>
      <Title>믿고 보는 배우 ㅇㅇㅇ의 출연작</Title>
      <Row>
        <Button src="/carouselbutton-left.png" alt="Left Button" onClick={handleLeftButtonClick} />
        {images.map((image, index) => {
          const displayIndex = (index + currentIndex) % images.length; 
          return (
            <Image
              key={index}
              src={images[displayIndex]}
              style={{
                display: index < 4 ? 'block' : 'none',
              }}
            />
          );
        })}
        <Button src="/carouselbutton-right.png" alt="Right Button" onClick={handleRightButtonClick} />
      </Row>
    </Container>
  );
};

export default Component;