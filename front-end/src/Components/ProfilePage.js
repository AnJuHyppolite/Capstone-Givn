import { apiURL } from "../util/apiURL";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../Providers/UserProvider";
// import { useState } from "react";

const ProfilePage = () => {
  const API = apiURL();
  const [userInfo, setUserInfo] = useState([]);
  const [givenItems, setGivenItems] = useState([])
  const [gottenItems, setGottenItems] = useState([])

  const user = useContext(UserContext);
  const userData = useContext(UserContext);

  const getTransactions = async () => {
    try {
      let res = await axios.get(`${API}/users/${user.uid}/transactions`);
      setGivenItems(res.data.filter(transaction => {
        return transaction.giver_id === user.uid
      }))
      setGottenItems(res.data.filter(transaction => {
        return transaction.getter_id === user.uid
      }))
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTransactions()
  }, [])

  console.log("IN PROFILE: ");
  console.log(user);
  console.log(Array.isArray(givenItems))
  return (
    <div>
      {!user ? (
        <div>NOT LOGGED IN</div>
      ) : (
        <section>
          <img src={user.photoURL} alt="profilePic" />
          <h2>{user.display_name}</h2>
          <h3>{user.email}</h3>
          <hr />
          <div>
            <h3>{user.address} | Score: {user.score}</h3>
          </div>
        </section>
      )}
      <p>Given Items</p>
      {givenItems.map((givenItem, index) => {
        
        return <li key={index}>{givenItem.item_id}</li>
      })}

      <p>Gotten Items</p>
      {gottenItems.map((gottenItem, index) => {
        console.log("GOTTEN ITEMS>>>>  ",gottenItem.item_id)
        return <li key={index}>{gottenItem.item_id}</li>
      })}
    </div>
  );
};

export default ProfilePage;
