import { useEffect, useRef } from "react";
declare global {
  namespace naver.maps {
    class Map {
      constructor(element: HTMLElement, options: MapOptions);
    }

    interface MapOptions {
      center: LatLng;
      zoom: number;
    }

    class LatLng {
      constructor(lat: number, lng: number);
    }
  }
}

const NaverMap: React.FC = () => {
  const mapElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${
      import.meta.env.VITE_NAVER_MAP_API_KEY
    }`;
    script.onload = () => {
      if (mapElement.current) {
        const map = new naver.maps.Map(mapElement.current, {
          center: new naver.maps.LatLng(37.5665, 126.978),
          zoom: 10,
        });
      }
    };
    document.head.appendChild(script);
  }, []);
  return <div ref={mapElement} style={{ width: "100%", height: "400px" }} />;
};

export default NaverMap;
