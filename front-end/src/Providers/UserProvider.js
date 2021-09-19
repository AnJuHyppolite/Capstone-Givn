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
    try {
      console.log("CREATING NEW USER >>>> ")
      console.log(user)
      let res = await axios.post(`${API}/users`, newUser)
      console.log(res.data)
      const { address, email, score, id, display_name, uid } = res.data
      setUser({
        address: address,
        display_name: display_name,
        email: email,
        score: score,
        id: id,
        uid: uid,
        photoURL: user.photoURL
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
        const { address, email, score, id, display_name, uid } = res.data
        let newDisplayName = user.displayName || display_name;
        setUser({
          address: address,
          display_name: newDisplayName,
          email: email,
          score: score,
          id: id,
          uid: uid,
          photoURL: user.photoURL
        })
      }

    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      console.log("FIREBASE: OnAuthStateChanged")
      user ? await fetchUser(user) : setUser(null);
    });
  }, []);

  return (
    <UserContext.Provider value={user}>
      <main>{props.children}</main>
    </UserContext.Provider>
  );
};

export default UserProvider;
