import ButtonAlert from "./parts/ButtonAlert";
import Canvas from "./parts/Canvas";
import InputCheckbox from "./parts/input/InputCheckbox";
import InputText from "./parts/input/InputText";
export default class AreaMain {
    static scriptz = () => {
        ButtonAlert.scriptz();
        Canvas.scriptz();
    }
    static htmlz = () => {
        return (
            `<div class="main">` +
            ButtonAlert.htmlz() +
            `<div>` +
            `<h1>インプット</h1>` +
            InputText.htmlz() +
            `</div>` +
            `<h1>インプット</h1>` +
            InputCheckbox.htmlz() +
            `</div>` +
            `</div>`
        )
    };
}
