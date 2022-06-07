import CanvasImageComposition from "./parts/CanvasImageComposition";
export default class AreaMain {
    static scriptz = () => {
        CanvasImageComposition.scriptz();
    }
    static htmlz = () => {
        return (
            `<div class="main row">` +
            `<h1 class="bg-secondary text-center">テストエリア</h1>` +
            `<div class="bg-light">` +
            CanvasImageComposition.htmlz() +
            `</div>` +
            `</div>`
        )
    };
}
