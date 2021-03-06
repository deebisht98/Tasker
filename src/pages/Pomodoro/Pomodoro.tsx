import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Confetti from "react-confetti";
import { Todo } from "../../components/model/model";
import { MdDone, MdWest } from "react-icons/md";
import { useDispatch } from "react-redux";
import { finishTodo } from "../../store/actions";
import { MdRestartAlt } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";

// CALL IT ONCE IN YOUR APP
import "./Pomodoro.css";
let win = require("../../win.mp3");

if (typeof window !== "undefined") {
  injectStyle();
}
interface propState {
  data: Todo;
}

type activeType = {
  info: string;
  minutes: any;
  seconds: any;
};
// let uso =
//   "data:audio/mp3;base64,SUQzAwAAAAAfdlBSSVYAAAAOAABQZWFrVmFsdWUA/n8AAFBSSVYAAAARAABBdmVyYWdlTGV2ZWwAkicAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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JEeBvT5xkWdEoF/asrq3xbePjW6v965r0jpZwxSOZkHJW2t6i29vr3i8FRGICBwHAAomU1lxsDsclCRRbBEKn5dj/rDx6bYcsXtkQAAkJEpEpUXGw5Xkpj49JVG0oA+1rmNesuW9ztqj03ZiIzC+eRMoUBHBYTPAjTjAo6lr5NDNE49p1aswlT1JY1u3ur2NU9lQAQAiJqpcwyK8tj86RAVbrebCRgLDJ3B/cfm4n4nu2tRuMhcjScbrLSAmS7Vsz/n9+5mW+ZLzup6sNAH0BaZpprwXyYrLmMwqm3ef8///vlmKk//95jkQCAiRKRKUFh9OwkhHwdSqgIys6KVlR6Ps1t/L88/7ld7fIrfl0cPQ4CPDm0gtB1pWt0Elu40Xpegm629lUsL2L4j35WpARAhJCq6mK2EEVaQh3av/oQK+MkEeJJNTGLbLQVosnUpFfQI/QCW7MFEjO6OlZWFIBEx0EKwynXJ0HCiMNdavkff/+pNEchJvgAKxKVTx6zLaRiM6jzFmSQsE20nGNGthMwzpfJYhJFNiOGhwwoBCpJQZCbA0eyK+RqW60teKqgJGRptpt4JNgqSWDwSshJCdoEXbNUerOLstOrM0j0mtrANgXM9MrE9mnSY8YFDYUBpq9YTSdEQGnVBVy8Kiz26JVxIGNT/VmRFLcXwECm1VKAfbihWB9DifuGNH8c4CSBomrd6+s+nexYL3Va6smFQRM1GKqFlUUsqopWqzaEs+1pw2NXGVLImrzygRItNy7LCuKKwhsJ435QX///yf53Gkz7fwKaUaAJJKSRMYGfWcDoRoWSUkU4BmPMtqEtzl7Zi+uvHxxE8hZWRIc0qGWbjG49VCk1v955fLVkHQFPK+Isi3Cgdyvhzlixv///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////qTRMOQjIAC1CZLYe9KWkSkCU0x6UgAAAEuAAAAIAAAJcAAAAT///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/6k0R6YfqAC5AAS4AAAAgAAAlwAAABAAABLgAAACAAACXAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABUQUcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgDA==";

