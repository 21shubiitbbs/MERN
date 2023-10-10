import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";
import { arrPriceRanges } from "../../util/idxToPriceRange";
import classes from "./properties.module.css";
import { useEffect } from "react";
import { AreaToIdx } from "../../util/idxToArea";
import { request } from "../../util/fetchAPI";
import PropertyCard from "../propertyCard/PropertyCard";
import Option from "../../choose/Option";

const Properties = () => {
  const [allProperties, setAllProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [state, setState] = useState(null);
  const query = useLocation().search.slice(1); // slice(1) to remove "?"
  const arrQuery = query.split("&");
  const navigate = useNavigate();

  // fetch all properties
  useEffect(() => {
    const fetchAllProperties = async () => {
      const data = await request(`/property/getAll`, "GET");
      setAllProperties(data);
    };
    fetchAllProperties();
  }, []);

  // parsing query params
  useEffect(() => {
    if (arrQuery && allProperties?.length > 0 && state === null) {
      let formattedQuery = {};
      arrQuery.forEach((option, idx) => {
        const key = option.split("=")[0];
        const value = option.split("=")[1];

        formattedQuery = { ...formattedQuery, [key]: value };

        // if we are on the last index, assign the formattedQuery obj to state
        if (idx === arrQuery.length - 1) {
          setState((prev) => formattedQuery);
          handleSearch(formattedQuery);
        }
      });
    }
  }, [allProperties, arrQuery]);

  const handleState = (e) => {
    setState((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSearch = (param = state) => {
    let options;
    // we either pass the formattedObj or event, that's why we do the IF/ELSE
    if (param?.nativeEvent) {
      options = state;
    } else {
      options = param;
    }
    const priceRange = arrPriceRanges[options.priceRange];
    let minPrice, maxPrice;

    if (priceRange) {
      minPrice = Number(priceRange.split("-")[0]);
      maxPrice = Number(priceRange.split("-")[1]);
    } else {
      // Handle the case where priceRange is undefined
      // Set default minPrice and maxPrice values here
      minPrice = 0; // Set a default minimum price
      maxPrice = 100000; // Set a default maximum price
    }
    const Area = AreaToIdx(options.Area);
    const filteredProperties = allProperties.filter((property) => {
      if (
        property.type === options.type &&
        Area === Number(options.Area) &&
        property.price >= minPrice &&
        property.price <= maxPrice
      ) {
        return true;
      }
      return false;
    });

    const queryStr = `type=${options.type}&Area=${options.Area}&priceRange=${options.priceRange}`;

    navigate(`/properties?${queryStr}`, { replace: true });
    setFilteredProperties(filteredProperties);
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.options}>
          <select value={state?.type} name="type" onChange={handleState}>
            <Option
              data={[
                {
                  value: "",
                  name: "Select Type",
                  disabled: true,
                  selected: true
                },
                {
                  value: "Builder",
                  name: "Builder"
                },
                {
                  value: "Society",
                  name: "Society"
                },
                {
                  value: "House",
                  name: "House"
                }
              ]}
            ></Option>
          </select>
          <select
            value={state?.priceRange}
            name="priceRange"
            onChange={handleState}
          >
            <Option
              data={[
                {
                  value: "",
                  name: "Select Price",
                  disabled: true,
                  selected: true
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
          <select value={state?.Area} name="Area" onChange={handleState}>
            <Option
              data={[
                {
                  value: "",
                  name: "Select Area",
                  disabled: true,
                  selected: true
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
          <button className={classes.searchBtn}>
            <AiOutlineSearch
              className={classes.searchIcon}
              onClick={handleSearch}
            />
          </button>
        </div>
        {filteredProperties?.length > 0 ? (
          <>
            <div className={classes.titles}>
              <h5>Selected properties</h5>
              <h2>Property you may like</h2>
            </div>
            <div className={classes.properties}>
              {filteredProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          </>
        ) : (
          <h2 className={classes.noProperty}>
            We have no properties with the specified options.
          </h2>
        )}
      </div>
    </div>
  );
};

export default Properties;
