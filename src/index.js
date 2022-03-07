import React from "react";
import ReactDOM from "react-dom";
import './styles.css';
import 'bootstrap/dist/css/bootstrap.css';

let timer;

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            min: 25,
            sec: 0,
            on: true,
            bl: 5,
            sl: 25
        };
        this.tick = this.tick.bind(this);
        this.formatTime = this.formatTime.bind(this);
        this.toggle = this.toggle.bind(this);
        this.timerOnOff = this.timerOnOff.bind(this);
        this.reset = this.reset.bind(this);
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.break = this.break.bind(this);
        this.outOfBreak = this.outOfBreak.bind(this);
        this.beep = this.beep.bind(this);
    }

    timerOnOff() {
        if (this.state.on) {
            timer = setInterval(() => this.tick(), 1000);
        }
        else if (!this.state.on) {
            clearInterval(timer);
        }
    }

    tick() {
        if (document.getElementById("time-left").innerHTML == "00:00" && document.getElementById("timer-label").innerHTML == "Session") {
            this.beep(true);
            this.break();
        } else if (document.getElementById("time-left").innerHTML == "00:00" && document.getElementById("timer-label").innerHTML == "Break") {
            this.beep(true);
            this.outOfBreak();
        }

        if (this.state.sec > 0 && document.getElementById("time-left").innerHTML != "00:00") {
            this.setState(state => ({
                sec: state.sec - 1
            }));
        } else if (document.getElementById("time-left").innerHTML != "00:00") {
            this.setState(state => ({
                min: state.min - 1,
                sec: 59
            }));
        }
    }

    formatTime() {
        let m;
        let s;

        if(this.state.sec <= 9) {
            s = "0" + this.state.sec;
        } else {
            s = this.state.sec;
        }

        if(this.state.min <= 9) {
            m = "0" + this.state.min;
        } else {
            m = this.state.min;
        }

        return m + ":" + s;
        
    }

    toggle() {
        this.setState({
            on: !this.state.on
        });
        this.timerOnOff();
    }

    reset() {
        this.beep(false);
        clearInterval(timer);
        document.getElementById("timer-label").innerText = "Session";
        this.setState({
            min: 25,
            sec: 0,
            on: true,
            bl: 5,
            sl: 25
        });
    }

    increment(id) {
        if (id == "session-increment" && this.state.on && this.state.sl < 60) {
            this.setState({
                sl: this.state.sl + 1,
                min: this.state.sl + 1
            });
        } else if (id == "break-increment" && this.state.on && this.state.bl < 60) {
            this.setState({
                bl: this.state.bl + 1,
            });
        }
    }

    decrement(id) {
        if (id == "session-decrement" && this.state.on && this.state.sl > 1) {
            this.setState({
                sl: this.state.sl - 1,
                min: this.state.sl - 1
            });
        } else if (id == "break-decrement" && this.state.on && this.state.bl > 1) {
            this.setState({
                bl: this.state.bl - 1,
            });
        }
    }

    break() {
        document.getElementById("timer-label").innerText = "Break";
        this.setState({
            min: this.state.bl,
            sec: 1
        });
    }

    outOfBreak() {
        document.getElementById("timer-label").innerText = "Session";
        this.setState({
            min: this.state.sl,
            sec: 1
        });
    }

    beep(bool) {
        if (bool) {
            document.getElementById("beep").currentTime = 0;
            document.getElementById("beep").play();
        }
        else {
            document.getElementById("beep").pause();
            document.getElementById("beep").currentTime = 0;
        }
    }

    render() {
        return(
            <div id="timer">
                <h1 id="session-heading" className="display-1">25 + 5 CLOCK</h1>
                <div id="session-div">
                    <div id="break-label">
                        <p id="break-text" className="label-text control-element">Break Length</p>
                        <button onClick={() => {this.increment("break-increment")}} id="break-increment" className="btn btn-light control-element">+</button>
                        <p id="break-length" className="display-6 control-element">{this.state.bl}</p>
                        <button onClick={() => {this.decrement("break-decrement")}} id="break-decrement" className="btn btn-dark control-element">-</button>
                    </div>

                    <div id="timer-circle">
                        <div id="timer-label">Session</div>
                        <div id="time-left">{this.formatTime()}</div>
                    </div>

                    <div id="session-label">
                        <p id="session-text" className="label-text control-element">Session Length</p>
                        <button onClick={() => {this.increment("session-increment")}} id="session-increment" className="btn btn-light control-element">+</button>
                        <p id="session-length" className="display-6 control-element">{this.state.sl}</p>
                        <button onClick={() => {this.decrement("session-decrement")}} id="session-decrement" className="btn btn-dark control-element">-</button>
                    </div>

                </div>
                <div id="buttons">
                    <button onClick={() => {this.toggle()}} id="start_stop" className="btn btn-primary btn-lg">START</button>
                    <button onClick={this.reset} id="reset" className="btn btn-danger btn-lg">RESET</button>
                </div>
                <audio src={process.env.PUBLIC_URL + '/beep.wav'} id="beep"></audio>
            </div>
        )
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id="app-div">
                <Timer />
            </div>
        );
    }
}

ReactDOM.render(
    <App />, document.getElementById("root")
)