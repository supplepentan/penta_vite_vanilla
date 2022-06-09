import html2canvas from "html2canvas";

export default class Capture {
    static scriptz = () => {
        const buttonElm = document.getElementById('capturebutton');
        buttonElm.addEventListener('click', () => {
            html2canvas(document.querySelector('#capture')).then((canvas) => {
                const link = document.createElement('a');
                link.href = canvas.toDataURL();
                link.download = 'export_image.png';
                link.click();
            });
        });
    };
    static htmlz = () => {
        return `
        <div>
        <button id="capturebutton">画像を保存</button>
        <div id="capture">
        <h1>きゃぷちゃ</h1>
        </div>
        </div>
        `;
    };
}