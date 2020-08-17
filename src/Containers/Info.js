import React, { useState, useEffect} from "react";
import fetchJsonp from "fetch-jsonp";
import { withRouter } from "react-router-dom";
import Preloader from "../Components/Preloader/Preloader";
import "./Info.css";

const BASE_PATH = "https://api.vk.com/method";

function Info() {
  const [userData, setUserData] = useState(null);
  const [userPhotos, setUserPhotos] = useState(null);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    fetchJsonp(
      `${BASE_PATH}/users.get?user_ids=${userId}&fields=bdate,photo_200,photos,audio&access_token=${token}&v=5.122`,
      { mode: "no-cors" }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.response) {
          setUserData({
            name: data.response[0].first_name,
            lastName: data.response[0].last_name,
            photo: data.response[0].photo_200,
          });
        }
      })
      .catch((err) => {
        setUserData({ err: "Unable to fetch data, try again later" });
      });
  }, [token, userId]);

  useEffect(() => {
    fetchJsonp(
      `${BASE_PATH}/photos.get?owner_id=${userId}&access_token=${token}&album_id=wall&count=10&v=5.122`,
      { mode: "no-cors" }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.response) {
          setUserPhotos({
            photos: data.response.items,
          });
        }
      })
      .catch((err) => {
        setUserData({ err: "Unable to fetch photos, try again later" });
      });
  }, [token, userId]);

  let templateData;
  if (userData) {
    templateData = (
      <div>
        <div className="user-info">
          <img src={userData.photo} alt="user" />
        </div>
        <div className="user-info">{userData.name}</div>
        <div className="user-info">{userData.lastName}</div>
      </div>
    );
  }
  let templatePhotos;
  if (userPhotos) {
    templatePhotos = userPhotos.photos.map((photo, index) => (
      <img src={photo.sizes[2].url} key={index} alt='user' />
    ));
  }

  return (
    <div className="container">
      <h3 className="user-info-header"> INFO </h3>
      <div>{userData ? templateData : <Preloader />}</div>
      <h3>Photos</h3>
      <div>{userPhotos ? templatePhotos : <Preloader />}</div>
    </div>
  );
}
export default withRouter(Info);
