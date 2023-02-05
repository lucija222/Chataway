import './avatars.scss';

const Avatars = ({ random, getAvatar, avatarAnimation, selectedAvatar }) => {
    const avatars = [];
    for (let i = 1; i <= 6; i++) {
        const path = `/avatars/avatar${i}.png`;
        avatars.push(path);
    }

    const renderAvatars = (avatar, index) => {
        const img_alt = `Avatar${index}`;
        return (
            <li
                className={
                    random
                        ? "avatar avatar__disabled"
                        : selectedAvatar === img_alt
                        ? "avatar avatar__selected"
                        : avatarAnimation
                        ? "avatar avatar__animation"
                        : "avatar"
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
