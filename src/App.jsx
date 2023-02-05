import "./app.scss";
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
            //If drone exists but member.id doesn't, call droneEvents again
            droneEvents();
        }
    }, [chat, drone, members]);

    const publishMessage = (object) => {
        drone.publish(object);
    };


    return (
        <>
            {!chat.member.username ? ( //If no username, load login
                <div>
                    <Login chat={chat} setChat={(obj) => setChat(obj)} />
                </div>
            ) : (
                //Else load everything chat related
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
