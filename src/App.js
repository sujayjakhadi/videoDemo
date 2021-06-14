import './App.css';
import cx from "classnames";
import {useState, useRef} from 'react';

function App() {
  const quadrantObj = [
    {id: 1, position: "top-left"},
    {id: 2, position: "top-right"},
    {id: 3, position: "bottom-left"},
    {id: 4,position: "bottom-right"},
  ]; // Change this to increase quadrants
  const [dropDiv, setDropDiv] = useState(3);
  const [dropHighlight, setDropHighlight] = useState(3);
  const videoRef = useRef()

  const onDragStart = () => {
    videoRef.current.pause();
  }

  const dragOver = (e, q) => {
    setDropHighlight(q.id);
    e.preventDefault();
  }

  const onDrop = (q) => {
    setDropHighlight(null);
    setDropDiv(q.id);
  }

  const onVideoClick = () => {
    if(!videoRef.current.paused) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  }

  return (
    <div className="App">
      <div className="main-container">
        {quadrantObj.map((q, index) => {
          return<>
            <div onDragOver={(e) => dragOver(e, q)} onDrop={() => onDrop(q)} className ={cx({"highlighted": dropHighlight===q.id}, `q-${index}`,'quadrant')}></div>
            {q.id === dropDiv && 
            <div className={cx("video-div", q.position)}>
              <video ref={videoRef} draggable onDragStart={onDragStart} onClick={onVideoClick} loop  width="200" height="300px">
                <source src="./tennis.mp4" type="video/mp4" />
              </video>
            </div>
        }
          </>
        }
        )}
      </div>
    </div>
  );
}

export default App;
