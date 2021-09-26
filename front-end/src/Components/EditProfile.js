import { apiURL } from "../util/apiURL";
import { useContext, useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { UserContext } from "../Providers/UserProvider";
import Geocoder from "./Geocoder";
import "../Styles/EditProfile.css"

const EditProfile = () => {
    const history = useHistory()
    const API = apiURL();
    const { user, setUser } = useContext(UserContext);

    const [updatedUser, SetUpdatedUser] = useState({
        address: user?.address,
        longitude: user?.longitude ? Number(user.longitude) : 0,
        latitude: user?.latitude ? Number(user.latitude) : 0,
        display_name: user?.display_name,
        email: user?.email,
        score: user?.score,
        id: user?.id,
        uid: user?.uid,
        photo_url: user?.photo_url
    });



    const updateProfile = async () => {
        try {
            let res = await axios.put(`${API}/users/${user.uid}`, updatedUser)
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e) => {
        SetUpdatedUser({ ...updatedUser, [e.target.id]: e.target.value });
    };

    const updateLocation = (obj) => {
        SetUpdatedUser(prevState => { return { ...prevState, 'address': obj.address, 'longitude': obj.lng, 'latitude': obj.lat } })
    }

    async function getURL() {
        const { data } = await axios.get(`${API}/s3url`)
        console.log("inside getURL function")
        console.log(data)
        return data.url;
      }

      const getS3url = async (e) => {
        const file = e.target.files[0]
    
        //get secure URL from server
        let url = await getURL();
    
        //post image directly to s3 bucket
        await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "multipart/form-data"
          },
          body: file
    
        })
        const imageURL = url.split('?')[0]
    
        //post photos to frontend
        SetUpdatedUser({...updatedUser, photo_url: imageURL})
    
      }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("IN SUBMIT: ")
        if (!user) {
            alert("You must log in first")
            history.push("/")
            return;
        }
        if (updatedUser.longitude === 0) {
            alert("Please enter a valid address")
            return;
        }
        setUser(updatedUser)
        
        updateProfile()
        history.push("/profile")
    };

    return (
        <div>EDIT PROFILE PAGE
            <form onSubmit={handleSubmit}>
                <label htmlFor="display_name">Display Name: </label>
                <input
                    id="display_name"
                    value={updatedUser.display_name}
                    placeholder="Display Name"
                    type="text"
                    size="40"
                    onChange={handleChange}
                    required
                />
                <br />
                <label htmlFor="email">Contact Email</label>
                <input
                    id="email"
                    value={updatedUser.email}
                    placeholder="Email"
                    type="email"
                    size="40"
                    pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,}$"
                    onChange={handleChange}
                    required
                />
                <br />
                ADDRESS:
                <Geocoder updateLocation={updateLocation} />
                <br />
                <div className="editprofile-image">
                <label htmlFor="image">Select Images to upload:</label>
                    <img  src={updatedUser?.photo_url ? updatedUser.photo_url : 'https://cdn2.iconfinder.com/data/icons/flat-design-icons-set-2/256/face_human_blank_user_avatar_mannequin_dummy-512.png'} alt="profile"/>
                    <input
                        id="image"
                        placeholder="image"
                        type="file"
                        accept="image/*"
                        onChange={getS3url}
                    />

                </div>
                <br />

                <button type="submit">SUBMIT</button>

            </form>
            <br /><br />
            <div>
                TESTING DATA <br />
                Display Name: {updatedUser.display_name} <br />
                Email {updatedUser.email} <br />
                Score: {updatedUser.score} <br />
                Address: {updatedUser.address} <br />
                Longitude: {updatedUser.longitude} <br />
                Latitude: {updatedUser.latitude} <br />
                ID: {updatedUser.id} <br />
                UID: {updatedUser.uid} <br />
                PHOTO_URL: {updatedUser.photo_url} <br />
                <img src={updatedUser?.photo_url ? updatedUser.photo_url : 'https://cdn2.iconfinder.com/data/icons/flat-design-icons-set-2/256/face_human_blank_user_avatar_mannequin_dummy-512.png'} alt="testting" />

            </div>
        </div>)
}

export default EditProfile;