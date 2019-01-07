class Panel {
  constructor() {
    this.creatPanel();
    // this.bind();
  }
  creatPanel() {
    let html = `
    <div class="_kt_panel">
        <div class="_kt_lang1">...</div>
        <hr>
        <div class="_kt_lang2">...</div>
    </div>`;
    let container = document.createElement("div");
    container.innerHTML = html;
    container.classList.add("_kt_thePanel");
    document.body.appendChild(container);
    this.container = container;
  }
  // bind() {
  //   this.container.onclick = () => {
  //     this.hide();
  //   };
  // }
  show() {
    this.container.style.display = "block";
  }
  hide() {
    this.container.style.display = "none";
  }
  translate(lang1) {
    this.container.querySelector("._kt_lang1").innerText = lang1;
    this.container.querySelector("._kt_lang2").innerText = null;
    fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=zh&dt=t&q=${lang1}`
    )
      .then(res => res.json())
      .then(result => {
        for (let i = 0; i < result[0].length; i++) {
          this.container.querySelector("._kt_lang2").innerText +=
            result[0][i][0];
        }
      });
  }
  setPositon(x, y) {
    this.container.style.left = x + "px";
    this.container.style.top = y + "px";
  }
}

let panel = new Panel();

let theSwitch = "off";

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.theSwitch) {
    theSwitch = request.theSwitch;
    sendResponse({ theSwitch: theSwitch });
  }
});

document.onmouseup = e => {
  let selectedText = window
    .getSelection()
    .toString()
    .trim();

  if (selectedText && theSwitch === "on") {
    panel.setPositon(e.clientX, e.clientY);
    panel.show();
    panel.translate(selectedText);
  } else if (!selectedText || theSwitch === "off") {
    panel.hide();
  }
};
