import { Link } from "react-router-dom";
import axios from "axios";
import { apiURL } from "../util/apiURL.js";
import { useEffect, useState } from "react";



const ProfileItem = ({ item }) => {
    const API = apiURL();
    const [photos, setPhotos] = useState([])

    useEffect(() => {
        const getPhotos = async () => {

            try {
                let res = await axios.get(`${API}/items/${item.id}/photos`);
                setPhotos(res.data)
                debugger
            } catch (error) {
                console.log(error)
            }

        }
        getPhotos()
    }, [API])




    return (<div className="profile-item">
        <Link to={`/posts/${item.id}`}>
            <h4>{item.title}</h4>
            <img className="profile-item-image" src={photos[0]?.photo_url ? photos[0].photo_url : "https://cdn.iconscout.com/icon/premium/png-256-thumb/use-item-994788.png"} alt="profile item" />
        </Link>
    </div>)
}

export default ProfileItem;