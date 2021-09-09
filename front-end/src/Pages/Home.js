import { UserContext } from "../Providers/UserProvider";
import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { signInWithGoogle } from "../Services/Firebase";

const Home = () => {
  const history = useHistory();
  const user = useContext(UserContext);

  useEffect(() => {
    if (user) {
      history.push("/posts");
    }
  }, [user, history]);

  const handleSignIn = () => {
    signInWithGoogle();
  };
  return (
    <div>
      <section>
        <h1>Givn</h1>
      </section>
      <section>
        <button onClick={handleSignIn}>Sign in with google</button>
      </section>
    </div>
  );
};

export default Home;
