import React from 'react';
import Step from './step';

/**
 * props
 * steps -- array of steps to render
 */
const Steps = (props) => {

    const stepsStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '20px auto',
        width: '50%'
    }

    return (
        <div style={stepsStyle}>
            {props.steps.map((step, id) => {
                return (
                    <Step
                        active={step}
                        onClick={props.handleStepChange}
                        key={id}
                        id={id}
                    />
                )
            })}
        </div>
    )
}

export default Steps;