export default function Emoji({emoji}) {
    function copy() {
        navigator.clipboard.writeText(emoji.character);

        let copySuccess = document.getElementById('copy-success');
        // copySuccess.style.display = 'initial';
        copySuccess.style.opacity = 1;
        setTimeout(() => {
            // copySuccess.style.display = 'none';
            copySuccess.style.opacity = 0;

        }, 5000)
    }

    return (
        <li onClick={copy}>
            {emoji.character} {emoji.unicodeName.replace(/E\d{0,2}\.\d /, '')}
        </li>
    )
}