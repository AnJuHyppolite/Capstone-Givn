import { apiURL } from "../util/apiURL";
import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { UserContext } from "../Providers/UserProvider";
// import { useState } from "react";

const ProfilePage = () => {
  const API = apiURL();
  const history = useHistory()
  const [givenItems, setGivenItems] = useState([])
  const [gottenItems, setGottenItems] = useState([])

  const { user } = useContext(UserContext);



  useEffect(() => {

    const getTransactions = async () => {
      try {
        let res = await axios.get(`${API}/users/${user.uid}/transactions`);
        setGivenItems(res.data.filter(transaction => {
          return transaction.giver_id === user.uid
        }))
        setGottenItems(res.data.filter(transaction => {
          return transaction.getter_id === user.uid
        }))
      } catch (error) { console.log(error); }
    }

    getTransactions()
  }, [API, user.uid])

  return (
    <div>
      {!user ? (
        <div>NOT LOGGED IN</div>
      ) : (
        <section>
          <img src={user?.photo_url ? user.photo_url : 'https://cdn2.iconfinder.com/data/icons/flat-design-icons-set-2/256/face_human_blank_user_avatar_mannequin_dummy-512.png'} alt="profilePic" />
          <h2>{user.display_name}</h2>
          <h3>{user.email}</h3>
          <hr />
          <div>
            <h3>{user.address} | Score: {user.score}</h3>
          </div>
          {/* <Link> </Link> */}
          <button onClick={() => history.push('/profile/edit')}>EDIT INORMATION</button>
        </section>
      )}
      <p>Given Items</p>
      {givenItems.map((givenItem, index) => {

        return <li key={index}>{givenItem.item_id}</li>
      })}

      <p>Gotten Items</p>
      {gottenItems.map((gottenItem, index) => {
        console.log("GOTTEN ITEMS>>>>  ", gottenItem.item_id)
        return <li key={index}>{gottenItem.item_id}</li>
      })}
    </div>
  );
};

export default ProfilePage;
