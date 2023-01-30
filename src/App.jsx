// import "./App.scss";
import { Component, useEffect, useState } from "react";
import Messages from "./Messages";
import Input from "./Input";
import {
    generateRandomColor,
    generateRandomName,
} from "./util/helperFunctions.js";
import Login from "./Login";

// class App extends Component {

const App = () => {
    // constructor() {
    //     super();

    //     this.state = {
    //         messages: [],
    //         member: {
    //             username: generateRandomName(),
    //             color: generateRandomColor(),
    //         },
    //     };

    //     this.drone = new window.Scaledrone("gkghqFT9XGclvu81", {
    //         data: this.state.member,
    //     }); -------------ODRAĐENO

    //     this.drone.on("open", (error) => {
    //         if (error) {
    //             return console.error(error);
    //         }
    //         const member = { ...this.state.member };
    //         member.id = this.drone.clientId;
    //         this.setState({ member });
    //     });
    //     const room = this.drone.subscribe("observable-room");
    //     room.on("data", (data, member) => {
    //         const messages = this.state.messages;
    //         messages.push({ member, text: data });
    //         this.setState({ messages });
    //     });
    // }

    // const [chat, setChat] = useState({
    //     member: {
    //         username: generateRandomName(),
    //         color: generateRandomColor(),
    //     },
    //     messages: []
    // });

    const initialChatState = {
        member: {
            username: "",
            color: "",
            avatar: "",
        },
        messages: [],
    };

    const [chat, setChat] = useState(initialChatState);
    const [drone, setDrone] = useState(null);

    useEffect(() => {
        if (chat.member.username !== "") {
            const drone = new window.Scaledrone("gkghqFT9XGclvu81", {
                data: chat.member,
            });
            setDrone(drone);
        }
    }, [chat.member]);

    const onSendMessage = (message) => {
        this.drone.publish({
            room: "observable-room",
            message,
        });
    };

    return (
        <>
            {!chat.member.username ? (
                <div className="reg-container">
                    <Login chat={chat} setChat={(obj) => setChat(obj)} />
                </div>
            ) : (
                <div className="App">
                    <div className="App-header">
                        <h1>My Chat App</h1>
                    </div>
                    <Messages
                        messages={chat.messages}
                        currentMember={chat.member}
                    />
                    <Input onSendMessage={onSendMessage} />
                </div>
            )}
        </>

        // <div className="App">
        //     <div className="App-header">
        //         <h1>My Chat App</h1>
        //     </div>
        //     <Messages
        //         messages={chat.messages}
        //         currentMember={chat.member}
        //     />
        //     <Input onSendMessage={onSendMessage} />
        // </div>
    );
};

// render() {
//     return (
//         <div className="App">
//             <div className="App-header">
//                 <h1>My Chat App</h1>
//             </div>
//             <Messages
//                 messages={this.state.messages}
//                 currentMember={this.state.member}
//             />
//             <Input onSendMessage={this.onSendMessage} />
//         </div>
//     );
// };
// }

export default App;
