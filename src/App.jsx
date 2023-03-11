import "./App.scss";
import { useEffect, useState } from "react";
import Login from "./Login";
import { CHANNEL_ID } from "./util/channel";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import Messages from "./Messages";

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
    const [members, setMembers] = useState({ online: [] });
    const [drone, setDrone] = useState(null);

    useEffect(() => {
        if (chat.member.username !== "") {
            const drone = new window.Scaledrone(CHANNEL_ID, {
                data: chat.member
            });
            setDrone(drone);
        }
    }, [chat.member]);

    useEffect(() => {
        const droneEvent = () => {
            drone.on("open", (error) => {
                if (error) {
                    return console.error(error);
                }
                chat.member.id = drone.clientId;
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
                setMembers({ online: m });
            });

            room.on("member_join", (newMember) => {
                setMembers((prevMembers) => ({
                    ...prevMembers,
                    online: [...prevMembers.online, newMember],
                }));
            });

            room.on("member_leave", ({ id }) => {
                setMembers((prevMembers) => { 
                    const index = prevMembers.online.findIndex(
                      (member) => member.id === id
                    );
                    return {
                      ...prevMembers,
                      online: [
                        ...prevMembers.online.slice(0, index),
                        ...prevMembers.online.slice(index + 1)
                      ]
                    }; 
                  });
            });

            room.on("message", (message) => {
                setChat((prevChat) => ({
                    ...prevChat,
                    messages: [...prevChat.messages, message],
                }));
            });
        };

        if (drone && !chat.member.id) {
            droneEvent();
        }
    }, [chat, drone, members]);

    const publishMessage = (object) => {
        drone.publish(object);
    };


    return (
        <>
            {!chat.member.username ? (
                <div>
                    <Login setChat={setChat} /> 
                </div>
            ) : (
                <div className="chat">
                    <ChatHeader members={members.online} />
                    <Messages
                        messages={chat.messages}
                        thisMember={chat.member}
                    />
                    <MessageInput sendMessage={publishMessage} />
                </div>
            )}
        </>
    );
};

export default App;
