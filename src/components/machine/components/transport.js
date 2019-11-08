import React, {useState} from 'react';

// components
import Instrument from './instrument';
import PlayPause from './play';
import { Transport } from 'tone';

// instruments
import { Kick } from '../engines/kick';
import { Snare } from '../engines/snare';
import { Hat } from '../engines/hat';

const TransportComponent = () => {
    Transport.loop = true;
    Transport.loopEnd = '1m';
    const ctx = new AudioContext();

    const play = () => {
        Transport.start();
    }

    const pause = () => {
        Transport.stop();
    }

    return (
        <div>
            <Instrument sound={new Kick(ctx)} />
            <Instrument sound={new Snare(ctx)} />
            <Instrument sound={new Hat(ctx)} />
            <PlayPause play={play} pause={pause} />
        </div>
    )
}

export default TransportComponent;