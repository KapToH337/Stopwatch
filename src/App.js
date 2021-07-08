import React, { useEffect, useState, useCallback } from 'react';

import './App.css';

export const App = () => {
  const [time, setTime] = useState({hour: 0, minute: 0, second: 0});

  const [start, setStart] = useState(false);
  const [check, setCheck] = useState(false);

  const [id, setId] = useState(0);
  const [count, setCount] = useState(0);

  const timer = useCallback((work = true) => {
    if (!work) {
      time.second = -1;
      time.minute = 0;
      time.hour = 0;
    }

    if (time.second < 59) {
      time.second++;
    } else if (time.second === 59) {
      time.second = 0;
      time.minute++;
    }

    if (time.minute === 60) {
      time.minute = 0;
      time.hour ++;
    }

    return {hour: time.hour, minute: time.minute, second: time.second};
  }, []);

  const inter = useCallback(() => {
    if (start) {
      setTime(timer());
    }
  }, [timer, start]);

  useEffect(() => {
    const interId = setInterval(inter, 1000);

    findId(interId);
  }, [inter]);

  const findId = (id) => {
    setId(id);
  };

  return (
    <div className="App">
      {time.hour < 10 && '0'}{time.hour}
      :{time.minute < 10 && '0'}{time.minute}
      :{time.second < 10 && '0'}{time.second}

      <br></br>

      <button
        onClick={() => {
          if (!start) {
            setStart(true);
          }
          if (check) {
            setCheck(false);
            findId(setInterval(inter, 1000));
          }
        }}
      >
        Start
      </button>

      {start && (
        <>
          <button
            onClick={() => {
              timer(false);
              setCheck(true);
              setTime({hour: 0, minute: 0, second: 0});
              clearInterval(id);
            }}
          >
            Stop
          </button>

          <button
            onClick={() => {
              setCount(count + 1);
              setCheck(true);

              setTimeout(() => {
                if (count < 1) {
                  setCount(0)
                } else {
                  clearInterval(id);
                }
              }, 300)
            }}
          >
            Wait
          </button>

          <button
            onClick={() => {
              timer(false);
              setTime({hour: 0, minute: 0, second: 0});

              if (check) {
                setCheck(false);
                findId(setInterval(inter, 1000));
              }
            }}
          >
            Reset
          </button>
        </>
      )}
    </div>
  );
}
