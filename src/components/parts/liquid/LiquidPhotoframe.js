export default class LiquidPhotoframe {
    static scriptz = () => {
        jQuery(function ($) {
            $(window).on('load', function () {
                $('.liquid-loader').fadeOut(200);
            });
            // 繝倥Ν繝�
            var help_id = $('.liquid-help-modal').data('id');
            if (help_id == "space") {
                $(".liquid-help-modal").load("/lib/help-space.html");
            } else if (help_id == "vr360") {
                $(".liquid-help-modal").load("/lib/help-vr360.html");
            } else if (help_id == "basic-stamp") {
                $(".liquid-help-modal").load("/lib/help-basic-stamp.html");
            } else if (help_id == "basic-frame") {
                $(".liquid-help-modal").load("/lib/help-basic-frame.html");
            } else {
                $(".liquid-help-modal").load("/lib/help.html");
            }
            $('.liquid-help, .liquid-link, .liquid-map').on('click', function () {
                let elem = $(this).attr("class");;
                let modal = '.' + elem + '-modal';
                $(modal).fadeIn();
            });
            // 繝｢繝ｼ繝繝ｫ邉ｻ
            $('.liquid-help-modal, .liquid-link-modal:not(".liquid-has-movie, .liquid-has-mogiri"), .liquid-map-modal').on('click', function () {
                $(this).fadeOut();
            });
            $('.liquid-has-movie .close, .liquid-has-mogiri .close').on('click', function () {
                $('.liquid-link-modal').fadeOut();
            });
            // share
            let thisurl = window.location.href;
            $('.liquid-share').on('click', function () {
                if (navigator.share) {
                    navigator.share({
                        url: thisurl
                    });
                }
            });
            if ($('body').hasClass('basic')) {
                // 繝槭�繧ｫ繝ｼ讀懃衍
                // camera
                var cameraFacing = false;
                document.getElementById('liquid-camera').addEventListener("click", function (e) {
                    e.preventDefault();
                    var vi = document.querySelector('video');
                    const mode = cameraFacing ? "environment" : "user";
                    cameraFacing ? document.querySelector('video').classList.remove("active") : document.querySelector('video').classList.add("active");
                    cameraFacing ? document.querySelector('canvas').classList.remove("active") : document.querySelector('canvas').classList.add("active");
                    stopVideo(vi);
                    navigator.mediaDevices.getUserMedia({ video: { facingMode: mode } })
                        .then(stream => vi.srcObject = stream)
                        .catch(err => alert(`${err.name} ${err.message}`));
                    cameraFacing = !cameraFacing;
                });
            }
            // frame
            var frame = '';
            var frame2 = '';
            if ($('body').hasClass('framemode')) {
                if ($('#liquid-ar-frame').length) {
                    frame = 'liquid-ar-frame';
                }
                if ($('#liquid-ar-frame2').length) {
                    frame2 = 'liquid-ar-frame2';
                }
            }
            // direction
            if ($('body').hasClass('tate')) {
                $('.liquid-direction').html('<p>繧ｿ繝�髄縺阪↓縺励※縺上□縺輔＞<br><small>窶ｻ繧ｹ繝槭�繝医ヵ繧ｩ繝ｳ縺ｧ邵ｦ繝ｻ讓ｪ縺ｮ逕ｻ髱｢繝ｭ繝�け繧定ｨｭ螳壹＆繧後※<br>縺�ｋ譁ｹ縺ｯ縲∫判髱｢繝ｭ繝�け縺ｮ險ｭ螳壹ｒ隗｣髯､縺励※縺上□縺輔＞縲�</small></p><small>Please portrait mode</small>');
            }
            if ($('body').hasClass('yoko')) {
                $('.liquid-direction').html('<p>繝ｨ繧ｳ蜷代″縺ｫ縺励※縺上□縺輔＞<br><small>窶ｻ繧ｹ繝槭�繝医ヵ繧ｩ繝ｳ縺ｧ邵ｦ繝ｻ讓ｪ縺ｮ逕ｻ髱｢繝ｭ繝�け繧定ｨｭ螳壹＆繧後※<br>縺�ｋ譁ｹ縺ｯ縲∫判髱｢繝ｭ繝�け縺ｮ險ｭ螳壹ｒ隗｣髯､縺励※縺上□縺輔＞縲�</small></p><small>Please landscape mode</small>');
            }
            // photo
            $('#liquid-photo').on('click', function () {
                $('#liquid-flash').removeClass('none');
                setTimeout(function () {
                    $('#liquid-flash').addClass('none');
                }, 50);
                setTimeout(function () {
                    var snap = snapshot(frame, frame2);
                    if (snap) {
                        $('#liquid-photo-img').attr('src', snap);
                        $('#liquid-photos').show();
                    }
                }, 100);
            });
            $('#liquid-photo-close').on('click', function () {
                $('#liquid-photo-img').attr('src', '');
                $('#liquid-photos').hide();
            });
            // vr360
            $('.vr360 .wrap').hide();
            $('.vr360 .wrap').delay(100).fadeIn(200);
        });
        // photo
        function snapshot(frame, frame2) {
            var arCanvas = document.createElement("canvas");
            var arContext = arCanvas.getContext("2d");
            var video = document.querySelector('video');
            // Video: 1280 x 960
            var width = video.videoWidth * 2;
            var height = video.videoHeight * 2;
            // aScene: 4096 x 2048
            var aScene = document.querySelector("a-scene").components.screenshot.getCanvas("perspective");
            if (width && height) {
                // Canvas
                arCanvas.width = width;
                arCanvas.height = height;
                // frame
                if (frame) {
                    var frameImage = new Image();
                    frameImage.src = document.getElementById(frame).getAttribute("src");
                    var frameW = $("#" + frame).width() * 2;
                    var frameH = $("#" + frame).height() * 2;
                    // 繧ｿ繝�髄縺阪�蝣ｴ蜷�
                    // if ( $(window).width() < $(window).height() ) {
                    //     frameW = $(window).width() * 2;
                    //     frameH = $(window).height() * 2;
                    // }
                } else {
                    var frameW = $(window).width() * 2;
                    var frameH = $(window).height() * 2;
                }
                if (frame2) {
                    var frameImage2 = new Image();
                    frameImage2.src = document.getElementById(frame2).getAttribute("src");
                    var frameW2 = $('#' + frame2).width() * 2;
                    var frameH2 = $('#' + frame2).height() * 2;
                }
                // CanvasFix
                arContext.drawImage(video, 0, 0, width, height);
                var arCanvasFix = document.createElement("canvas");
                var arContextFix = arCanvasFix.getContext("2d");
                arCanvasFix.width = frameW;
                arCanvasFix.height = frameH;
                // 逕ｻ隗�
                if (frameW > frameH) {
                    // 繝ｨ繧ｳ蜷代″
                    arContext.drawImage(aScene, 0, 0, width, height);
                    // crop
                    var scaledWidthC = width * (frameW / width);
                    var scaledHeightC = height * (frameW / width);
                    var marginTopC = -((scaledHeightC - frameH) / 2);
                    // alert(scaledHeightC +';'+ width +';'+ height +';'+ frameW +';'+ frameH ); // 456.75;1280;720;812;375
                    arContextFix.drawImage(arCanvas, 0, marginTopC, scaledWidthC, scaledHeightC);
                } else {
                    // 繧ｿ繝�髄縺�
                    var scale = height / width;
                    var scaledWidth = height * scale;
                    var marginLeft = (width - scaledWidth) / 2;
                    arContext.drawImage(aScene, marginLeft, 0, scaledWidth, height);
                    // crop
                    var scaledWidthC = width * (frameH / height);
                    var scaledHeightC = height * (frameH / height);
                    var marginLeftC = -((scaledWidthC - frameW) / 2);
                    arContextFix.drawImage(arCanvas, marginLeftC, 0, scaledWidthC, scaledHeightC);
                }
                // frame
                if (frame) {
                    arContextFix.drawImage(frameImage, 0, 0, frameW, frameH);
                    frameImage = null;
                }
                if (frame2) {
                    arContextFix.drawImage(frameImage2, 0, 0, frameW2, frameH2);
                    frameImage2 = null;
                }
                return arCanvasFix.toDataURL('image/png');
            }
        }
        // camera
        function stopVideo(videoElem) {
            let stream = videoElem.srcObject;
            let tracks = stream.getTracks();
            tracks.forEach(function (track) {
                track.stop();
            });
            videoElem.srcObject = null;
        }
    }
    static htmlz = () => {
        return `
        <!DOCTYPE html>
        <html>
        <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no,minimum-scale=1.0,maximum-scale=1.0">
        <title>LIQUID AR フォトフレーム</title>
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="description" content="iOS: Safari, Android: Chrome で開いてください。カメラ等の使用を許可してください。">
        <link rel="stylesheet" type="text/css" href="https://ar.lqd.jp/lib/style-20210306.css?v=1654584330">
        <link rel="shortcut icon" sizes="16x16 24x24 32x32 64x64 128x128 256x256" href="/img/favicon.ico">
        <script src="../../../assets/liquid/js/af.min.1.0.4.js"></script>
        <script src="../../../assets/liquid/js/afar.min.3.1.0.js></script>
        <script src="../../../assets/liquid/js/jquery-3.3.1.min.js"></script>
        <!-- ★メイン処理 -->
        <script src="https://ar.lqd.jp/lib/liquid-ar-20210804-dev.js"></script>
        </head>
        <body style="margin:0px; overflow:hidden;" class="basic framemode yoko">
        
        <!-- device-orientation-permission-ui="enabled:false" -->
        <a-scene embedded arjs="debugUIEnabled:false; sourceType:webcam; sourceWidth:1280; sourceHeight:960; displayWidth:1280; displayHeight:960;" vr-mode-ui="enabled:false" device-orientation-permission-ui="enabled:false">
        
            <!-- marker -->
            <a-marker id="marker"></a-marker>
        
            <!-- camera -->
            <a-entity camera></a-entity>
        
        </a-scene>
        
        <!-- photo -->
        <div id="liquid-photo"></div>
        <div id="liquid-photos" class="none">
            <img id="liquid-photo-img" alt="">
            <div id="liquid-photo-txt">長押しで保存します</div>
            <div id="liquid-photo-close">&times;</div>
        </div>
        <div id="liquid-flash" class="none"></div>
        
        <!-- camera -->
        <div id="liquid-camera"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA59JREFUeNrsWj1s2lAQdqOsSKwwNQtzJdgxO5BkRAxNF1grwQ7sIHWFJZlgjArshR2krrC0E6xIsKfvs3zVi7GJDWf7Ib1Pevm1L/f57r535zzD0NDQ0NDQ0IgLn8Iwms1mv4tP92J9ESsZ8PadWL/F+rlcLn8oTVgQBblfNlEOgHhBEN9x+XjL/ABfiaxpmtZKpVKBDGy3W2M2m1nLtgWbBeVqQ0T3Saw3rOFw+HYpYIPswTaXnzeMnL/axI1KpXKxMdiALdm2MoSFY5+RxeQoFyRbpv03whMtO43ufapskmp3sViwlkoul5MFzI947WyFf/ElWrbSvlLEggAixQ3YlATMLx4ED5TBo1Ph3VT6mciihqQ68pPa7ISR1plMxvf1gqC1bA7g8uiZ0nad/MHXpVLJaLVaV9lNdTodYzKZ0Ld34gH89RKtB3xIJBJXSxaA7+Agc/IibAlUkBRSFRKHZJidlq8aC7vuo2wtj7Df743pdGrV1Hq99owGNKNYLMqp+M7G4XAI3KaG3WkdYTQaGeVy2ej1ep5kAfwO1+Ba3OMkW6/Xjc1mo26E4WSz2XyXvogc9lREk+oLRLGwz+IeLBDH991u17oGZE89rNgJU0TISRCt1WquLSfVL1QVkR0MBtb9eFCwQQ+FE+wpjciSk4jkeDz21V/jGjEhHUWfG6yEESFKYzje7/ddRcgLECWkdJi44UxlEhyQDEqWbDQaDflH35QljK0HDgNw+hyyLgL1rCxh6l1BFPspA1l1Gw84TM6eMyLiIUGwogBLhOXIRN0qxr4tcbR/yqc0bUHck5bcgMA+R/awEEYNhpHKeEetfEpzYrVauc238UdYTr1TKhy0vufz+X+yQff12CJMXVdQsmhkaCTkfBsaBuEXJ9mg6UhjItnAywGVCT/RF+eQpYmL2lRMUZxbXagpjSiR40FaTHniwiyttEojBSmqcLxarVr16Kdmca1zvFSy8XATKBoGIDztdtualfP5vLVfk+LS2w2osfzO6pxZOnLCToHCNgSSWAAIYV52vqRzAinMncbshNPptKtAwXEoLEZHeZtxux8jJa4NuxdnIQwnvRzFzylqaBWdpEE2yoEj0v88nHowcY2HO+d8e62QOOxOEZ6Ren4kLioDvkv7/0z+3dGRB7Ft4JyVST3sOUeP4gL9H8s+MWCRFdte4SPC3IfL4oLrobZTh1ro+KB5ZUQR3lCOLWpoaGhoaGhchn8CDAALA//Cr/d+wAAAAABJRU5ErkJggg==" alt="Camera"></div>
        
        <div class="liquid-ar-frame"><img src="https://lqd.jp/img/pfbgs.png" id="liquid-ar-frame" alt=""></div>
        <div class="liquid-ar-frame"><img src="https://lqd.jp/img/animal.png" id="liquid-ar-frame2" alt=""></div>
        
        <!-- link -->
        <a class="liquid-link">フォトフレーム</a>
        <!-- modal -->
        <div class="liquid-help-modal" data-id="basic-frame"></div>
        <div class="liquid-link-modal">
            <h2>ボタン（仮）</h2>
            <p style="text-align: left;">テキストテキストテキスト</p>
            <br><br><br>
        </div>
        
        <!-- help -->
        <div class="liquid-help"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABspJREFUeNrsWztQW0cUXRHKeEYzpghUpCGtGLlxGh69NaN0gcaiCJTiVzmFUG8cu4RGooES2XIvqYkbGNSGJqogpQZSpCN7XnafrlZ330/viYzwndmR+OjtPXvvnvvZlRBfZbolk9aDl/P5RfniyLEih37vJ205enJ08P7q8rL3vwesQJblKCqQ4wgAn8hRTxJ8JiGgDgE6JC/yeZGXY2FhQSzMz7Ofv7m9FTc3N+Ly8lJcyMFIQ44PEnj7UQEri9aouz579kw4jiNWV1bc1zjSbrdFq9NxX+/v70233xjH4pkxwB7Il4r+GRbc2twUhVevEt1zzc+fxdHxsesBRKoS9MFEACurnsuR0xbd39tLHCgH/O3hIbV4V46folo7E2OvAmwWP8Nlq5WKCzqMYK/eDltKzPvsbVMA9u27d6LZbOpf9RXoduKAJdiS2q+hrYo9CBK6vr62kdEQuS0tLbmvQXufsTb2dT0xwCbY46Mj8YNUzmZFWOD07MwknNCCOdbX1kShULBa/w+5iJtbW5FBZ0K6cQvvAfJQriynBCYGSBCMIV3Frkgo+qb7qednVYIyFL81cAxu22Bx96SnAbyS1SD3zoQgqCsohAnPTk9ZsIiflWqVMmmfxM5uRJ7IkZie1REAXIF4zoFeW1/Xlsa8y35EFgQYYHN+bgyLGlZ9r8JGf8wYD7C/yVHSvwNvwNoB7t2Vcy/bnvtNQJz9Ge9/ffNG/Pjy5cj/wKpwY5IKgjGP/rq9/WfcMIRnyPFRsnhHJTbZ3798cS26apDa3PPnYm5uziVJKd/Jz2TkZ9uhLaxc+U+8B3HAnTiwJDy0lfvlUgrDfe3efjrt7u9r0JDvOdeesUwwCD+7u6wbE7BI7leVUmlJdigsqShgipET1EInF3I8YHxqNh9Mubi4eNB/l6NFPtfC7/D3pOTu7u6h1Wo9/LK5Sef0BjcXdCb/44SxcFkzo5lYgBTgynTPpplO6kIEhPliwNB9NberixnroTN0p1isgNXedUs8FAKmwI1I6NkYl4mjCNEH7r3hhiSpC+fa5H+LCpPVwiW9sqZ1wY4k/NSTqE2jyPzAakLNXdd8At1MK5O9XPYD/FoXBSP563DCvjPpXhST8OxooiS6eUIwFFnAyvSu+VG8c+6suw+TdGWbKB0ahm6eEAyL1K1n6aIwq+NVPYQcPvgp8klWMkGVUVDVxKWQFoEuJegGHaneBgZHbwEKeEVPaAoB0AvKjTn3iiSScMIChi7SetAnBx1NQwGL0n2FA+yanZvselCNNHzmP1EVUVwpmwlG2BYYABMdPckPANtdmsQwzsIdn9Wux0GpqqNaTLBap21uGxEsjjXxMNnQoPxEyUoVKFc6B9e1b4w8m9OVLWVng55Ge1BJxV5i1VxQvRtiH7eX1eega1B/bFZMWMz2LiyKzChsI3BcGQH8bUoTj2NVFPgHBwfpAP47ZuMtLataOirJAfbLYVFuRd3HqkSrxLUqadD1VMHCNQFHdA0NGEyXtzNd3NDh9sNQ5o1hVVufLBsiwvS5sNTWJReX7tFsLG5tGwQW1kQHkoDtqdbrjk/+bs0QCZYuB7inW66mLA26lU5a7AmQAEtc+L1quQZtoaKhoycES49zaWQsJS5jweqpiiQHto3aa2bq6ZHiJGiv+jD/YogaoMMBblMFzMoD7qgqprLuOEQCLN3LBpgI0tOdCOVnmbaCzEXksM2QjKWnTY/DaFNIyldUTfI05CQsWKVD0dDNE4KhR9u1Zi7dYFbnv7ZJoUBZsRKHtOB23IiZZeFUwj0CIrpxFj7xC0soqLfhujiSpH0tUD6SBeWW23KFP0aJyTossSXw1lakpoGKvSVtXTMcQXfSsKhbe1rK9A3Nmpxbk5KrlqJrB7lyTScynDsT3Rvm6cOMpW3ikgxWynRLcsQBdjx/hHbWuWZm7vYBdCbxd6QdNcOVW5rVjFN2r4tA+r44pahN0LrejSGcJJopqnslQuqstzG35WxnSxv6AeSkwRP3ts6AKErqmCWbphurY52SJlDOlXH/g94I4J41Yymq4fdVzXama2t3IqCx6lfcWU4CYB3VFXE0WO7kEDqSBmLVdig+9oE4MjDiRiPJg74ygWfY7oUgy1KW8a4spHUgnvqVBxW3WyENqo9dH+fKA7WQjqUxLrXow+yuet9hqh19mN43S1DwxcQutRDQJfFUri3ZQE/1xTTDvb2rh7AArkRM8uohuILkyeldPTSI7GlcLvXrRE7t9WHG2k/jgjizt6f/KwAWi4PNX4tp/pKHD3hHDL7GkxP2vnZfkVBPpPw1nq8y7fKvAAMAfpK0M0P/NYUAAAAASUVORK5CYII=" alt="Help"></div>
        
        <!-- share -->
        <a class="liquid-share"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABE1JREFUeNrsmzFM20AUhg+oxISERIcmU1jomioMFQthLqhIdCAwNFlgQgXRpSxJRia6liVkoIipVGUqQ9ylLIlIN8LSsMQsSEhhYknf796lhwnBdhznjPukUxyIz/fl3r337rfDWMCsz28DfhGLJenlNbU4tWHTvzVqeWoHJ6XSla+BCRSAOWoRCx8HbIqgD3wJTLCr9LIl3o/HYiwej7PnY2PNz9R0nRU0jWmaJp+6Q9Ap37kwtQbaq5mZRrFYbLSz00qlMZ9INMQ51HJyfwM+cOMvOMZs5nM5Fom09+inIyPszdycMeNnZ2f4UzQUDv+60PVT5V2agE8w4HA4zPZ2d9nQ0JCt8xMLC6zyFxprehSBrF/x2Y3iOJtO24aFZTIZcYhoPouDfoUn+K1w5RgFKSeGcxHc5P5UBjZmVxqwI5v6d37cF8DjDmdXWDgUuvW+X+H12xV7oiBoWrjfowVuBYpUtLy05DhgCeNpSaSm3gK3A52ZnnblGlKpqfUM2AtQWKlUYkVq3L56Xml5BQqr1+sssbjIarUa3lapyhr1bIY7Bf12eGjshN6vr99JM/fBLi0vC1hYypPtoRugn7a3mwNHeQnodufCjdPZrAy7RrP70TIwDTraQl2oIghQR1UvQO8UE9RXfHLSKEpEjY21igAlRWXGRYAdSwIAl1LSDygMZdT2QlnoEiiia5anlS2LObrMZ1Z7UPGgQUe4lNLsGN+irC5IkU/YAfcA10HNg+ZfqtC0oiZItHwr0JbA3H0Lwn3hMguJRMsCHu7zeW/vDny3QN2yPgkWkCfChbO0l7QyaAwYTXXQVsBw46QdWLl8k11eRdBbwHzd/sYxZgnNTVMB1Lx5eCeCE9bsYwQ1Axt6D9zYiXbkB1AzcMQkhzgySKOmkk4Z0CYwj86umE6gEqxSoEpLPF0Fvu8umxMLUS5GPuaG9VEgDyp0U6OyawN8oMi/wwhYExMTjjsTUR7QuM2BbRqPD0m6Rpza+YWuV1UAxqBeVs/Pjfsyg4ODHXWKIkRVcAFcoZfVm5sbA7ZTLVhlcAOYLnrFZzmKDTQGaKVUlEtL3LXzA/iAFHB+0Ms81jJ2QlahUWB82Ngwig3zNlJF8OBuDwMpAARS4gmsiOeG+VKmVQXciRAvzfaUcO/A3Wrx9LEl5FhqeZ7zEQwjGBjWnpU8bsdQMaIv9Iv4w3N8uSfPaXkFDu/BmoYwwa+739MH07wAr19fs5/Hxzh8RtfaVEIAQEChNoXgwvOusfbSmYwxQ51uYLgNK6d4mMCDI/F0UwdTWdMq31O32zIRsHwDbHr+2bYVTA+1qAycF+KC08CFc6UvLK80MF/HxiyjNuZigS2Tnqa94ltY5XXpNZGiUBvbgcaXJNXSKSFHK/1EPAoTlIR0OHt5ecm+Hx0ZeVXSvlu68crKiig2YPjdw6anuyUXNh2u/cjj/894fACeZB38UCtw9keAAQCRJFYYaC8jZAAAAABJRU5ErkJggg==" alt="Share"></a>
        
        <div class="liquid-guide none">カメラの使用を許可してください。</div>
        <div class="liquid-guide-marker none"></div>
        <div class="liquid-mess none"></div>
        <div class="liquid-direction none"></div>
        
        <div class="liquid-copy"><a href="https://ar.lqd.jp/" target="_blank">LIQUID AR</a></div>
        
        </body>
        </html>
        `;
    }
}
