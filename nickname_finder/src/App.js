import "./App.css";
import Search from "./components/Search";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Nickname Finder</h2>
      </header>
      <div className="App-body">
        <Search/>
      </div>
    </div>
  );
}

export default App;
