export default class Main {
    constructor() {
        this.htmlElm = `
        <div class="main">
        メイン
        </div>
        `;
    }
    get html() {
        return this.htmlElm
    }
}
