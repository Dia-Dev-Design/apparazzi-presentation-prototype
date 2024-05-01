import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../authService/baseUrl";
import Photo from "../components/Photo";
import L from "leaflet";
import { MapContainer, useMap } from "react-leaflet";
import { TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";
import { convertGPS } from "../authService/convertGPS";
import TheseTags from "../components/TheseTags";

const TagDetails = (props) => {
  let myIcon = L.icon({
    iconUrl: require("../AppStar.png"),
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });

  const [photos, setPhotos] = useState([]);
  const [photoIndex, setPhotoIndex] = useState(0)
  const [points, setPoints] = useState([])
  const [map, setMap] = useState({
    lat: 25.80051750601982,
    lng: -80.19831072619859,
    zoom: 13,
  });

  const params = useParams();

  useEffect(() => {
    fetchPhotos();
    window.scrollTo(0, 0);
  }, [props]);

  const fetchPhotos = () => {
    axios
      .get(baseUrl + `/photos/${params.id}/tag`)
      .then((res) => {        
        setPhotos(res.data.photos);
      })
      .catch((err) => console.log(err));
  };

const handleSliderChange = (e) => {
  console.log(+e.target.value);
  setPhotoIndex(+e.target.value)
}

const getPoints = (photos) => {
  const points = []
  photos.forEach((spot, index) => {
    console.log(index,spot);
    points.push([convertGPS(spot.latitude),convertGPS(spot.longitude)]);
  })
  setPoints(points)
}

const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  map.setView(center, zoom);
}

useEffect(() => {
  if(photos.length){
    getPoints(photos)
  }
}, [photos])


  return (
    <div>
      <p>This is TagDetails</p>
      <div className="slider">
        <input
          type="range"
          min="0"
          max={`${photos.length-1}`}
          value={photoIndex}
          onChange={handleSliderChange}
        />
      </div>
      <h2>#{params.id}</h2>

      <div id="mapid">
        <MapContainer
          className="mapContainer"
          id={"tagMap"}
          center={[map.lat, map.lng]}
          zoom={map.zoom}
          style={{ width: "90%", height: "80vh" }}
        >
          <TileLayer
            attribution='&copy <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

             {points[photoIndex] && photos[photoIndex] && 
             <ChangeView center={points[photoIndex]} zoom={map.zoom} />}
             {points[photoIndex] && photos[photoIndex] && 
             <Marker icon={myIcon} position={points[photoIndex]} key={photos[photoIndex]["_id"]}>
                  <Popup>
                    <span>
                      <TheseTags photo={photos[photoIndex]} />
                    </span>
                    {/* <br /> */}
                    <span>
                      <Link to={`/${photos[photoIndex]._id}/details`}>Details</Link>
                    </span>
                    {/* <br /> */}
                    <img
                      src={photos[photoIndex].imageUrl}
                      alt="testimage"
                      className="previewImage"
                    />
                  </Popup>
                </Marker>}

          
        </MapContainer>
      </div>

      <div>
        <div className="columnated">
          {[...photos].reverse().map((photo) => {
            return (
              <div className="direction" key={photo._id}>
                <Photo photo={photo} className={"imageGroup"} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TagDetails;
