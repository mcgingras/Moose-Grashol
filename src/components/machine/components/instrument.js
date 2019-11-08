import React, {useState, useEffect} from 'react';
import Steps from './steps';

// tone api
import { Transport, Time } from 'tone';

const Instrument = (props) => {

    const [steps, setSteps] = useState(Array(16).fill(false));
    const [loopId, setLoopId] = useState(null)

    const handleStepChange = (id) => {
        const s = [...steps];
        s[id] = !s[id];
        setSteps(s);
    }

    const createLoop = () => {
        if(!steps){return};
        Transport.clear(loopId);
        
        const loop = (time) => {
            steps.forEach((step, i) => {
                if(step){
                    props.sound.trigger(time + i * Time('16n').toSeconds())
                }
            });
        }

        setLoopId(Transport.schedule(loop, "0"));
    }


    useEffect(() => {
        createLoop();
    }, [steps]);


    return (
        <div>
            <Steps steps={steps} handleStepChange={handleStepChange} />
        </div>
    )
}

export default Instrument;