import Capture from "./parts/Capture";
export default class AreaMain {
    static scriptz = () => {
        Capture.scriptz();
    }
    static htmlz = () => {
        return (`
            <div class="main row">
            <h1 class="bg-secondary text-center text-light">Test Area</h1>
            <div>
            ${Capture.htmlz()}
            </div>
            </div>
        `)
    };
}
