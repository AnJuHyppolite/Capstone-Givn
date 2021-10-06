import { apiURL } from "../util/apiURL";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Styles/UserLeaderboard.css";

const UserLeaderboard = () => {
  const API = apiURL();
  const [users, setUsers] = useState([]);

  const calculateTimeLeft = () => {
    let year = new Date().getFullYear();
    let  month = new Date().getMonth() + 1;
    const difference = +new Date(`${year}-${month}-31`) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        milliseconds: Math.floor((difference/16)%60)
      };
    }
    if(timeLeft.days < 10) timeLeft.days = "0"+ timeLeft.days
    if(timeLeft.hours < 10) timeLeft.hours = "0"+ timeLeft.hours
    if(timeLeft.minutes < 10) timeLeft.minutes = "0"+ timeLeft.minutes
    if(timeLeft.seconds < 10) timeLeft.seconds = "0"+ timeLeft.seconds
    if(timeLeft.milliseconds < 10) timeLeft.milliseconds = "0"+ timeLeft.milliseconds

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 16);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });



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
  }, [API]);
  return (
    <div className="parent">
      <br/>
      <section className="timer-section">
        <h1>Countdown to End of Month</h1>
        <p>Top 3 leaders by the end of the month will be eligible for prizes</p>
        {timerComponents.length ? 
        <h1 className="clock">{timeLeft.days}:{timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}:{timeLeft.milliseconds}</h1>
         : <span>Time's up!</span>}
      </section>
      <h1 className='title'>Top Givers</h1>
      <div className='card'>
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
