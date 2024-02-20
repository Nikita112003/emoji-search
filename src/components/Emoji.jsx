export default function Emoji({emoji}) {
    function copy() {
        let message = document.getElementById('message');
        try {
            navigator.clipboard.writeText(emoji.character);

            message.classList.add('copy-success');
            message.classList.remove('copy-error')
            message.innerText = 'Скопировано';
        } catch (error) {
            message.classList.add('copy-error');
            message.classList.remove('copy-success');
            message.innerHTML = 'Ошибка копирования';
        } finally {
            message.style.visibility = 'visible'
            message.style.opacity = 1;
            setTimeout(() => {
                message.style.opacity = 0;
                message.style.visibility = 'hidden'
            }, 5000)
        }
    }

    return (
        <li onClick={copy}>
            {emoji.character} {emoji.unicodeName.replace(/E\d{0,2}\.\d /, '')}
        </li>
    )
}