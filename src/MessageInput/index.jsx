import { useEffect, useRef, useState } from "react";
import "./messageInput.scss";

const MessageInput = (sendMessage, thisMember) => {
    const placeholder = [
        "Enter your message...",
        "Please type something first!",
    ];
    const initInput = { text: "", placeholder: placeholder[0] };
    const [input, setInput] = useState(initInput);

    let inputRef;
    useEffect(() => inputRef.focus(), [inputRef]);

    const timeoutRef = useRef(null);
    const isTyping = (typing) => {
        const message = `${thisMember.id} ${thisMember.username} ${typing}`;
        sendMessage({
            room: "observable-room",
            message
        });
    };

    useEffect(() => {
        if (input.text && inputRef === document.activeElement) {
            if (timeoutRef.current !== null) {
                clearTimeout(timeoutRef.current);
            } else {
                isTyping("1");
                timeoutRef.current = setTimeout(() => {
                    timeoutRef.current = null;
                    isTyping("0");
                }, 1000);
            }
        }
    }, [input]);
};

export default MessageInput;
