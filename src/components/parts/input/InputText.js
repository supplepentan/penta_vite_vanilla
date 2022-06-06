export default class InputText {
    static scriptz = () => {
        const inputTextElm = document.getElementById("inputtext")
    }
    static htmlz = () => {
        return `
        <input id="inputtext" type="text" id="name" name="name" required minlength="4" maxlength="8" size="10">
        `;
    }
}
