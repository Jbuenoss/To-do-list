let docHead = document.head;
const topElement = document.getElementById("top");

const cssLink = document.createElement("link");
cssLink.rel = "stylesheet";
cssLink.href = "css/header.css";
cssLink.media = "all";

docHead.append(cssLink);

const title = document.createElement("h1");

title.innerText = "To-do list";

topElement.append(title);