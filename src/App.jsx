import "./App.scss";
import { useEffect, useState } from "react";
import Messages from "./Messages";
import Input from "./Input";
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

    const initChatState = {
        member: {
            username: "",
            color: "",
            avatar: "",
        },
        messages: [],
    };

    const [chat, setChat] = useState(initChatState);
    const [initMemberId, setInitMemberId] = useState(null);
    const [members, setMembers] = useState({ online: [] });
    const [drone, setDrone] = useState(null);

    useEffect(() => {
        if (chat.member.username !== "") {
            const drone = new window.Scaledrone("gkghqFT9XGclvu81", {
                data: chat.member,
            });
            setDrone(drone);
        }
    }, [chat.member]);

    useEffect(() => {
        const droneEvents = () => {
            drone.on("open", (error) => {
                if (error) {
                    return console.error(error);
                }
                chat.member.id = drone.clientId;
                if (initMemberId === null) {
                    setInitMemberId(drone.clientId);
                }
                roomEvents();
            });
        };

        const roomEvents = () => {
            const room = drone.subscribe("observable-room");
            room.on("open", (error) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log("Connected to the room");
                }
            });
            room.on("members", (m) => { //Emits an array of members that have joined the room. This event is only triggered once, right after the user has successfully connected to the observable room -> list of members as ARRAY
                setMembers((prevMembers) => ({
                    ...prevMembers,
                    online: m,
                }));
            });
            room.on("member_join", (newMember) => { //Member join event is emitted when a new member joins the room - returns member OBJECT
                setMembers((prevMembers) => ({
                    ...prevMembers,
                    online: [...prevMembers.online, newMember],
                }));
            });
        };
    });

    // if(drone && !chat.member.id) {
    //     droneEvents();
    // }

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
