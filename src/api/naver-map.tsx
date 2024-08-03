import { useState, useEffect } from "react";

let mapInstance: naver.maps.Map | null = null;

const loadScript = (src: string, callback: () => void) => {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = src;
  script.onload = () => callback();
  document.head.appendChild(script);
};

const geocodeAddress = (
  address: string,
  callback: (lat: number, lng: number) => void
) => {
  naver.maps.Service.geocode({ query: address }, (status, response) => {
    if (status !== naver.maps.Service.Status.OK) {
      alert("Something went wrong!");
      return;
    }
    const result = response.v2.addresses[0];
    const latitude = parseFloat(result.y);
    const longitude = parseFloat(result.x);
    callback(latitude, longitude);
  });
};

interface NaverMapProps {
  theater_address: string;
}

const NaverMap: React.FC<NaverMapProps> = ({ theater_address }) => {
  const [isMapLoaded, setMapLoaded] = useState(false);

  const initMap = (latitude: number, longitude: number) => {
    const mapOptions = {
      zoomControl: true,
      zoomControlOptions: {
        style: naver.maps.ZoomControlStyle.SMALL,
        position: naver.maps.Position.TOP_RIGHT,
      },
      center: new naver.maps.LatLng(latitude, longitude),
      zoom: 16,
    };

    if (document.getElementById("map")) {
      mapInstance = new naver.maps.Map("map", mapOptions);
    }

    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(latitude, longitude),
      map: mapInstance,
    });

    naver.maps.Event.addListener(marker, "click", () => {
      mapInstance?.setCenter(new naver.maps.LatLng(latitude, longitude));
      mapInstance?.setZoom(16);
    });

    setMapLoaded(true);
  };

  useEffect(() => {
    if (typeof naver === "undefined") {
      loadScript(
        `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${
          import.meta.env.VITE_NAVER_MAP_API_KEY
        }`,
        () => {
          geocodeAddress(theater_address, (latitude, longitude) => {
            initMap(latitude, longitude);
          });
        }
      );
    } else {
      geocodeAddress(theater_address, (latitude, longitude) => {
        initMap(latitude, longitude);
      });
    }
  }, [theater_address]);

  return (
    <div>
      {isMapLoaded && (
        <div
          id="map"
          style={{ marginTop: "1rem", height: "500px", width: "91.66667%" }}
        />
      )}
    </div>
  );
};

export default NaverMap;
