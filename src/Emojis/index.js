import { useEffect, useState } from "react";
import { fetchData } from "../util/fetch";

const Emoji = () => {

    const [selectedCategory, setSelectedCategory] = useState("Smileys & Emotion")


    const map = (data) => {
        for (let category of data){
            console.log(category.name)
        }
    };

    useEffect(() => {

        fetchData("./json/emojis.json", map)
    });

    return(
        <div className="emoji-container">
            <ul className="emoji-categories-list">
                <li className="emoji-category" data-category-name=""><img src="" alt="" /></li>
                <li className="emoji-category" data-category-name=""><img src="" alt="" /></li>
                <li className="emoji-category" data-category-name=""><img src="" alt="" /></li>
                <li className="emoji-category" data-category-name=""><img src="" alt="" /></li>
                <li className="emoji-category" data-category-name=""><img src="" alt="" /></li>
                <li className="emoji-category" data-category-name=""><img src="" alt="" /></li>
                <li className="emoji-category" data-category-name=""><img src="" alt="" /></li>
                <li className="emoji-category" data-category-name=""><img src="" alt="" /></li>
                <li className="emoji-category" data-category-name=""><img src="" alt="" /></li>
            </ul>
            <ul className="emoji-list">{}</ul>
        </div>
    );
}

export default Emoji;