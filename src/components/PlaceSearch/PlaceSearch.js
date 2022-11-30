import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { useState } from "react";

const LocationSearch = () => {
  const [address, setAddress] = useState({address:"Los Angeles, USA"});

  const handleChange = (address) => {
    setAddress(address);
    console.log('address',address)
    /*   const locationArray = location.split(",");
    const city = locationArray[0];
    const country = locationArray[locationArray.length - 1].trim();
    setAddress({ city, country });
    console.log("address", address); */
  };
  const handleSelect = () => {
    geocodeByAddress("Los Angeles, CA")
      .then((results) => getLatLng(results[0]))
      .then((latLng) => console.log("Success", latLng))
      .catch((error) => console.error("Error", error));
  };
  console.log('address',address)
  return (
    <article>
      <button onClick={handleSelect}>Get Long</button>
      <PlacesAutocomplete value={address} onChange={handleChange}>
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <section id="places-autocomplete-section">
            <label>Your Location</label>
            <p>
              <input
                type="text"
                name="location"
                required
                {...getInputProps({
                  placeholder: "type city and country",
                  className: "location-search-input",
                })}
              />
            </p>
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion, index) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                const style = suggestion.active
                  ? {
                      backgroundColor: "#18946F",
                      cursor: "pointer",
                      color: "#ffffff",
                    }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                    key={index + 1}
                  >
                    <span className="test-class">{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </PlacesAutocomplete>
    </article>
  );
};

export default LocationSearch;

/*   const handleSelect = (address) => {
    geocodeByAddress(address);
    console
      .log("address", address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => console.log("Success", latLng))
      .catch((error) => console.error("Error", error));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => console.log("Success", latLng))
      .catch((error) => console.error("Error", error));
  }; */
