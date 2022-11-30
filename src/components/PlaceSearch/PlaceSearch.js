import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { useState } from "react";

const LocationSearch = () => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState({ city: "", country: "" });

  const handleChange = (location) => {
    setLocation(location);
console.log("addres", address);
    const locationArray = location.split(",");
    const city = locationArray[0];
    const country = locationArray[locationArray.length - 1].trim();
    setAddress({ city, country });
    console.log('address',address)
  };

  const handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => console.log("Success", latLng))
      .catch((error) => console.error("Error", error));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("whee");
  };

  return (
    <PlacesAutocomplete
      value={location}
      onChange={handleChange}
      onSubmit={onSubmit}
    >
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
                    style
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
  );
};

export default LocationSearch;
