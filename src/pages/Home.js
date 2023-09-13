import React, { useState , useEffect } from "react";
import {BsFillClockFill} from "react-icons/bs"
import {TbReload} from "react-icons/tb"
import {HiLightBulb} from "react-icons/hi"
import Square from "../components/Square";
import Spinner from "../components/Spinner/Spinner"
import axios from "axios"

const Home = () => {
    const [loading , setLoading] = useState(false);
    const [sentence , setSentence] = useState("");
    useEffect(() => {
        setLoading(true);
        
        axios.get("http://localhost:8000/api/v1/sentence")
        .then((response)=>{
            console.log(response);
        })
        .catch((error)=> {
            console.log(error);
            setLoading(false);
        });
        // console.log(response)
        // setSentence(response.data.sentence);
        // console.log(sentence);
        setLoading(false);
    },[])
  return (
    <div>
        {loading ? 
            (<Spinner/>)
            :
        (<div className="min-w-screen  min-h-screen bg-[#020e16] py-4 px-8">
            <div className="text-3xl font-bold text-white  p-4">
                USERFACET
            </div>
            <div>
                <div className="flex justify-between px-[10vh] pt-[10vh] items-end">
                    <div className="text-white text-2xl">
                        USERFACET STATEMENT
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-x-2 text-[10px]">
                            <div className="text-white pl-1">Time left </div> <span className="text-[#f5ca2f]"><BsFillClockFill/></span>
                        </div>
                        <div className="text-[#f5ca2f]"><span className="text-[25px]">1:30</span> min</div>
                    </div>
                </div>
                <div className="flex px-[10vh] py-[1rem] items-center mx-auto flex-wrap max-w-6xl w-[100vw] ">
                    <Square char={" "}/>
                    <Square char={" "}/>
                    <Square char={"a"}/>
                    <Square char={" "}/>
                    <Square char={"d"}/>
                    <Square char={" "}/>
                    <Square char={" "}/>
                    <Square char={" "}/>
                </div>
                <div className="flex justify-between px-[10vh] py-[1rem] items-center">
                    <div className="flip rounded-full bg-[#91c2e2] p-2 text-xl">
                        <TbReload/>
                    </div>
                    <div className="flex gap-x-4 text-xl ">
                        <button 
                        className="border border-black flex gap-x-1 bg-[#91c2e2] px-3 py-2 rounded-md items-center"> 

                        <HiLightBulb/> Hint</button>
                        <button className="border border-black bg-[#23a7ff] px-3 py-2  rounded-md">Submit</button>
                    </div>
                </div>

            </div>
        </div>)}
    </div>

  );
};

export default Home;
