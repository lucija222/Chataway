import { useState } from "react";
import Avatars from "../Avatars/index.jsx";
import {
    generateRandomColor,
    generateRandomName,
} from "../util/helperFunctions.js";
import './login.scss';

const Login = ({ chat, setChat }) => {
    const [avatar, setAvatar] = useState("");
    const [username, setUsername] = useState("");
    const [avatarAnimation, setAvatarAnimation] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState("");
    const [random, setRandom] = useState(false);

    const getAvatar = (e) => {
        if (!random) {
            setAvatar(e.target.src);
            setSelectedAvatar(e.target.alt);
        }
    };

    const getUsername = (e) => {
        setUsername(e.target.value);
    };

    const getRandom = (e) => {
        if (e.target.checked) {
            setRandom(true);
            setUsername("");
            setAvatar("");
            setSelectedAvatar("");
        } else {
            setRandom(false);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (random) {
            chat.member = {
                username: generateRandomName(),
                color: generateRandomColor(),
            };
            setChat({ ...chat }, chat.member);
        } else if (avatar === "") {
            setAvatarAnimation(true);
            setTimeout(() => {
                setAvatarAnimation(true);
            }, 800);
        } else {
            chat.member = {
                username: username,
                avatar: avatar,
            };
            setChat({ ...chat }, chat.member);
        }
    };

    return (
        <div className="form-container">
            <form className="reg-gorm" onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    placeholder="Enter your name"
                    maxLength="15"
                    required
                    value={username}
                    onChange={getUsername}
                    disabled={random ? "disabled" : false}
                />
                <span
                    className={
                        random
                            ? "reg-form__span reg-form__span--disabled"
                            : "reg-form__span"
                    }
                >
                    Choose your Avatar:
                </span>
                <Avatars
                    random={random}
                    getAvatar={getAvatar}
                    avatarAnimation={avatarAnimation}
                    selectedAvatar={selectedAvatar}
                />
                <div className="reg-form__random-checkbox">
                    <label htmlFor="randomizeUser">
                        <input type="checkbox" id="randomizeUser" onClick={getRandom}/>
                    </label>
                </div>
                <button className="reg-form-btn" type="submit">
                    Start chatting
                </button>
            </form>
        </div>
    );
};

export default Login;
