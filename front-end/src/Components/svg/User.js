import { apiURL } from "../../util/apiURL";
import React, { useEffect, useState } from "react";
import axios from "axios";


const User = () => {
    const [users, setUsers] = useState([])
    const API = apiURL();

    useEffect(()=> {
        const fecthAllUser = async()=> {
            let res = await axios.get(`${API}/users`);
            setUsers(res.data)
        }
        fecthAllUser()
    },[])

    let x = users.map(el => el.display_name ).map(el => el)
    console.log('users',x)

  return (
    <div>
        {users?.map((user)=> {
           return <>
               <img src={user.photo_url}  className='avatar'/>
               {user.display_name}
           </>
        })}
        
    </div>
  )
}

export default User