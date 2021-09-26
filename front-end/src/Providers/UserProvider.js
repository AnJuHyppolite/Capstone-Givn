import { createContext, useState, useEffect } from "react";
import { auth } from "../Services/Firebase";
import { apiURL } from "../util/apiURL";
import axios from "axios";

export const UserContext = createContext(null);

const UserProvider = (props) => {
  const [user, setUser] = useState(null);
  const API = apiURL();

  const createUser = async (user) => {
    const newUser = { display_name: user.displayName, email: user.email, uid: user.uid }
    const dummyPicture = "https://cdn2.iconfinder.com/data/icons/flat-design-icons-set-2/256/face_human_blank_user_avatar_mannequin_dummy-512.png"
    try {
      console.log("CREATING NEW USER >>>> ")
      
      const {photoURL } = user;
      let res = await axios.post(`${API}/users`, newUser)
      const { address, email, score, id, display_name, uid } = res.data
      setUser({
        address: 0, //set to address: adress, then use mapbox to find lng * lat of address
        longitude: 0,
        latitude: 0,
        display_name: display_name,
        email: email,
        score: score,
        id: id,
        photo_url: photoURL ? photoURL : dummyPicture,
        uid: uid
      })
    } catch (error) {
      console.log(error)
    }
  }

  const fetchUser = async (user) => {
    try {
      let res = await axios.get(`${API}/users/${user.uid}`);
      if (res.data.error) {
        await createUser(user)
      } else {
        console.log("USER FETCHED FROM DB >>>> ")
        const { address, longitude, latitude, email, score, id, display_name, photo_url, uid } = res.data
        const {photoURL } = user;
        let newDisplayName = user.displayName || display_name;
        setUser({
          address: address,
          longitude: longitude,
          latitude: latitude,
          display_name: newDisplayName,
          email: email,
          score: score,
          id: id,
          uid: uid,
          photo_url: photo_url ? photo_url : photoURL
        })
      }

    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      console.log("FIREBASE: OnAuthStateChanged")
      if(user){
        await fetchUser(user) 
      } else{
        setUser(null);
      }
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <main>{props.children}</main>
    </UserContext.Provider>
  );
};

export default UserProvider;
