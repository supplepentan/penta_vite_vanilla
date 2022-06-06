export default class ButtonAlert {
    static scriptz = () => {
        const buttonElm = document.getElementById("buttonalert")
        buttonElm.addEventListener("click", function () {
            alert("ボタンおしたね")
        })
    }
    static htmlz = () => {
        return `
        <button id="buttonalert">ボタン</button>
        `;
    }
}
