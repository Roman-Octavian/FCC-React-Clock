import React from "react";
import ReactDOM from "react-dom";
import './styles.css';

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id="App">
                <h1>Hello React!</h1>
            </div>
        );
    }
}

ReactDOM.render(
    <App />, document.getElementById("root")
) 