import React, { useState, useEffect } from "react";
import { BsFillClockFill } from "react-icons/bs";
import { TbReload } from "react-icons/tb";
import { HiLightBulb } from "react-icons/hi";
import Square from "../components/Square";
import Spinner from "../components/Spinner/Spinner";
import axios from "axios";

const Game = () => {
    const [loading, setLoading] = useState(false);
    const [hideIndex, setHideIndex] = useState([]);
    const [min , setMin] = useState(5);
    const [sec  , setSec] = useState(0);
    const [startTimer , setStartTimer] = useState(false);
    let startTime;
    let timer;
    // const [sentence , setSentence] = useState("");
    // setSentence("We design and develop applications that run the world and showcase the future");
    const sentence =
        "We design and develop applications that run the world and showcase the future".toUpperCase();

    const displaySentence = () => {
        let size = sentence.length;
        let isHide = new Array(size);
        for (let i = 0; i < size; i++) {
            isHide[i] = true;
        }
        let displayed = Math.floor((size * 3) / 10);

        while (displayed !== 0) {
            let num = Math.floor(Math.random() * size);
            if (isHide[num] === true && sentence[num] !== " ") {
                displayed = displayed - 1;
                isHide[num] = false;
            }
        }
        setHideIndex(isHide);
    };

    useEffect(() => {
        setLoading(true);

        // axios.get("http://localhost:8000/api/v1/sentence")
        // .then((res) => {
        //     sentence = res.data.sentence;
        // })
        // .error((err) => {
        //     console.log(err);
        // })

        displaySentence();
        setLoading(false);
    }, []);


    function stopTimer() {
        clearInterval(timer);
        setStartTimer(false);

        // submitting the result
        submitHandler();

    }
    function gameStart() {
        if(sec===0) {
            if(min === 1) {
                stopTimer();
                return;
            }
            setSec(60);
            setMin(min-1);
        }else{
            setSec(sec-1);
        }
    }
    function clickHandler(){
        console.log("hello")
        if(startTimer) {
            return
        }
        setStartTimer(true);
        startTime = new Date();
        timer = setInterval(gameStart,1000)
    }

    function submitHandler() {
        let enteredSentence = hideIndex.filter((hide) => (hide))
        const score = enteredSentence.length === sentence.length
        const timeTaken = (new Date() - startTime)/60000;
        setLoading(true)
        axios.post("http://localhost:8000/api/v1/result" , {
            score : score,
            timeTaken : timeTaken,
        })
        .then((res) => {
                alert(res.data.message);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(()=>{
            setLoading(false);
        })
    }


    return (
        <div>
            {loading ? (
                <Spinner />
            ) : (
                <div className="min-w-screen  min-h-screen bg-[#020e16] py-4 px-8">
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
                                    <div className="text-white pl-1">
                                        Time left{" "}
                                    </div>{" "}
                                    <span className="text-[#f5ca2f]">
                                        <BsFillClockFill />
                                    </span>
                                </div>
                                <div className="text-[#f5ca2f]">
                                    <span className="text-[25px]">{min}:{sec}</span>{" "}
                                    min
                                </div>
                            </div>
                        </div>
                        <div className="flex px-[10vh] py-[1rem] items-center mx-auto flex-wrap max-w-6xl w-[100vw] ">
                            {sentence.split("").map((char, index) => {
                                return (
                                    <Square
                                        onClick= {clickHandler}
                                        key={index}
                                        char={char}
                                        isDisplay={hideIndex[index]}
                                        hideIndex={hideIndex}
                                        setHideIndex={setHideIndex}
                                        sentence={sentence}
                                    />
                                );
                            })}
                        </div>
                        <div className="flex justify-between px-[10vh] py-[1rem] items-center">
                            <div className="flip rounded-full bg-[#91c2e2] p-2 text-xl">
                                <TbReload />
                            </div>
                            <div className="flex gap-x-4 text-xl ">
                                <button className="border border-black flex gap-x-1 bg-[#91c2e2] px-3 py-2 rounded-md items-center">
                                    <HiLightBulb /> Hint
                                </button>
                                <button onClick={submitHandler} className="border border-black bg-[#23a7ff] px-3 py-2  rounded-md">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Game;
