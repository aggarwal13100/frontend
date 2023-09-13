import axios from "axios";
import React from "react";
import { useState } from "react";
import {useNavigate} from "react-router-dom"
const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    function changeHandler(e) {
        let [name, value] = [
            e.target.name,
            e.target.value,
        ];
        setFormData((prev) => ({
            ...prev,
            [name]:  value,
        }));
    }
    function submitHandler(e) {
        e.preventDefault();
        console.log(formData);
        const config = {Headers: {"Content-Type": "application/json"}};
        axios.post("http://127.0.0.1:8000/api/v1/login" , {
            ...formData 
        },config)
        .then((res) => {
            console.log(res);
            // navigate("/game");
        })
        .catch((err) => {
            console.log(err);
        })
    }
    return (
        <div className="min-w-screen min-h-screen flex justify-center items-center bg-[#020e16]">
            <form onSubmit={submitHandler} className='md:w-[720px] p-4 mx-auto flex flex-col gap-y-2'>
                <label className="text-white"
                htmlFor = "email">Email</label><br/>
                <input className="p-2 rounded-md"
                 value={formData.email} onChange={changeHandler} type="email" id = "email" name = "email" placeholder = "rahul123@example.com" /><br/>
                <label className="text-white" htmlFor = "lastName">Password</label><br/>
                <input className="p-2 rounded-md"
                 value={formData.lastName} onChange={changeHandler} type="text" id = "password" name = "password" placeholder = "write your Password Here" /><br/>

                <button className='bg-sky-600 border-black text-[black] rounded-md  py-2 my-2 w-[4rem]' >Save</button>

            </form>
        </div>
    );
};

export default Login;
