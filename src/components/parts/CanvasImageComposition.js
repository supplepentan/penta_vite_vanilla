import "../../assets/js/apng-canvas.min";
export default class CanvasImageComposition {
    static scriptz = () => {
        function drawImage1() {
            const img1 = new Image();
            img1.src = "../../assets/img/animal.png";
            img1.onload = () => {
                const canvas = document.querySelector("#image1");
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img1, 0, 0, canvas.width, canvas.height);
            }
        }
        function drawImage2() {
            const img2 = new Image();
            img2.src = "../../assets/img/supplepentan_t.png";
            img2.onload = () => {
                const canvas = document.querySelector("#image2");
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img2, 0, 0, canvas.width, canvas.height);
            }
        }
        /*
        function drawImage2() {
            const canvas = document.querySelector("#image2");
            const ctx = canvas.getContext("2d");
            ctx.font = "32px serif";
            ctx.fillStyle = "Blue";
            ctx.fillText("Supplepentan", 0, 150);
        }
        */
        async function concatCanvas(image1, image2) {
            const canvas = document.querySelector(image1);
            const ctx = canvas.getContext("2d");
            for (let i = 0; i < image2.length; i++) {
                const imageMix = await getImagefromCanvas(image2[i]);
                ctx.drawImage(imageMix, 0, 0, canvas.width, canvas.height);
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
        <div class="row d-flex align-items-center">
          <div class="col">
            <!-- 合成するcanvasその1 -->
            <canvas id="image1" class="border" width="200" height="170"></canvas>
          </div>
          <div class="col">
            <img src="../../assets/img/icon/plus-solid.svg" width="32" height="32">
          </div>
          <div class="col">
            <!-- 合成するcanvasその2 -->
            <canvas id="image2" class="border" width="200" height="170"></canvas>
          </div>
          <div class="col">
            <p><button type="button" id="btn-concat"><img src="../../assets/img/icon/equals-solid.svg" width="32" height="32"></button></p>
          </div>
          <div class="col">
            <!-- 合成結果用のcanvas -->
            <canvas id="concat" class="border" width="200" height="170"></canvas>
            </div><!-- 消しゴム -->
            <p id="eraser"><button type="button" id="btn-eraser"><img src="../../assets/img/icon/eraser-solid.svg" width="32" height="32"></button></p>
        </div>
        <div class="row">
        <div class="col">
        <ul>
        <li>「＝」ボタンをクリックすると2つのcanvasを合成します</li>
        <li>「<img src="../../assets/img/icon/eraser-solid.svg" width="18" height="18">」ボタンをクリックすると合成結果をクリアします</li>
        </ul>
        </div>
        </div>
        `;
    }
}