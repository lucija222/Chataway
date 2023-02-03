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
    // const [initMemberId, setInitMemberId] = useState(null);
    const [members, setMembers] = useState({ online: [] });
    const [drone, setDrone] = useState(null);
    // const [newMessage, setNewMessage] = useState(false);

    useEffect(() => {
        if (chat.member.username !== "") {
            const drone = new window.Scaledrone(CHANNEL_ID, {
                data: chat.member,
            });
            setDrone(drone);
        }
        console.log("useEffect 1 ran");
    }, [chat.member]);

    useEffect(() => {
        const x = () => {
            console.log("useEffect 2 ran");
        };
        x();
        const droneEvents = () => {
            drone.on("open", (error) => {
                if (error) {
                    return console.error(error);
                }
                chat.member.id = drone.clientId;
                // if (initMemberId === null) {
                //     setInitMemberId(drone.clientId);
                // }
                roomEvents();
            });
        };

        const roomEvents = () => {
            console.log("roomevents ran");
            const room = drone.subscribe("observable-room");
            room.on("open", (error) => {
                console.log("open");
                if (error) {
                    console.error(error);
                } else {
                    console.log("Connected to the room");
                }
            });
            room.on("members", (m) => {
                console.log("members");
                //Emits an array of members that have joined the room. This event is only triggered once, right after the user has successfully connected to the observable room -> list of members as ARRAY
                setMembers({ online: m });
            });
            room.on("member_join", (newMember) => {
                console.log("member_join");
                //Member join event is emitted when a new member joins the room - returns member OBJECT
                setMembers((prevMembers) => ({
                    ...prevMembers,
                    online: [...prevMembers.online, newMember],
                }));
            });
            room.on("member_leave", ({ id }) => {
                console.log("member_leave");
                //Member leave event is emitted when a member leaves the room.
                const index = members.online.findIndex(
                    (member) => member.id === id
                );
                // const newMembers = {
                //     ...members,
                //     online: [
                //         ...members.online.slice(0, index),
                //         ...members.online.slice(index + 1),
                //     ],
                // };
                // setMembers(newMembers);
                setMembers((prevMembers) => ({
                        // ...prevMembers,
                        online: [
                            ...prevMembers.online.slice(0, index),
                            ...prevMembers.online.slice(index + 1)
                        ]
                    }));
            });

            room.on("message", (message) => {
                console.log("MESSAGE RAN", message);
                setChat((prevChat) => ({
                    ...prevChat,
                    messages: [...prevChat.messages, message],
                }));
            });
        };

        if (drone && !chat.member.id) {
            console.log(`${chat}`);
            //If drone exists but member.id doesn't, call droneEvents again
            droneEvents();
        }
    }, [chat, drone, /*initMemberId,*/ members /*newMessage*/]);

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
                <div>
                    {" "}
                    {console.log("CHAT", chat.messages)}
                    <ChatHeader members={members.online} />
                    <Messages
                        messages={chat.messages}
                        thisMember={chat.member}
                        // initMemberId={initMemberId}
                    />
                    <MessageInput sendMessage={publishMessage} />
                </div>
            )}
        </>
    );
};

export default App;
