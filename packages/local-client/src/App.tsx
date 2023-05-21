import { Provider } from "react-redux";
import { store } from "./state";
import CellList from "./components/cell-list";
function App() {
  return (
    <Provider store={store}>
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: "bolder",
          textAlign: "center",
          marginBottom: "2rem",
          marginTop : "2rem"
        }}
      >
        🚀ReactPen
      </h1>
      <div>
        <CellList />
      </div>
    </Provider>
  );
}

export default App;
