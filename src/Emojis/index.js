import { useEffect, useState } from "react";
import { fetchData } from "../util/fetch";
import './emojis.scss';

const Emoji = () => {
    const [selectedCategory, setSelectedCategory] = useState("smileys_emotion");
    const [emojisByCategory, setEmojisByCategory] = useState([
        {
            categoryslug: "smileys_emotion",
            emojis: [],
        },
        {
            categoryslug: "people_body",
            emojis: [],
        },
        {
            categoryslug: "animals_nature",
            emojis: [],
        },
        {
            categoryslug: "food_drink",
            emojis: [],
        },
        {
            categoryslug: "travel_places",
            emojis: [],
        },
        {
            categoryslug: "activities",
            emojis: [],
        },
        {
            categoryslug: "objects",
            emojis: [],
        },
        {
            categoryslug: "symbols",
            emojis: [],
        },
        {
            categoryslug: "flags",
            emojis: [],
        },
    ]);

    const map = (data) => {
        for (let category of data) {
            console.log(category.slug);
        }
    };

    useEffect(() => {
        fetchData("./json/emojis.json", map);
    }, []);

    const handleEmojiCategories = (e) => {
        e.preventDefault();
        const dataset = e.target.dataset;
        console.log(dataset.categorySlug);
        setSelectedCategory(dataset);
    };

    return (
        <div className="emoji-container">
            <ul className="emoji-categories-list" onClick={handleEmojiCategories}>
                <li className="emoji-category">
                    <img
                        src="./emoji-bar-icons/smileys.png"
                        alt="Smileys & Emotions"
                        data-category-slug="smileys_emotion"
                    />
                </li>
                <li className="emoji-category">
                    <img
                        src="./emoji-bar-icons/people.png"
                        alt="People & Body"
                        data-category-slug="people_body"
                    />
                </li>
                <li className="emoji-category">
                    <img
                        src="./emoji-bar-icons/animals.png"
                        alt="Animals & Nature"
                        data-category-slug="animals_nature"
                    />
                </li>
                <li className="emoji-category">
                    <img
                        sr="./emoji-bar-icons/drink.png"
                        alt="Food & Drink"
                        data-category-slug="food_drink"
                    />
                </li>
                <li className="emoji-category">
                    <img
                        src="./emoji-bar-icons/travel.png"
                        alt="Travel & Places"
                        data-category-slug="travel_places"
                    />
                </li>
                <li className="emoji-category">
                    <img
                        src="./emoji-bar-icons/activities.png"
                        alt="Activities"
                        data-category-slug="activities"
                    />
                </li>
                <li className="emoji-category">
                    <img
                        src="./emoji-bar-icons/objects.png"
                        alt="Objects"
                        data-category-slug="objects"
                    />
                </li>
                <li className="emoji-category">
                    <img
                        src="./emoji-bar-icons/symbols.png"
                        alt="Symbols"
                        data-category-slug="symbols"
                    />
                </li>
                <li className="emoji-category">
                    <img
                        src="./emoji-bar-icons/flags.png"
                        alt="Flags"
                        data-category-slug="flags"
                    />
                </li>
            </ul>
            <ul className="emoji-list">{}</ul>
        </div>
    );
};

export default Emoji;
