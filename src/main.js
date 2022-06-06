import "./assets/css/bootstrap.min.css";
import "./assets/js/bootstrap.min";
import "./assets/js/jquery-3.6.0.min";
import AreaFooter from "./components/AreaFooter";
import AreaHeader from "./components/AreaHeader";
import AreaMain from "./components/AreaMain";

document.querySelector('#app').innerHTML = `
  <div class="container">
  <div id="header"></div>
  <div id="main"></div>
  <div id="footer"></div>
  </div>
  `
document.querySelector('#header').innerHTML = AreaHeader.htmlz();
document.querySelector('#main').innerHTML = AreaMain.htmlz();
AreaMain.scriptz();
document.querySelector('#footer').innerHTML = AreaFooter.htmlz();