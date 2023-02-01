import { useEffect, useRef } from "react";

const Messages = ({ messages, thisMember, initMemberId }) => {
    const bottomDiv = useRef();

    useEffect(() => {
        bottomDiv.current.scrollIntoView();
    }, [messages.length]);

    const renderMessage = (message) => {
        const { member, id } = message;
        const classNames = [message, thisMember, initMemberId];

        const divMemberData = (
            <div className={classNames(...classNames, "classNameMemberData")}>
                {member.clientData.color ? (
                    <span
                        className="msg-list__avatar--random"
                        style={{ backgroundColor: member.clientData.color }}
                    />
                ) : (
                    <img
                        className="msg-list__avatar"
                        src={member.clientData.avatar}
                        alt="user-avatar"
                    />
                )}

                <div
                    className={classNames(
                        ...classNameArgs,
                        "classNameInfoContainer"
                    )}
                >
                    <span className="msg-list__username">
                        {member.clientData.username}
                    </span>
                </div>
            </div>
        );

        // const listItem = 
    };
     return (
        
     );
};

export default Messages;
