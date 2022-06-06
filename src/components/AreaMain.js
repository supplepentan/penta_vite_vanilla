import CanvasImageComposition from "./parts/CanvasImageComposition";
export default class AreaMain {
    static scriptz = () => {
        CanvasImageComposition.scriptz();
    }
    static htmlz = () => {
        return (
            `<div class="main row">` +
            `<h1>テストエリア</h1>` +
            `<div>` +
            CanvasImageComposition.htmlz() +
            `</div>` +
            `</div>`
        )
    };
}
