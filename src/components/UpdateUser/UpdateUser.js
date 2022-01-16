import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';

const UpdateUser = () => {
    const {id} = useParams()
    const [user, setUser] = useState({});
    const history = useHistory()
    useEffect(()=>{
        fetch(`http://localhost:4000/users/${id}`)
        .then(res=> res.json())
        .then(data=> setUser(data))
    },[])
    
    // taking changed email from input box 
    const handleUpdateEmail= (e)=>{
        const updatedEmail = e.target.value;
        const updatedUser = {name: user.name, email:updatedEmail}
        setUser(updatedUser);
    }
    // taking changed name from input field
    const handleUpdateName = e =>{
        const  updatedName = e.target.value;
        const updatedUser = {name:updatedName, email:user.email};
        setUser(updatedUser)
    }
    // update user info function
    const handleUpdateUser = e =>{
        fetch(`http://localhost:4000/users/${id}`,{
            method:'PUT',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(user)
        })
        .then(res=> res.json())
        .then(data=> {
            if(data.modifiedCount > 0){
                alert('User info updated successfully')
                setUser({})
                history.push('/users')
            }
        })
        e.preventDefault()
    }
    return (
        <div>
            <h2>This is Update User {id}</h2>
            <p>Name: {user.name} :: email:{user.email}</p>
            <form onSubmit={handleUpdateUser} >
                <input type="text" onChange={handleUpdateName} value={user.name || ''} />
                <input type="email" onChange={handleUpdateEmail}   value={user.email || ""} />
                <input type="submit" value="update" />
            </form>
        </div>
    );
};

export default UpdateUser;