import "./App.scss";
import { Component } from "react";
import Messages from "./Messages";
import Input from "./Input";
import {generateRandomColor, generateRandomName} from './util/helperFunctions.js'


class App extends Component {
    constructor() {
        super();

        this.state = {
            messages: [],
            member: {
                username: generateRandomName(),
                color: generateRandomColor(),
            },
        };

        this.drone = new window.Scaledrone("gkghqFT9XGclvu81", {
            data: this.state.member,
        });
        this.drone.on("open", (error) => {
            if (error) {
                return console.error(error);
            }
            const member = { ...this.state.member };
            member.id = this.drone.clientId;
            this.setState({ member });
        });
        const room = this.drone.subscribe("observable-room");
        room.on("data", (data, member) => {
            const messages = this.state.messages;
            messages.push({ member, text: data });
            this.setState({ messages });
        });
    }


    onSendMessage = (message) => {
        this.drone.publish({
            room: "observable-room",
            message,
        });
    };

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h1>My Chat App</h1>
                </div>
                <Messages
                    messages={this.state.messages}
                    currentMember={this.state.member}
                />
                <Input onSendMessage={this.onSendMessage} />
            </div>
        );
    }
}

export default App;
