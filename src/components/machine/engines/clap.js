export class Clap {

    /**
     * 
     * @param {audioContext} ctx 
     */
    constructor(ctx){
        this.ctx = ctx;
        this.pulseWidth = 0.025;
        this.tone = 130;
        this.decay = .3;
        this.volume = 1;
    }

    setup(){
        this.noise = this.ctx.createBufferSource();
        this.noise.buffer = this.noiseBuffer();
        this.filter = this.ctx.createBiquadFilter();
        this.filter.type = 'bandpass';
        this.filter.frequency.value = this.tone * 2;
        this.envelope = this.ctx.createGain();


        this.noise.connect(this.filter);
        this.filter.connect(this.envelope);

        this.envelope.connect(this.ctx.destination);
    }

    noiseBuffer() {
        var bufferSize = this.ctx.sampleRate;
        var buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        var output = buffer.getChannelData(0);

        for (var i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }
        return buffer;
    }

    trigger(time){
        if (this.volume == 0) { return };
        this.setup();
        this.envelope.gain.setValueAtTime(this.volume, time);
        this.envelope.gain.exponentialRampToValueAtTime(0.1, time + this.pulseWidth);

        this.envelope.gain.setValueAtTime(this.volume, time + this.pulseWidth);
        this.envelope.gain.exponentialRampToValueAtTime(0.1, time + 2 * this.pulseWidth);

        this.envelope.gain.setValueAtTime(this.volume, time + 2 * this.pulseWidth);
        this.envelope.gain.exponentialRampToValueAtTime(0.001, time + this.decay);


        this.noise.start(time)
        this.noise.stop(time + this.decay);
    }

    setTone(tone){
        this.tone = tone;
    }

    setVolume(volume){
        this.volume = volume;
    }
}


