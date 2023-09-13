import React from "react";
import { useState } from "react";

const Square = ({char ,key, isDisplay , hideIndex , setHideIndex ,sentence}) => {
    const [backColor , setBackColor] = useState(`${char === " " ? "[#4d6c82]" : "white"}`);
    function onChangeHandler(e) {
        console.log(sentence);
        let alpha = e.target.value;
        console.log(alpha);
        let newHideIndex = hideIndex;

        console.log(e.target.value);
        if(alpha === "") {
            setBackColor("white");
            newHideIndex[key] = false;
            setHideIndex(newHideIndex);
            return;
        }
        newHideIndex[key] = true;
        console.log(newHideIndex[key]);
        setHideIndex(newHideIndex);
        if(alpha === sentence[key]) {
            setBackColor("[#2d9738]");
        }
        else {
            setBackColor("[#f35858]");
        }

    }
  return (
    <input onChange={onChangeHandler}
     type="text" value={isDisplay?char.toUpperCase():""} className={`bg-${backColor} m-2 p-2 w-[3vw] text-center ${isDisplay ?"pointer-events-none" : "pointer-events-auto"} rounded-md text-black`}/>
  );
};

export default Square;
