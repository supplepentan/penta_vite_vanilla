import ButtonAlert from "./parts/ButtonAlert";
import Canvas from "./parts/Canvas";
export default class AreaMain {
    static scriptz = () => {
        ButtonAlert.scriptz();
        Canvas.scriptz();
    }
    static htmlz = () => {
        return (
            `<div class="main">` +
            ButtonAlert.htmlz() +
            Canvas.htmlz() +
            `</div>`
        )
    };
}
