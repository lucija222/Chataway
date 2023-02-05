import { useState } from "react";
import Avatars from "../Avatars/index.jsx";
import {
    generateRandomColor,
    generateRandomName,
} from "../util/helperFunctions.js";
import "./login.scss";

const Login = ({ setChat }) => {
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
            setChat((prevChat) => ({
                ...prevChat,
                member: {
                    ...prevChat.member,
                    username: generateRandomName(),
                    color: generateRandomColor(),
                },
            }));
        } else if (avatar === "") {
                setAvatarAnimation(true);
        } else {
            setChat((prevChat) => ({
                ...prevChat,
                member: {
                    ...prevChat.member,
                    username: username,
                    avatar: avatar,
                },
            }));
        }
    };

    return (
        <div className="form-container">
            <form className="login-form" onSubmit={handleFormSubmit}>
                <figure>
                    <figcaption id="figcaption1">Customize profile</figcaption>
                    <div className="customizeUser">
                        <label
                            htmlFor="login-input"
                            className={
                                random
                                    ? "login-form__input-label-disabled"
                                    : "login-form__input-label"
                            }
                        >
                            Enter username:
                        </label>
                        <input
                            id="login-input"
                            className={
                                random
                                    ? "login-form__input-disabled"
                                    : "login-form__input"
                            }
                            type="text"
                            pattern="[^' ']+"
                            placeholder="No spaces allowed"
                            maxLength="15"
                            required
                            value={username}
                            onChange={getUsername}
                            disabled={random ? "disabled" : false}
                        />
                        <br />
                        <span
                            className={
                                random
                                    ? "login-form__span login-form__span--disabled"
                                    : "login-form__span"
                            }
                        >
                            Choose your avatar:
                        </span>
                        <Avatars
                            random={random}
                            getAvatar={getAvatar}
                            avatarAnimation={avatarAnimation}
                            selectedAvatar={selectedAvatar}
                        />
                    </div>
                </figure>
                <div className="orDiv">OR</div>
                <figure>
                    <div className="randomizeUser">
                        <figcaption id="figcaption2">
                            Randomize profile
                        </figcaption>
                        <div className="login-form__random-checkbox">
                            <input
                                type="checkbox"
                                id="randomizeUser"
                                onClick={getRandom}
                            />
                            <label
                                htmlFor="randomizeUser"
                                className="checkbox-text"
                            >
                                Generate username & color
                            </label>
                        </div>
                    </div>
                </figure>
                <button id="login-form__submit-button">Start chatting</button>
            </form>
        </div>
    );
};

export default Login;
