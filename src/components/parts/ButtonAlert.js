export default class ButtonAlert {
    static methodz = () => {
        const buttonElm = document.getElementById("buttonalert")
        buttonElm.addEventListener("click", function () {
            alert("ボタンおしたね")
        })
    }
    static html = () => {
        return `
        <button id="buttonalert">ボタン</button>
        `;
    }
}
