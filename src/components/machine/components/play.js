import React, {useState} from 'react';

const PlayPause = (props) => {

    const [isPlaying, setPlaying] = useState(false);

    const handleClick = () => {
        if(isPlaying){
            props.pause();
        }
        else{
            props.play();
        }
        setPlaying(!isPlaying);
    }

    return (
        <div onClick={() => {handleClick()}}>
            {isPlaying ? 'pause' : 'play'}
        </div>
    )
}

export default PlayPause;