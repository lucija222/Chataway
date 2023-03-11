import { useEffect, useState } from "react";
import "./messageInput.scss";

const MessageInput = ({sendMessage}) => {
    const placeholder = [
        "Enter your message...",
        "Please type something first!",
    ];
    const initInput = { text: "", placeholder: placeholder[0] };
    const [input, setInput] = useState(initInput);

    let inputRef;
    useEffect(() => inputRef.focus(), [inputRef]);

    const handleInputChange = (e) => {
        setInput({ ...input, text: e.target.value });
    };

    const publishInput = (e) => {
        e.preventDefault();
        if (input.text === "") {
            setInput({
                ...input,
                placeholder: placeholder[1]
            });
        } else {
            const message = input.text;
            sendMessage({
                room: "observable-room",
                message,
            });
            setInput({ text: "", placeholder: placeholder[0] });
        }
    };

    return (
        <div className="chat__input">
            <form className="msg-form" onSubmit={publishInput}>
                <input
                    className="msg-form__input"
                    type="text"
                    value={input.text}
                    placeholder={input.placeholder}
                    ref={(input) => {
                        inputRef = input;
                    }}
                    onChange={handleInputChange}
                />
                <button
                    className="msg-form__btn"
                    type="submit"
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default MessageInput;
