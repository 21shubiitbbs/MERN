import React from "react";

export default function Option(props) {
  return (
    <>
      {props.data.map((ele) => {
        
        // console.log(i)
        return (
          <option selected={ele.selected} disabled={ele.disabled} value={ele.value}>
            {ele.name} 
          </option>
        );
      })}
    </>
  );
}
