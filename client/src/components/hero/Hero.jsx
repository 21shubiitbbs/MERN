import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import classes from "./hero.module.css";
import Option from "../../choose/Option";

const Hero = () => {
  const [type, setType] = useState("0");
  const [Area, setArea] = useState("0");
  const [priceRange, setPriceRange] = useState("0");
  const navigate = useNavigate();

  // TODO here or somewhere home(fetching properties)

  const handleSearch = () => {
    // navigating to properties
    navigate(
      `/properties?type=${type}&Area=${Area}&priceRange=${priceRange}`
    );
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h2>Let me find your dream place right now</h2>
        <h5>Search the best flat in Noida</h5>
        <div className={classes.options}>
          <select onChange={(e) => setType(e.target.value)}>
            <Option
              data={[
                {
                  value: "",
                  name: "Select Type",
                  disabled:true,
                  selected:true 
                },
                {
                  value: "1",
                  name: "Builder"
                },
                {
                  value: "2",
                  name: "Society"
                },
                {
                  value: "3",
                  name: "House"
                }
              ]}
            ></Option>
          </select>
          <select onChange={(e) => setPriceRange(e.target.value)}>
            <Option
             data={[
                {
                  value: "",
                  name: "Select Price",
                  disabled:true,
                  selected:true 
                },
                {
                  value: "1",
                  name: "0-5000"
                },
                {
                  value: "2",
                  name: "5000-15000"
                },
                {
                  value: "3",
                  name: "15000-30000"
                },
                {
                  value: "4",
                  name: "30000-40000"
                }
              ]}
          ></Option>
          </select>
          <select onChange={(e) => setArea(e.target.value)}>
            <Option
            data={[
              {
                value: "",
                name: "Select Area",
                disabled:true,
                selected:true 
              },
              {
                value: "1",
                name: "Noida"
              },
              {
                value: "2",
                name: "Greater noida"
              },
              {
                value: "3",
                name: "Indrapuram"
              },
              {
                value: "4",
                name: "Vaishali"
              }
            ]}
            ></Option>
          </select>
          <AiOutlineSearch
            className={classes.searchIcon}
            onClick={handleSearch}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
