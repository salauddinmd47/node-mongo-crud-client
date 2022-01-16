import React, { useRef } from 'react';

const AddUser = () => {
    const nameRef = useRef();
    const emailRef = useRef()

    const handleAddUser = (e)=>{
        e.preventDefault()
        const name = nameRef.current.value;
        const email = emailRef.current.value;

        const newUser = {name, email}
        fetch('http://localhost:4000/users',{
            method:"POST",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(newUser)
        })
        .then(result=>result.json())
        .then(data=>{
            if(data.insertedId){
                alert('User added successfully')
                e.target.reset()
            }
        })

    }

    return (
        <div>
            <h2>Please Add an User</h2>
            <form onSubmit={handleAddUser} >
                <input type="text"placeholder='user name' ref={nameRef}/>
                <input type="email" name="" id="" placeholder='enter email' ref={emailRef} />
                <input type="submit" value="Add User" />
            </form>
        </div>
    );
};

export default AddUser;