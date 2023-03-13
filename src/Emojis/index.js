import { useEffect, useState } from "react";
import { fetchData } from "../util/fetch";
import './emojis.scss';

const Emoji = () => {
    const [selectedCategory, setSelectedCategory] = useState("smileys_emotion");
    const [emojiData, setEmojiData] = useState([]);

    // const map = (data) => {
    //     for (let category of data) {
    //         console.log(category.slug);
    //     }
    // };

    const filterAndSetEmojiData = (data) => {
        const allFilteredCategories = [];

        for (const category of data) {
            const dataByCategory = {slug: category.slug, emojis: []};

            for (const emojiObject of category.emojis) {
                const filteredEmojiObject = {name: emojiObject.name, emoji: emojiObject.emoji}
                dataByCategory.emojis.push(filteredEmojiObject);
            };

            allFilteredCategories.push(dataByCategory);
        };

        setEmojiData([...allFilteredCategories]);
    };

    // const x = () => {
    //     console.log("it works", emojiData);
    // };
    // x(emojiData.map((emoji) => {
                    
                // }));

    useEffect(() => {
        fetchData("./json/emojis.json", filterAndSetEmojiData);
    }, []);

    const displaySelectedEmojiCategory = () => {
        const selectedCategoryData = [];
        for (const category of emojiData) {
            if (category.slug === selectedCategory) {
                selectedCategoryData.push(...category.emojis);
                break;
                // const emojiList = category.emojis.map((emojiObject) => {
                //     <li className="emoji" key={emojiObject.name}>
                //         {emojiObject.emoji}
                //     </li>
                }
            };

        return (selectedCategoryData.map((emojiObject) => {
            return (
                <li className="emoji" key={emojiObject.name}>
                    {emojiObject.emoji}
                </li>
            );
        }));
    };
 
    const handleEmojiCategories = (e) => {
        e.stopPropagation();
        const categorySlugDataset = e.target.dataset.categorySlug;
        setSelectedCategory(categorySlugDataset);
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
                        sr="./emoji-bar-icons/flags.png"
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
            </ul>
            <ul className="emoji-list" id="emoji-list">
                {displaySelectedEmojiCategory()}
            </ul>
        </div>
    );
};

export default Emoji;
