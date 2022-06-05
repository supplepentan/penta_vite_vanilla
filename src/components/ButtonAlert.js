export default class TestButton {
    static onLoginButtonClick() {
        const buttonElm = document.getElementById("testButton")
        buttonElm.addEventListener("click", function () {
            alert("ボタンおしたね")
        })
    }
    get html() {
        return `
        <button id="testButton">ボタン</button>
        `;
    }
}
