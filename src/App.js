import "./App.css";
import CustomCalendar from "./CustomCalendar";

function App() {
  return (
    <div className="floating-window">
      <div className="window-header">
        <div className="window-title">가계부</div>
        <div className="window-controls">
          <div className="window-minimize"></div>
          <div className="window-maximize"></div>
          <div className="window-close"></div>
        </div>
      </div>
      <div className="window-contnet">
        <div>
          <CustomCalendar />
        </div>
      </div>
    </div>
  );
}

export default App;
