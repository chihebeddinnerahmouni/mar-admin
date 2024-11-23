import React from "react";
import { useTranslation } from "react-i18next";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

interface LocationProps {
    latitude: number;
    longitude: number;
}


    const defaultIcon = L.icon({
      iconUrl: markerIcon,
      shadowUrl: markerShadow,
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
    L.Marker.prototype.options.icon = defaultIcon;

const Location: React.FC<LocationProps> = ({ latitude, longitude }) => {
    const { t } = useTranslation();

    return (
      <div className="w-full p-4 bg-white mt-5 rounded-10 shadow-sm relative">
        <p className="font-bold">{t("approximate location")}</p>
        <div className="map mt-3 lg:mt-5 rounded-10 overflow-hidden">
          <MapContainer
            center={[latitude, longitude]}
            zoom={13}
            style={{ height: "400px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[latitude, longitude]}>
              <Popup>{t("approximate_location")}</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    );
};

export default Location;