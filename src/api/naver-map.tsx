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

    class Marker {
      constructor(options: MarkerOptions);
    }

    interface MarkerOptions {
      position: LatLng;
      map: Map;
    }

    class Service {
      static fromAddrToCoord(
        addr: string,
        callback: (status: any, response: any) => void
      ): void;
    }

    namespace Service {
      enum Status {
        OK,
        ERROR,
      }
    }
  }
}

interface NaverMapProps {
  theater_address: string;
}

const NaverMap: React.FC<NaverMapProps> = ({ theater_address }) => {
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

        const checkServiceAndCreateMarker = () => {
          if (naver.maps.Service) {
            naver.maps.Service.fromAddrToCoord(
              theater_address,
              (status, response) => {
                if (status === naver.maps.Service.Status.OK) {
                  const location = response.result.items[0].point;
                  const position = new naver.maps.LatLng(
                    location.y,
                    location.x
                  );

                  console.log("Converted coordinates:", position);

                  const marker = new naver.maps.Marker({
                    position,
                    map,
                  });

                  console.log("Marker created at:", marker.position);

                  map.setCenter(position);
                  console.log("Map center set to:", position);
                } else {
                  console.error(
                    "Error converting address to coordinates:",
                    status
                  );
                }
              }
            );
          } else {
            setTimeout(checkServiceAndCreateMarker, 100);
          }
        };

        checkServiceAndCreateMarker();
      }
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [theater_address]);

  return <div ref={mapElement} style={{ width: "100%", height: "400px" }} />;
};

export default NaverMap;
