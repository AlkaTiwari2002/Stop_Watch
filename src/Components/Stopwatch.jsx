import React, { useReducer, useEffect } from "react";
import "./Stopwatch.css";

const initialState = {
  running: false,
  time: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "START":
      return { ...state, running: true };
    case "STOP":
      return { ...state, running: false };
    case "RESET":
      return { running: false, time: 0 };
    case "TICK":
      return { ...state, time: state.time + 1 };
    default:
      return state;
  }
};

const formatTime = (time) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;
  return { hours, minutes, seconds };
};

const Stopwatch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let timer;
    if (state.running) {
      timer = setInterval(() => {
        dispatch({ type: "TICK" });
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [state.running]);

  const { hours, minutes, seconds } = formatTime(state.time);

  return (
    <div className="stopwatch-container">
      <div className="stopwatch">
        <h2>Stop Watch</h2>
        {/* <h1>
          <span>{String(hours).padStart(2, '0')}<label>hr</label></span>:
          <span>{String(minutes).padStart(2, '0')}<label>min</label></span>:
          <span>{String(seconds).padStart(2, '0')}<label>sec</label></span>
        </h1> */}

        <h1>
          <span>
            <div className="time-value">{String(hours).padStart(2, "0")}</div>
            <label>hr</label>
          </span>                                                                                               
          <span>
            <div className="time-value">{String(minutes).padStart(2, "0")}</div>
            <label>min</label>
          </span>
          <span>
            <div className="time-value">{String(seconds).padStart(2, "0")}</div>
            <label>sec</label>
          </span>
        </h1>

        <div className="buttons">
          <button
            onClick={() => dispatch({ type: "START" })}
            disabled={state.running}
          >
            Start
          </button>
          <button
            onClick={() => dispatch({ type: "STOP" })}
            disabled={!state.running}
          >
            Stop
          </button>
          <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;
