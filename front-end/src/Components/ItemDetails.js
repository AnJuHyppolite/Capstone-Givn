import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { apiURL } from "../util/apiURL";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { UserContext } from "../Providers/UserProvider.js";
import "../Styles/ItemDetails.css";
import "swiper/swiper-bundle.css";

SwiperCore.use([Navigation, Pagination]);

const ItemDetails = () => {
  const [item, setItem] = useState({});
  const [requests, setRequests] = useState([])
  const [getterRequest, setGetterRequest] = useState("")
  const API = apiURL();
  const history = useHistory()
  const { id } = useParams();
  const [photos, setPhotos] = useState([]);
  const [showForm, setShowForm] = useState(0)
  const { user } = useContext(UserContext);
  const [requestID, setRequestID] = useState()

  useEffect(async () => {
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
        return res.data
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRequests = async (thisItem) => {
      console.log("INSIDE fetch requests " + thisItem.giver_id)
      debugger
      if (user?.uid === thisItem.giver_id && thisItem.status !== "inactive") { //IF GIVER
        try {
          let res = await axios.get(`${API}/items/${id}/requests`);
          setRequests(res.data)
          debugger
        } catch (error) {
          debugger
          console.log(error);
        }
      } else if (user?.uid) { //IF GETTER
        try {
          let res = await axios.get(`${API}/items/${id}/requests`);
          debugger
          res.data.forEach(r => {
            if (r.getter_id === user.uid) {
              setGetterRequest(r.status)
              debugger
            }
          })
        } catch (error) {
          debugger
          console.log(error);
        }
      }
    }
    fetchPhoto();
    let thisItem = await fetchItem();
    fetchRequests(thisItem)
  }, [API, id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${API}/items/${id}`);
      alert("Item deleted")
      history.goBack();
    } catch (error) {
      console.log(error);
    }
  }

  const handleOffer = async () => {
    setShowForm(1)
  }

  const handleRequest = async () => {
    if (!user) {
      alert("You need an account first")
      history.push('/')
      return;
    }
    const request = { status: "request", display_name: user.display_name, getter_id: user.uid, giver_id: item.giver_id, item_id: item.id }
    try {
      await axios.post(`${API}/items/${id}/requests`, request);
      debugger
      alert(item.title + " successfully requested")
    } catch (error) {
      console.log(error);
    }
  }

  const handleSelect = async (e) => {
    setRequestID(e.target.value)
  }

  const updateItemToPending = async () => {
    const updatedItem = { ...item, status: "pending" }
    try {
      await axios.put(`${API}/users/${user.uid}/items/${id}`, updatedItem);
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API}/items/${id}/requests/${requestID}`, { status: "pending" });
      alert("User will be notified of your offer")
      setShowForm(2)
    } catch (error) {
      console.log(error);
    }
    updateItemToPending();
  }

  const handleTransaction = (e) => {

  }

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
      <h1>{title}</h1>
      <div className="Show">
        <section>
          <Swiper
            slidesPerView={1}
            spaceBetween={5}
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
          <h2>Description</h2>
          <p>{description}</p>
          <h2>Location</h2>
          <p>{address}</p>
          <h2>Created At</h2>
          <p>{created_at}</p>
          <h2>Is Biodegradable</h2>
          <p>{is_biodegradable ? <span>Yes</span> : <span>No</span>}</p>
          {expiration ? <><h2>Expiration</h2>
          <p>{"expires in " + expiration + " days"}</p></> : null }
          {user?.uid === giver_id && status === "active" ?
            (showForm === 0 ?
              <div>
                <Link to={`/posts/${item.id}/edit`}>
                  <button className="editbtn">Edit</button>
                </Link>
                <button className="delbtn" onClick={handleDelete}>Delete</button>
                {requests.length && requests.every(r => r.status === "request") ?
                  <button className="ofrbtn" onClick={handleOffer}>Offer</button> : null}
              </div>
              : (showForm === 1 ? <form onSubmit={handleSubmit}>
                Accept request from :
                <select onChange={handleSelect}>
                  <option>dfsdf</option>
                  {requests.map(r => {
                    return <option key={r.display_name} value={r.id}>{r.display_name}</option>
                  })}

                </select>
                <button className="conbtn">Confirm</button>
              </form> : null)

            ) : (user?.uid !== giver_id) ? ((!getterRequest || getterRequest === "request") ?
              <button className="reqbtn" onClick={handleRequest}>Request</button> :
              <button className="recbtn" onClick={handleTransaction}>Recieved Item?</button>
            ) : null}
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
