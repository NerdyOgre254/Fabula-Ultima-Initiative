import { useState } from "react";
import "./App.css";

const Banner = () => {
  return (
    <div className="banner">
      <h1>Fabula Ultima Combat Tracker</h1>
    </div>
  );
};

const RadioGroup = ({ selectedValue, onValueChange, name }) => {
  const options = [
    { value: "heroes", label: "Heroes" },
    { value: "foes", label: "Foes" },
  ];

  return (
    <div>
      {options.map((option) => (
        <label key={option.value}>
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={(e) => onValueChange(e.target.value)}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

//TODO: Turn PrimaryColumn and SecondaryColumn into their own components and get rendering for choices made done there
const App = () => {
  const [playerInitiative, setPlayerInitiative] = useState("");

  return (
    <div className="app">
      <Banner />
      <div className="main-content">
        <div className="primary-column"></div>
        <div className="secondary-column">Thing 2</div>
        <div className="options-column">
          <p>Thing 3</p>
          <RadioGroup
            selectedValue={playerInitiative}
            onValueChange={setPlayerInitiative}
            name="initiativePriorty"
          />
        </div>
      </div>
    </div>
  );
};

export default App;
