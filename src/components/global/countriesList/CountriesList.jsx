import React from "react";
import Country from "./Country";
import { v4 as uuidv4 } from "uuid";

function CountriesList({ countries }) {
  return countries.map((country) => {
    return <Country data={country} key={uuidv4()} />;
  });
}

export default CountriesList;
