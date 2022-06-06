import "./assets/css/bootstrap.min.css";
import "./assets/js/bootstrap.min";
import "./assets/js/jquery-3.6.0.min";
import AreaFooter from "./components/AreaFooter";
import AreaHeader from "./components/AreaHeader";
import AreaMain from "./components/AreaMain";

document.querySelector('#app').innerHTML = `
  <div id="header"></div>
  <div id="main"></div>
  <div id="footer"></div>
  `
document.querySelector('#header').innerHTML = AreaHeader.html();
document.querySelector('#main').innerHTML = AreaMain.html();
AreaMain.methodz();
document.querySelector('#footer').innerHTML = AreaFooter.html();