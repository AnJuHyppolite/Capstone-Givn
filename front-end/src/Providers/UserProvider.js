import { createContext, useState, useEffect, useRef } from "react";
import { auth } from "../Services/Firebase";
import { apiURL } from "../util/apiURL";
import axios from "axios";

export const UserContext = createContext(null);

const UserProvider = (props) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({})
  const countRef = useRef(0);

  const API = apiURL();

  const createUser = async (user) => {
    const newUser = { display_name: user.displayName, email: user.email, uid: user.uid }
    try {
      let res = await axios.post(`${API}/users`, newUser)
      console.log(res)
      setUserData(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchUser = async (uid, user) => {
    try {
      let res = await axios.get(`${API}/users/${uid}`);
      if (res.data.error) {
        console.log("CREATING NEW USER")
        await createUser(user)
      } else {
        console.log("USER FETCHED")
        setUserData(res.data)
      }

    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const { displayName, email, uid, photoURL } = user;
        await fetchUser(uid, user)
        const { id, display_name, address, score } = userData;
        setUser({
          displayName,
          email,
          uid,
          photoURL,
          id,
          display_name,
          address,
          score
        });
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
