import './avatars.scss';

const Avatars = ({ random, getAvatar, avatarAnimation, selectedAvatar }) => {
    const avatars = [];
    for (let i = 1; i <= 6; i++) {
        const path = `../avatars/avatar${i}.png`;
        avatars.push(path);
    }

    const renderAvatars = (avatar, index) => {
        const img_alt = `Avatar${index}`;
        return (
            <li
                className={
                    random
                        ? "login-form__avatar login-form__avatar--disabled"
                        : selectedAvatar === img_alt
                        ? "login-form__avatar login-form__avatar--selected"
                        : avatarAnimation
                        ? "login-form__avatar login-form__avatar--animation"
                        : "login-form__avatar"
                }
                key={index}
            >
                <img src={avatar} alt={img_alt} onClick={getAvatar} />
            </li>
        );
    };

    return (
        <ul className="login-form__avatar-list">
            {avatars.map((avatar, index) => renderAvatars(avatar, index))}
        </ul>
    );
}

export default Avatars;
