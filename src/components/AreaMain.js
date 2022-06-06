import ButtonAlert from "./parts/ButtonAlert";

export default class AreaMain extends ButtonAlert {
    static methodz = () => {
        ButtonAlert.methodz()
    }
    static html = () => {
        return (
            `<div class="main">` +
            ButtonAlert.html() +
            `</div>`
        )
    };
}
