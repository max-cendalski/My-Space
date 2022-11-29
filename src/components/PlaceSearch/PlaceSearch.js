import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

class LocationSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: "" };
  }

  handleChange = (address) => {
    this.setState({ address });
  };

  handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => console.log("Success", latLng))
      .catch((error) => console.error("Error", error));
  };

  onSubmit = (e) => {
    e.preventDefault()
    console.log('whee')
  }


  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSubmit ={this.onSubmit}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <section id="places-autocomplete-section">
            <label className="review-score-label">Your Location</label>
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
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? {
                      backgroundColor: "#1c861c",
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
    );
  }
}


export default LocationSearch
