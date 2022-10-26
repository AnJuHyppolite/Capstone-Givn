import { createContext, useState, useEffect, useContext } from "react";
import { auth } from "../Services/Firebase";
import { apiURL } from "../util/apiURL";
import axios from "axios";
import Loading from "../Components/Loading";

export const UserContext = createContext(null);
export const useAuth = () => useContext(UserContext);

const UserProvider = (props) => {
  const [loading, setLoading] = useState(false);
  const [componentMounted , setComponentMounted] = useState(false)
  const [user, setUser] = useState(null);
  const API = apiURL();

  useEffect(() => {
    setComponentMounted(true)
    auth.onAuthStateChanged(async (user) => {
      console.log("FIREBASE: OnAuthStateChanged");
      if (user) {
        const fetchUser = async (user) => {
          //FETCHUSER**********
          try {
            let res = await axios.get(`${API}/users/${user.uid}`);
            if (res.data.error) {
              const createUser = async (user) => {
                //CREATEUSER**************
                const dummyPicture =
                  "https://cdn2.iconfinder.com/data/icons/flat-design-icons-set-2/256/face_human_blank_user_avatar_mannequin_dummy-512.png";
                const { photoURL } = user;
                const newUser = {
                  display_name: user.displayName,
                  email: user.email,
                  photo_url: photoURL ? photoURL : dummyPicture,
                  uid: user.uid,
                };

                try {
                  console.log("CREATING NEW USER >>>> ");
                  let res = await axios.post(`${API}/users`, newUser);
                  const { email, score, id, display_name, uid } = res.data;
                  setUser({
                    address: "EARTH", //set to res.data.address, then use mapbox to find lng * lat of address
                    longitude: 0,
                    latitude: 0,
                    display_name: display_name,
                    email: email,
                    score: score,
                    id: id,
                    photo_url: photoURL ? photoURL : dummyPicture,
                    uid: uid,
                  });
                } catch (error) {
                  console.log(error);
                }
              }; //CREATEUSER******************

              await createUser(user);
            } else {
              console.log("USER FETCHED FROM DB >>>> ");
              const {
                address,
                longitude,
                latitude,
                email,
                score,
                id,
                display_name,
                photo_url,
                uid,
              } = res.data;
              const { photoURL } = user;
              let newDisplayName = user.displayName || display_name;
              setUser({
                address: address,
                longitude: Number(longitude),
                latitude: Number(latitude),
                display_name: newDisplayName,
                email: email,
                score: score,
                id: id,
                uid: uid,
                photo_url: photo_url ? photo_url : photoURL,
              });
            }
          } catch (error) {
            console.log(error);
          }
        }; //FETCH USER*******************

        await fetchUser(user);
        let newUserData;
        user.email
          ? (newUserData = user.email)
          : (newUserData = user.providerData[0].email);

        let newUserUid;
        user.uid
          ? (newUserUid = user.uid)
          : (newUserUid = user.providerData[0].uid);
        axios
          .get("https://api.chatengine.io/users/me", {
            headers: {
              "project-id": process.env.REACT_APP_CHAT_ENGINE_ID,
              "user-name": newUserData,
              "user-secret": newUserUid,
            },
          })
          .then(() => {
            console.log("user");
            setLoading(false);
          })
          .catch(() => {
            let formdata = new FormData();
            formdata.append("email", newUserData);
            formdata.append("username", newUserData);
            formdata.append("secret", user.uid);
            // debugger
            console.log("register new user");

            axios
              .post("https://api.chatengine.io/users/", formdata, {
                headers: {
                  "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY,
                },
              })
              .then(() => setLoading(false))
              .catch((error) => console.log(error));
          });
        setLoading(false)
      } else {
        setUser(null);
      }
    });
  }, [API]);
  if (!componentMounted || loading) return <Loading />; ;

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <main>{props.children}</main>
    </UserContext.Provider>
  );
};

export default UserProvider;
