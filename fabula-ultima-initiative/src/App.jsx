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

/*for each member of combatants, where their type matches the column title, create a dropdown input*/

const LeftColumn = ({ title, combatants }) => {
  const filteredCombatants = combatants.filter((combatant) => combatant.type === title);
  return (
    <div className="left-column">
      <p className="column-header">{title}</p>
      {filteredCombatants.map((filteredCombatant, index) => (
        <div key={index}>
          <select className="turn-option" key={index}>
            <option value="None">---</option>
            {filteredCombatants.map((filteredCombatantTwo, idx) => (
              <option key={idx} value={filteredCombatantTwo.name}>
                {filteredCombatantTwo.name}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

const RightColumn = ({ title, combatants }) => {
  //the shorthand for ternary operator, going against everything I was taught in my early days
  const header = title === "heroes" ? "foes" : "heroes";
  const filteredCombatants = combatants.filter((combatant) => combatant.type === header);
  return (
    <div className="right-column">
      <p className="column-header">{header}</p>
      {filteredCombatants.map((filteredCombatant, index) => (
        <div key={index}>
          <select className="turn-option" key={index}>
            <option value="None">---</option>
            {filteredCombatants.map((filteredCombatantTwo, idx) => (
              <option key={idx} value={filteredCombatantTwo.name}>
                {filteredCombatantTwo.name}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

//options column, contains spots for radiogroup for priority, table for adding/removing
const OptionsColumn = ({ playerInitiative, setPlayerInitiative, combatants, setCombatants }) => {
  return (
    <div className="options-column">
      <p className="column-header">Options</p>
      <RadioGroup
        selectedValue={playerInitiative}
        onValueChange={setPlayerInitiative}
        name="initiativePriority"
      />
      <CombatantManager combatants={combatants} setCombatants={setCombatants} />
    </div>
  );
};

const CombatantManager = ({ combatants, setCombatants }) => {
  const addCombatant = () => {
    setCombatants([...combatants, { id: Date.now(), name: "", type: "heroes" }]);
  };

  const removeCombatant = (id) => {
    setCombatants(combatants.filter((combatant) => combatant.id !== id));
  };

  //allows for changing one item in a bunch
  const updateCombatant = (id, field, value) => {
    setCombatants(
      combatants.map((combatant) =>
        combatant.id === id ? { ...combatant, [field]: value } : combatant
      )
    );
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Heroes</td>
            <td>Foes</td>
            <td>Remove</td>
          </tr>
        </thead>
        <tbody>
          {combatants.map((combatant) => (
            <tr key={combatant.id}>
              <td>
                <input
                  type="text"
                  placeholder="Name"
                  value={combatant.name}
                  onChange={(e) => updateCombatant(combatant.id, "name", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="radio"
                  name={`type-${combatant.id}`}
                  value="heroes"
                  checked={combatant.type === "heroes"}
                  onChange={(e) => updateCombatant(combatant.id, "type", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="radio"
                  name={`type-${combatant.id}`}
                  value="foes"
                  checked={combatant.type === "foes"}
                  onChange={(e) => updateCombatant(combatant.id, "type", e.target.value)}
                />
              </td>
              <td>
                <button onClick={() => removeCombatant(combatant.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addCombatant}>Add</button>
    </>
  );
};

const App = () => {
  const [playerInitiative, setPlayerInitiative] = useState("");
  const [combatants, setCombatants] = useState([]);

  return (
    <div className="app">
      <Banner />
      <div className="main-content">
        <LeftColumn title={playerInitiative} combatants={combatants} />
        <RightColumn title={playerInitiative} combatants={combatants} />
        <OptionsColumn
          playerInitiative={playerInitiative}
          setPlayerInitiative={setPlayerInitiative}
          combatants={combatants}
          setCombatants={setCombatants}
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
