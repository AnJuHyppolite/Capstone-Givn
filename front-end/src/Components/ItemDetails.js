import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { apiURL } from "../util/apiURL";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { UserContext } from "../Providers/UserProvider.js";
import "../Styles/ItemDetails.css";
import "swiper/swiper-bundle.css";
import { capitalize } from "../Helpers/capitalizeName";
import { calculateScore } from "../Helpers/calculateScore";
import facts from "../Helpers/facts";
import Directions from "./Directions";

SwiperCore.use([Navigation, Pagination]);

const ItemDetails = () => {
  const [item, setItem] = useState({});
  const [requests, setRequests] = useState([]);
  const [getterRequest, setGetterRequest] = useState("");
  const API = apiURL();
  const history = useHistory();
  const { id } = useParams();
  const [photos, setPhotos] = useState([]);
  const [showForm, setShowForm] = useState(0);
  const { user } = useContext(UserContext);
  const [requestID, setRequestID] = useState();
  const [randomfact, setRandomFact] = useState("");

  useEffect(() => {
    fetchInformation();
  }, []);

  const fetchInformation = async () => {
    const fetchPhoto = async () => {
      try {
        let res = await axios.get(`${API}/items/${id}/photos`);
        setPhotos(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchItem = async () => {
      try {
        let res = await axios.get(`${API}/items/${id}`);
        setItem(res.data);
        return res.data;
      } catch (error) {
        console.log(error);
      }
    };

    const getRandomFact = (item) => {
      const filteredFacts = facts.filter((factObj) => {
        if (factObj.category === item.category) {
          return factObj.facts;
        }
      });
      const randomNumber = Math.floor(
        Math.random() * filteredFacts[0]?.facts?.length
      );
      setRandomFact(filteredFacts[0].facts[randomNumber]);
    };

    const fetchRequests = async (thisItem) => {
      if (user?.uid === thisItem.giver_id && thisItem.status !== "inactive") {
        //If GIVER is on this page
        try {
          let res = await axios.get(`${API}/items/${id}/requests`);
          setRequests(res.data);
        } catch (error) {
          console.log(error);
        }
      } else if (user?.uid) {
        //IF GETTER is on this page
        try {
          let res = await axios.get(`${API}/items/${id}/requests`);

          res.data.forEach((r) => {
            if (r.getter_id === user.uid) {
              setGetterRequest(r.status);
            }
          });
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchPhoto();
    let thisItem = await fetchItem();
    getRandomFact(thisItem);
    fetchRequests(thisItem);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API}/items/${id}`);
      alert("Item deleted");
      history.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  const handleOffer = async () => {
    setShowForm(1);
  };

  const handleRequest = async () => {
    if (!user) {
      alert("You need an account first");
      history.push("/");
      return;
    }
    const request = {
      status: "request",
      display_name: user.display_name,
      title: item.title,
      getter_id: user.uid,
      giver_id: item.giver_id,
      item_id: item.id,
    };
    try {
      await axios.post(`${API}/items/${id}/requests`, request);
      alert(item.title + " successfully requested");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelect = async (e) => {
    setRequestID(e.target.value);
  };

  const updateItemStatus = async (newStatus) => {
    const updatedItem = { ...item, status: newStatus };
    try {
      await axios.put(`${API}/users/${user.uid}/items/${id}`, updatedItem);
      return true;
    } catch (error) {
      console.log(error);
    }
  };

  const recordTransaction = async (pointsForItem) => {
    const currentdate = new Date();
    const transactionTime =
      currentdate.getMonth() +
      1 +
      "/" +
      currentdate.getDate() +
      "/" +
      currentdate.getFullYear() +
      " " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes();
    const newTransaction = {
      time: transactionTime,
      points: pointsForItem,
      getter_id: user.uid,
      giver_id: item.giver_id,
      item_id: id,
    };
    try {
      await axios.post(
        `${API}/users/${item.giver_id}/transactions`,
        newTransaction
      );
    } catch (error) {
      console.log(error);
    }
  };

  const recordPoints = async (points) => {
    try {
      await axios.put(`${API}/users/${item.giver_id}/score`, { score: points });
      alert("Transaction recorded!");
      history.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API}/items/${id}/requests/${requestID}`, {
        status: "pending",
      });
      alert("User will be notified of your offer");
      setShowForm(2);
    } catch (error) {
      console.log(error);
    }
    updateItemStatus("pending");
  };

  const countRequests = async () => {
    try {
      let res = await axios.get(`${API}/items/${id}/requests`);
      return res.data.length;
    } catch (error) {
      console.log(error);
    }
  };

  const closeRequestStatus = async () => {
    try {
      await axios.put(`${API}/items/${id}/requests/${id}/close`, {
        status: "inactive",
      });
      return true;
    } catch (error) {
      console.log(error);
    }
  };

  const handleTransaction = async (e) => {
    let pointsForItem = calculateScore(item.category, await countRequests());
    recordTransaction(pointsForItem, await closeRequestStatus());
    recordPoints(pointsForItem, await updateItemStatus("inactive"));
  };

  const {
    title,
    description,
    address,
    created_at,
    status,
    is_biodegradable,
    expiration,
    giver_id,
  } = item;
  return (
    <div>
      <h1>{capitalize(title)}</h1>
      <div className="Show">
        <section>
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            navigation
            pagination={{ clickable: true }}
          >
            {photos.map((photo, index) => {
              return (
                <SwiperSlide>
                  <img src={photo.photo_url} alt={title} key={index} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </section>
        <section className="right-info">
          <h2>
            <i className="fas fa-leaf"></i> Educational Fact:
          </h2>
          <p className="edu-fact">{`"${randomfact}"`}</p>
          <h2>Description</h2>
          <p>{description}</p>
          <h2>Location</h2>
          <p>{address}</p>
          <h2>Created At</h2>
          <p>{created_at}</p>
          <h2>Is Biodegradable</h2>
          <p>{is_biodegradable ? <span>Yes</span> : <span>No</span>}</p>
          {expiration ? (
            <>
              <h2>Expiration</h2>
              <p>{"expires in " + expiration + " days"}</p>
            </>
          ) : null}
          {user?.uid === giver_id && status === "active" ? (
            showForm === 0 ? (
              <div className="user-btns">
                <Link to={`/posts/${item.id}/edit`}>
                  <button className="editbtn">Edit</button>
                </Link>
                <button className="delbtn" onClick={handleDelete}>
                  Delete
                </button>
                {requests.length &&
                requests.every((r) => r.status === "request") ? (
                  <button className="ofrbtn" onClick={handleOffer}>
                    Offer
                  </button>
                ) : null}
              </div>
            ) : showForm === 1 ? (
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="offer">Accept request from :</label>
                  <select
                    onChange={handleSelect}
                    defaultValue=""
                    required
                    id="offer"
                  >
                    <option disabled></option>
                    {requests.map((r, i) => {
                      return (
                        <option key={i} value={r.id}>
                          {r.display_name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <button className="conbtn">Confirm</button>
              </form>
            ) : null
          ) : user?.uid !== giver_id ? (
            !getterRequest || getterRequest === "request" ? (
              <button className="reqbtn" onClick={handleRequest}>
                Request
              </button>
            ) : (
              <button className="recbtn" onClick={handleTransaction}>
                Recieved Item?
              </button>
            )
          ) : null}
        </section>
      </div>
      <div>
        {user?.latitude && item.latitude && getterRequest && getterRequest!=="request" ? <Directions start={[user.longitude, user.latitude]} end={[Number(item.longitude),Number(item.latitude)]}/> : null}
      </div>
    </div>
  );
};

export default ItemDetails;
