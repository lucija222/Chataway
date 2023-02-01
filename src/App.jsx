import "./App.scss";
import { useEffect, useState } from "react";
// import Messages from "./Messages";
// import Input from "./Input";
import Login from "./Login";
import { CHANNEL_ID } from "./util/channel";
import ChatHeader from "./ChatHeader";

const App = () => {
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
    const [isTyping, setIsTyping] = useState({ users: [] });
    const [drone, setDrone] = useState(null);

    useEffect(() => {
        if (chat.member.username !== "") {
            const drone = new window.Scaledrone(CHANNEL_ID, {
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
            room.on("members", (m) => {
                //Emits an array of members that have joined the room. This event is only triggered once, right after the user has successfully connected to the observable room -> list of members as ARRAY
                setMembers({ online: m });
            });
            room.on("member_join", (newMember) => {
                //Member join event is emitted when a new member joins the room - returns member OBJECT
                setMembers((prevMembers) => ({
                    ...prevMembers,
                    online: [...prevMembers.online, newMember],
                }));
            });
            room.on("member_leave", ({ id }) => {
                //Member leave event is emitted when a member leaves the room.
                const index = members.online.findIndex(
                    (member) => member.id === id
                );
                const newMembers = {
                    ...members,
                    online: [
                        ...members.online.slice(0, index),
                        ...members.online.slice(index + 1),
                    ],
                };
                setMembers(newMembers);
            });
            room.on("message", (message) => {
                receiveMessage(message);
            });
        };

        const receiveMessage = (message) => {
            // const {data, id, timestamp, clientId, member} = message;
            if (
                message.data.indexOf(message.clientId) === 0 || //If index of clientId from who sent the message === 0
                message.data.indexOf(message.member.clientData.id) === 0 //And unique message id === 0
            ) {
                if (
                    message.data.charAt(message.data.length - 1) === "1" && //If last character is equal to "1" ------ WHY?
                    message.data.indexOf(chat.member.id) === -1 //And id is not present in the message.data string
                ) {
                    console.log(
                        message.data.charAt(message.data.length - 1) === "1"
                    ); //----------CHECK THIS IN CONSOLE
                    const newIsTyping = {
                        //Adds user who is typing
                        ...isTyping,
                        users: [
                            ...isTyping.users,
                            message.member.clientData.username,
                        ],
                    };
                    setIsTyping(newIsTyping);
                } else if (
                    message.data.charAt(message.data.length - 1) === "0" && //If last character is 0 ----- WHY?
                    message.data.indexOf(chat.member.id) === -1 //If member is not present
                ) {
                    const newIsTyping = { ...isTyping }; //Removes user who isn't typing anymore
                    newIsTyping.users.splice(
                        newIsTyping.users.indexOf(
                            message.member.clientData.username
                        ),
                        1
                    );
                    setIsTyping(newIsTyping);
                } else {
                    const newChat = {
                        ...chat,
                        messages: [...chat.messages, message],
                    };
                    setChat(newChat);
                }
            }
        };

        if (drone && !chat.member.id) {
            //If drone exists but member.id doesn't, call droneEvents again
            droneEvents();
        }
    }, [chat, drone, isTyping, initMemberId, members]);

    // const onSendMessage = (message) => {
    //     this.drone.publish({
    //         room: "observable-room",
    //         message,
    //     });
    // };

    return (
        <>
            {!chat.member.username ? ( //If no username, load login
                <div>
                    <Login chat={chat} setChat={(obj) => setChat(obj)} />
                </div>
            ) : ( //Else load everything chat related
                <ChatHeader whoIsTyping={isTyping} members={members.online} />
                
            )}
        </>
    );
};

export default App;


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
