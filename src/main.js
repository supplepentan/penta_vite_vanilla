import "./assets/css/bootstrap.min.css";
import "./assets/js/bootstrap.min";
import "./assets/js/jquery-3.6.0.min";
import Footer from "./components/areaFooter";
import Header from "./components/AreaHeader";
const header = new Header();
const footer = new Footer();
document.querySelector('#app').innerHTML = `
  <div id="header">もとヘッダー</div>
  <div id="main"></div>
  <div id="canvas"></div>
  <div id="footer">もとフッター</div>
  `
document.querySelector('#header').innerHTML = header.html
document.querySelector('#footer').innerHTML = footer.html