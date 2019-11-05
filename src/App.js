import React, { useRef, useState } from 'react';
import './App.css';

function App() {
  const slider = useRef(null);
  const [val, setVal] = useState(120);
  const [isLoading, setLoading] = useState(true)
  
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioCtx = new AudioContext();
  let lookahead = 25.0; // How frequently to call scheduling function (in milliseconds)
  let scheduleAheadTime = 0.1; // How far ahead to schedule audio (sec)
  let currentNote = 0;
  let nextNoteTime = 0.0; // when the next note is due.
  let timerID;

  async function getFile(audioContext, filepath) {
    const response = await fetch(filepath);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    return audioBuffer;
  }

  async function setupSample(ctx) {
    const filePath = '1901.mp3';
    const sample = await getFile(ctx, filePath);
    return sample;
  }

  const startHandler = () => {
    setupSample(audioCtx)
    .then((sample) => {
      setLoading(false)
      currentNote = 0;
      nextNoteTime = audioCtx.currentTime;
      scheduler(); // kick off scheduling
    })
  }

  function playSample(audioContext, audioBuffer) {
    const sampleSource = audioContext.createBufferSource();
    sampleSource.buffer = audioBuffer;
    sampleSource.connect(audioContext.destination)
    sampleSource.start();
    return sampleSource;
  }



  function nextNote() {
      const secondsPerBeat = 60.0 / slider.current.value;
      nextNoteTime += secondsPerBeat; 

      currentNote++;
      if (currentNote === 4) {
        currentNote = 0;
      }
  }

  const notesInQueue = [];
  function scheduleNote(beatNumber, time) {
    notesInQueue.push({ note: beatNumber, time: time });
  }

  function scheduler() {
    // while there are notes that will need to play before the next interval, schedule them and advance the pointer.
    while (nextNoteTime < audioCtx.currentTime + scheduleAheadTime ) {
        scheduleNote(currentNote, nextNoteTime);
        nextNote();
    }
    timerID = window.setTimeout(scheduler, lookahead);
  }
 
  const changeHandler = () => {
    setVal(slider.current.value)
  }

  return (
    <div className="App">
      {
        isLoading 
        ? <div>
          loading track
          <button onClick={() => {startHandler()}}>start</button>
          </div>
        : <div>
          slow
          <input 
            ref={slider}
            onChange={() => {changeHandler()}}
            name="bpm"
            id="bpm"
            type="range"
            min="60"
            max="180"
            value={val}
            step="5"
            />
            speedy
          </div>
      
      }
    </div>
  );
}

export default App;
