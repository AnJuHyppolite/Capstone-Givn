import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { apiURL } from "../util/apiURL";
import { signUp } from "../util/firebaseFuntion";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const history = useHistory();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      //sign up with firebase and send results to our backend
      try {
        await signUp(email, password);
        console.log("USER SIGNED UP >>>>> ")
        history.push("/");
      } catch (error) {
        setError(error.message);
      }
    };
  
    return (
      <>
        <h1>Sign Up Page</h1>
        {error ? <div>{error}</div> : null}
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
  
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="on"
          />
          <button>Sign Up</button>
        </form>
      </>
    );
  }
  