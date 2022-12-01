import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { useState } from "react";

const LocationSearch = ({handleChange,handleSelect, address }) => {

  return (
      <PlacesAutocomplete value={address} onChange={handleChange} onSelect={handleSelect}>
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
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className
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
