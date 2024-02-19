import { useState } from "react";
import apiKey from "../api";
import '../styles.css';
import Emoji from "./Emoji";

export default function App() {
    const [emojiList, setEmojiList] = useState([]);
    const [inputLength, setInputLength] = useState(0)

    function searchChanged(event) {
        let searchInput = event.target.value;
        setInputLength(searchInput.length);

        if (searchInput.length < 2) return;

        fetch(`https://emoji-api.com/emojis?
        search=${searchInput}&access_key=${apiKey}`)
        .then(response => response.json())

        .then(response => {
            if (response.status === 'error') {
                setEmojiList([]);
                return;
            }

            let jsonRes = response
            .filter(emoji => emoji.unicodeName.toLowerCase()
            .includes(searchInput.toLowerCase()))/*.slice(0, 30)*/;

            setEmojiList(jsonRes);
            return jsonRes;
        }) 
        .catch((error) => console.error(error));
    }

    return (
        <>
        <h1>Поиск эмодзи</h1>
        <input type="search" name="search" id="search" onChange={(event) => searchChanged(event)}/>

        { (emojiList.length === 0  && inputLength > 1) &&
        <p id="not-found">Ничего не найдено</p>
        }

        { emojiList.length > 0 &&
        <ul>
            {emojiList.map(emoji => (
                <Emoji key={emoji.unicodeName} emoji={emoji}/>
            ))}
        </ul>
        }

        <div id="copy-success">Скопировано</div>
        </>
    )
}