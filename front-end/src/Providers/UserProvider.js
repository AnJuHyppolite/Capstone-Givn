import { createContext, useState, useEffect } from "react";
import { auth } from "../Services/Firebase";
import { apiURL } from "../util/apiURL";
import axios from "axios";

export const UserContext = createContext(null);

const UserProvider = (props) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({})

  const API = apiURL();

  //converts a string (uid) into a number
  const hashCode = s => Math.abs(s.split('').reduce((a,b)=>{a=((a<<5)-a)+b.charCodeAt(0);return a&a},0))


  const createUser = async (newID, user)=>{
    console.log(user)
    const newUser = {uid: newID, ...user}
    console.log(newUser)
    debugger
    try{
      let res = await axios.post(`${API}/users`,newUser)
      setUserData(res.data)
    }catch(error){
      console.log(error)
    }
  }

  
   const fetchUser = async (uid,user) => {
      try {
        let res = await axios.get(`${API}/users/${uid}`);
        if(res.data.error){
          console.log(user)
          await createUser(uid,user)
          debugger
        }else{
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
        console.log(user)
        //await fetchUser(hashCode(uid), user)
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
