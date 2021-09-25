import { apiURL } from "../util/apiURL";
import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { UserContext } from "../Providers/UserProvider";

const EditProfile = () => {
    const history=useHistory()
    const API = apiURL();
    const {user, setUser} = useContext(UserContext);
    const [updatedUser, SetUpdatedUser] = useState({
        address: user.address,
        longitude: user.longitude,
        latitude: user.latitude,
        display_name: user.display_name,
        email: user.email,
        score: user.score,
        id: user.id,
        uid: user.uid,
        photoURL: user.photoURL
    });

      const updateProfile= async()=>{
        try {
            let res = await axios.put(`${API}/users/${user.uid}`, updatedUser)
            debugger
          } catch (error) {
            console.log(error)
          }
      }

    const handleChange = (e) => {
        SetUpdatedUser({ ...updatedUser, [e.target.id]: e.target.value });
    };

      const handleSubmit = (e) => {
        e.preventDefault();
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
                <br/>
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
                <br/>
                <button type="submit">SUBMIT</button>

            </form>
            <br/><br/>
            <div>
                
                Display Name: {updatedUser.display_name} <br/>
                Email {updatedUser.email} <br/>
                Score: {updatedUser.score} <br/>
                Address: {updatedUser.address} <br/>
                Longitude: {updatedUser.longitude} <br/>
                Latitude: {updatedUser.latitude} <br/>
                ID: {updatedUser.id} <br/>
                UID: {updatedUser.uid} <br/>
                
            </div>
        </div>)
}

export default EditProfile;