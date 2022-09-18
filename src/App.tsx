import { AgendaPage } from "./pages";
import AgendaContext from "./contexts/AgendaContext";
import { Navbar } from "./components";

function App() {
  return (
    <div className="App w-full h-full">
      <Navbar />
      <AgendaContext>
        <AgendaPage />
      </AgendaContext>
    </div>
  );
}

export default App;
