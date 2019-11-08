import React from 'react';

/**
 * 
 * props
 * active --- if the step is pressed or not (should play sound)
 * onClick -- click handler that gets passed down
 * id ------- id of the step
 */
const Step = (props) => {

    const stepStyle = {
        width: '10px',
        height: '10px',
        backgroundColor: props.active ? 'black' : 'white',
        border: '2px solid black'
    }

    const handleClick = () => {
        props.onClick(props.id);
    }

    return (
        <div style={stepStyle} onClick={() => handleClick()}>
        </div>
    )
}

export default Step;