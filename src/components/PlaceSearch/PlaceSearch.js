import React from "react";
import PlacesAutocomplete from "react-places-autocomplete";
//import { useState } from "react";

const LocationSearch = ({ handleChange, handleSelect, address }) => {
  return (
    <PlacesAutocomplete value={address} onChange={handleChange} onSelect={handleSelect}>
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <section id="places-autocomplete-section">
          <label>Location</label>
          <p>
            <input
              type="text"
              name="location"
              placeholder="type city and country"
              required
              {...getInputProps({
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
