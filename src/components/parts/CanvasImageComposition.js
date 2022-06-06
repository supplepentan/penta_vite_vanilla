export default class CanvasImageComposition {
    static scriptz = () => {
        function drawImage1() {
            const Unaju = new Image();
            Unaju.src = "image/unajyu.png";
            Unaju.onload = () => {
                const canvas = document.querySelector("#image1");
                const ctx = canvas.getContext("2d");
                ctx.drawImage(Unaju, 0, 0, canvas.width, canvas.height);
            }
        }
        function drawImage2() {
            const canvas = document.querySelector("#image2");
            const ctx = canvas.getContext("2d");
            ctx.font = "32px serif";
            ctx.fillStyle = "Red";
            ctx.fillText("うな重", 45, 150);
        }
        async function concatCanvas(base, asset) {
            const canvas = document.querySelector(base);
            const ctx = canvas.getContext("2d");
            for (let i = 0; i < asset.length; i++) {
                const image1 = await getImagefromCanvas(asset[i]);
                ctx.drawImage(image1, 0, 0, canvas.width, canvas.height);
            }
        }
        function eraseCanvas(target) {
            const canvas = document.querySelector(target);
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        function getImagefromCanvas(id) {
            return new Promise((resolve, reject) => {
                const image = new Image();
                const ctx = document.querySelector(id).getContext("2d");
                image.onload = () => resolve(image);
                image.onerror = (e) => reject(e);
                image.src = ctx.canvas.toDataURL();
            });
        }
        // #image1に画像を描画
        drawImage1();
        // #image2にテキストを描画
        drawImage2();
        // 「+」ボタンを押したら合成
        document.querySelector("#btn-concat").addEventListener("click", () => {
            concatCanvas("#concat", ["#image1", "#image2"]);
        });
        // 「消しゴム」ボタンを押したらクリア
        document.querySelector("#btn-eraser").addEventListener("click", () => {
            eraseCanvas("#concat");
        });
    }
    static htmlz = () => {
        return `
        <div class="flex-container">
        <!-- 合成するcanvasその1 -->
        <canvas id="image1" width="200" height="170"></canvas>
        <div><img src="icon/plus-solid.svg" width="32" height="32"></div>
        <!-- 合成するcanvasその2 -->
        <canvas id="image2" width="200" height="170"></canvas>
        <p><button type="button" id="btn-concat"><img src="icon/equals-solid.svg" width="32" height="32"></button></p>
        <!-- 合成結果用のcanvas -->
        <canvas id="concat" width="200" height="170"></canvas>
        </div>
        <!-- 消しゴム -->
        <p id="eraser"><button type="button" id="btn-eraser"><img src="icon/eraser-solid.svg" width="32" height="32"></button></p>
        </section>
        <ul>
        <li>「＝」ボタンをクリックすると2つのcanvasを合成します</li>
        <li>「<img src="icon/eraser-solid.svg" width="18" height="18">」ボタンをクリックすると合成結果をクリアします</li>
        </ul>
        `;
    }
}