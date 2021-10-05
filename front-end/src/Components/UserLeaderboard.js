import { apiURL } from "../util/apiURL";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Styles/UserLeaderboard.css";

const UserLeaderboard = () => {
  const API = apiURL();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let res = await axios.get(`${API}/users`);
        setUsers(
          res.data.sort((a, b) => b.score - a.score).filter((a, i) => i < 10)
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);
  return (
    <div className="parent">
      <h1 className='title'>Top Givers</h1>
      <div className='container'>
        {users.map((user) => {
          const { score, display_name, photo_url, uid } = user;
          return (
            <section className="leaderboard">
              <div className="leaderboard-container">
                <Link to={`/profile/${uid}`}>
                  <img src={photo_url} alt={display_name} />
                  <h1>{display_name}</h1>
                  <p>{score}</p>
                </Link>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default UserLeaderboard;