const Pomodoro: React.FC = () => {
  const location = useLocation();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  let { data } = location.state as propState;
  const [show, setShow] = useState<boolean>(false);
  const [showRestart, setShowRestart] = useState<boolean>(false);
  const [startTimer, setStartTimer] = useState<boolean>(false);
  const [currType, setCurrType] = useState<activeType>({
    info: "pomo",
    minutes: "25",
    seconds: "00",
  });

  const resetTimer = () => {
    if (currType.info === "pomo") {
      setCurrType({ info: "pomo", minutes: "25", seconds: "00" });
    } else if (currType.info === "short")
      setCurrType({ info: "short", minutes: "05", seconds: "00" });
    else setCurrType({ info: "long", minutes: "15", seconds: "00" });
  };

  useEffect(() => {
    let timer: any;
    const startCounter = () => {
      let minute = currType.minutes;
      let sec = currType.seconds;
      timer = setInterval(function () {
        // let tickSound = new Audio(uso);
        // tickSound.volume = 1;
        // tickSound.play();

        sec--;
        if (sec === -1) {
          minute--;
          if (minute < 10) {
            minute = "0" + minute;
          }
          sec = 59;
        } else if (sec < 10) {
          sec = "0" + sec;
        }
        if (minute === "00" && sec === "00") {
          toast.dark(
            "Congratulations!!! You have successfully completed the pomodoro."
          );
          clearInterval(timer);
          setStartTimer(!startTimer);
          setShowRestart(true);
          resetTimer();
          if (currType.info === "pomo") {
            setShow(true);
            let myAudio = new Audio(win);
            myAudio.play();
          }
        }
        setCurrType({ ...currType, minutes: minute, seconds: sec });
      }, 1000);
    };
    if (startTimer) {
      startCounter();
    }
    return () => {
      clearInterval(timer);
    };
  }, [startTimer]);

  const finishTask = () => {
    dispatch(finishTodo(data.id, data.todo));
    navigate("/Tasker");
  };

  return (
    <>
      <ToastContainer />
      <div className="todo_wrapper">
        <div className="todo_header_wrapper">
          <p className="todo_heading">{data.todo}</p>
          <div className="todo_btns">
            <div className="finish" onClick={() => navigate("/Tasker")}>
              <MdWest />
              <p>Finish Later</p>
            </div>
            <div className="finish" onClick={finishTask}>
              <p>Finish Task</p>
              <MdDone />
            </div>
          </div>
        </div>
        {show && (
          <div className="confetti">
            <Confetti
              recycle={true}
              numberOfPieces={200}
              width={window.innerWidth}
              height={window.innerHeight}
            />
          </div>
        )}
        <div className="timer">
          <div className="types">
            <button
              className={`type ${currType.info === "pomo" ? "curr" : ""}`}
              onClick={() => {
                if (!startTimer) {
                  setCurrType({ info: "pomo", minutes: "25", seconds: "00" });
                } else {
                  toast.dark("Please stop the timer to take the break.");
                }
              }}
            >
              Pomodoro
            </button>
            <button
              className={`type ${currType.info === "short" ? "curr" : ""}`}
              onClick={() => {
                if (!startTimer) {
                  setCurrType({ info: "short", minutes: "05", seconds: "00" });
                } else {
                  toast.dark("Please stop the timer to take the break.");
                }
              }}
            >
              Short Break
            </button>
            <button
              className={`type ${currType.info === "long" ? "curr" : ""}`}
              onClick={() => {
                if (!startTimer) {
                  setCurrType({ info: "long", minutes: "15", seconds: "00" });
                } else {
                  toast.dark("Please stop the timer to take the break.");
                }
              }}
            >
              Long Break
            </button>
          </div>
          <div className="time">
            {currType.minutes}:{currType.seconds}
          </div>
          {showRestart ? (
            <button
              className="start"
              onClick={() => {
                resetTimer();
                setShowRestart(false);
                setShow(false);
                setStartTimer(!startTimer);
              }}
            >
              RESTART
            </button>
          ) : (
            <button
              className="start"
              onClick={() => setStartTimer(!startTimer)}
            >
              {!startTimer ? `START` : `STOP`}
            </button>
          )}

          {startTimer && (
            <div
              className="reset"
              onClick={() => {
                setStartTimer(!startTimer);
                resetTimer();
              }}
            >
              <p>Reset</p>
              <MdRestartAlt />
            </div>
          )}
        </div>
        <p>Please take a short break after completing each pomodoro.</p>
      </div>
    </>
  );
};

export default Pomodoro;
