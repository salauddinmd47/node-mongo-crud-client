import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState([]);
    // Load data from database 
    useEffect(()=>{
        fetch('http://localhost:4000/users')
        .then(res=> res.json())
        .then(data => {
            const userList = data.reverse();
            setUsers(userList);
        })
    },[])

    // Delete a user function 

    const handleDeleteUser = (id)=>{
        const proceed = window.confirm("are you sure, you want to delete")
        if(proceed){
            const url =`http://localhost:4000/users/${id}`
        fetch(url,{
            method:'DELETE'
        })
        .then(result=> result.json())
        .then(data=>{
            if(data.deletedCount){
                
                const remainingUser = users.filter(user=>user._id !== id);
                setUsers(remainingUser);
                alert('One user deleted successfully')
            }
        })
        }
    }
    // update user 
    const handleUpdateUser = ()=>{
        
    }
    return (
        <div>
            <h2>{users.length} users found</h2>
            <ul>
                {
                    users.map(user=> <li
                    key={user._id}
                    >{user.name} :: {user.email}  
                    <Link to={ `/users/update/${user._id}`}><button>update</button></Link>
                    <button onClick={()=>handleDeleteUser(user._id)}>x</button></li>)
                   
                }
               
            </ul>
            
        </div>
    );
};

export default Users;