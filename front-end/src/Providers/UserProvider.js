import { createContext, useState, useEffect } from "react";
import { auth } from "../Services/Firebase";
import { apiURL } from "../util/apiURL";
import axios from "axios";

export const UserContext = createContext(null);

const UserProvider = (props) => {
  const [user, setUser] = useState(null); //firebase
  //const [userData, setUserData] = useState({}) //postgres

  const API = apiURL();

  const createUser = async (user, photoURL, displayName) => {
    const newUser = { display_name: user.displayName, email: user.email, uid: user.uid }
    console.log(newUser)
    try {
      let res = await axios.post(`${API}/users`, newUser)
      console.log(res.data)
      const {address, email, score, id, uid} = res.data
      setUser({address: address, display_name: displayName, email: email, score: score, id: id, uid: uid, photoURL: photoURL})
    } catch (error) {
      console.log(error)
    }
  }

  const fetchUser = async (uid, user, photoURL, displayName) => {
    try {
      let res = await axios.get(`${API}/users/${uid}`);
      if (res.data.error) {
        console.log("CREATING NEW USER")
        await createUser(user, photoURL, displayName)
      } else {
        console.log("USER FETCHED")
        //setUserData(res.data)
        const {address, email, score, id, uid} = res.data
        setUser({address: address, display_name: displayName, email: email, score: score, id: id, uid: uid, photoURL: photoURL})
      }

    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const { displayName, email, uid, photoURL } = user;
        await fetchUser(uid, user, photoURL, displayName)
        //const { id, display_name, address, score } = userData;
        // setUser({...user, uid});
      } else {
        setUser(null);
      } 
    });
  }, []);

  return (
    <UserContext.Provider value={user}>
      <main>{props.children}</main>
    </UserContext.Provider>
  );
};

export default UserProvider;
