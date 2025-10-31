import { useState } from "react";
import "./App.css";

const Banner = () => {
  return (
    <div className="banner">
      <h1>Fabula Ultima Combat Tracker</h1>
    </div>
  );
};

//a React Component that creates a radiogroup of the provided array of items and lifts their state
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

//component for left column
//This component should render a title of Heroes or Foes, and then provide a number of dropdown
//boxes equal to the number of combatants in the relevant category. Each dropdown box should
//contain all characters of that category.
//unsure how at this time, but there should be a line pointing from the bottom right of every
//box in the left column if there is a matching one in the right column
const LeftColumn = ({ title }) => {
  return (
    <div className="left-column">
      <p className="column-header">{title}</p>
    </div>
  );
};

const RightColumn = ({ title }) => {
  //the shorthand for ternary operator, going against everything I was taught in my early days
  const header = title === "heroes" ? "foes" : "heroes";
  return (
    <div className="right-column">
      <p className="column-header">{header}</p>
    </div>
  );
};

//table. Columns of table are: Name, Hero or Foe, and Remove
//Name: Text Hero: Radio Foe: Radio (both in radio group), Remove: Button
const CombatantTable = ({ players }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Hero</td>
            <td>Foe</td>
            <td>Remove</td>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={index}>
              <td>
                {player.name}
                {/*EDITABLE INPUT*/}
              </td>
              <td>{/* HEROES RADIO BOX */}</td>
              <td>{/* FOES RADIO BOX */}</td>
              <td>{/* REMOVE BUTTON*/}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button>Add</button>
      {/* ADD NEW CHARACTER BUTTON */}
    </div>
  );
};

//options column, contains spots for radiogroup for priority, table for adding/removing
const OptionsColumn = ({ playerInitiative, setPlayerInitiative, combatants }) => {
  return (
    <div className="options-column">
      <p className="column-header">Options</p>
      <RadioGroup
        selectedValue={playerInitiative}
        onValueChange={setPlayerInitiative}
        name="initiativePriority"
      />
      <CombatantTable players={combatants} />
    </div>
  );
};

const App = () => {
  const [playerInitiative, setPlayerInitiative] = useState("");
  const [combatants, setCombatants] = useState([]);

  return (
    <div className="app">
      <Banner />
      <div className="main-content">
        <LeftColumn title={playerInitiative} />
        <RightColumn title={playerInitiative} />
        <OptionsColumn
          playerInitiative={playerInitiative}
          setPlayerInitiative={setPlayerInitiative}
        />
      </div>
    </div>
  );
};

export default App;

/*          <p>Thing 3</p>
          <RadioGroup
            selectedValue={playerInitiative}
            onValueChange={setPlayerInitiative}
            name="initiativePriorty"
          />*/
