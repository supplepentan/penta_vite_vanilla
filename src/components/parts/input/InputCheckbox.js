export default class InputCheckbox {
    static scriptz = () => {
        const inputCheckboxElm = document.getElementById("inputcheckbox")
    }
    static htmlz = () => {
        return `
        <input id="inputcheckbox" type="checkbox" name="firstName">
        <input id="inputcheckbox" type="checkbox" name="secondName">
        <input id="inputcheckbox" type="checkbox" name="thirdName">
        `;
    }
}
