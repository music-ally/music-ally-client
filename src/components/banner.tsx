import styled from "styled-components";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

const BannerContainer = styled.div`
  width: 100%;
  height: 400px;
  overflow: hidden;
`;

const CustomSwiperWrapper = styled.div`
  .swiper-pagination {
    position: absolute;
    left: 10px;
    bottom: 15px;
    display: flex;
    gap: 5px;
  }

  /* .swiper-pagination-bullet { // 선택 안된
        background-color: black;
    } */

  .swiper-pagination-bullet-active {
    // 현재 선택
    background-color: white;
  }
`;

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default function Banner() {
  return (
    <BannerContainer>
      <CustomSwiperWrapper>
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          loop={true}
        >
          <SwiperSlide>
            <SlideImage src="/banner1.png" alt="Slide 1" />
          </SwiperSlide>
          <SwiperSlide>
            <SlideImage src="/banner2.png" alt="Slide 2" />
          </SwiperSlide>
          <SwiperSlide>
            <SlideImage src="/banner3.png" alt="Slide 3" />
          </SwiperSlide>
          <SwiperSlide>
            <SlideImage src="/banner4.png" alt="Slide 4" />
          </SwiperSlide>
          <SwiperSlide>
            <SlideImage src="/banner5.png" alt="Slide 5" />
          </SwiperSlide>
        </Swiper>
      </CustomSwiperWrapper>
    </BannerContainer>
  );
}
