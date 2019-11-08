import React, { useRef, useState } from 'react';
import Tone, { Player } from 'tone';


// should we try to structure something as a hook?
// TODO: look into the best way to structure hooks.
// how do we have tone.part etc.
// where is the abstraction for the one cue points vs all of the tracks that can be added.

// need to keep these out of the component or else they get in the way of the render loop
let song = "ding.wav"
let player = new Player(song).toMaster();
player.loop = true;
// Tone.Transport.start();

function PlayerControl() {
    const bpmSlider = useRef(null);
    const [bpm, setBpm] = useState(1);
    const [min, setMin] = useState(null);
    const [max, setMax] = useState(null);
    
    const changeLoop = (index) => {
        // scrapping max for now bc the logic for that is slightly complicated...
        // just want to test what its like to modify the loop.
        setMin(index);
        player.setLoopPoints(index);
        console.log(Tone);
    
        // if(index >= max){
        //     setMax(index);
        // }
        // else{
        //     setMin(index);
        // }
    }

    const createSquares = (duration) => {
        let squareArray = [];
        for (let index = 0; index < duration; index++) {
            squareArray.push(
            <div 
                onClick={() => changeLoop(index)}
                className={min >= index ? 'player--block-filled player--block' : 'player--block'}>
            </div>) 
        }
        return (
            <div className="player--container">
                {squareArray}
            </div>
        )
    }

    const changeHandler = () => {
        setBpm(bpmSlider.current.value);
        player.playbackRate = bpmSlider.current.value;
      }
    
      const play = () => {
        player.start();
      }
    
      const pause = () => {
        player.stop();
      }


    return (
        <div>
            <input 
            type="range"
            name="bpm"
            min=".5" max="2"
            step=".01"
            ref={bpmSlider}
            value={bpm}
            onChange={() => {changeHandler()}} />
            <button onClick={() => {play()}}>play</button>
            <button onClick={() => {pause()}}>stop</button>
            <button onClick={() => console.log(Tone.Transport.position)}>position</button>
            {createSquares(parseInt(player.buffer.duration))}
        </div>
    )
}

export default PlayerControl;