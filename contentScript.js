// let lang1 = "en";
// let lang2 = "zh-CN";

class Panel {
  constructor() {
    this.creatPanel();
    this.bind();
  }
  creatPanel() {
    let html = `
    <div class="_kt_panel">
        <div class="_kt_lang1">...</div>
        <div class="_kt_lang2">...</div>
    </div>`;
    let container = document.createElement("div");
    container.innerHTML = html;
    container.classList.add("_kt_thePanel");
    document.body.appendChild(container);
    this.container = container;
  }
  bind() {
    this.container.onclick = () => {
      this.hide();
    };
  }
  show() {
    this.container.style.display = "block";
  }
  hide() {
    this.container.style.display = "none";
  }
  // isShow() {
  //   return window.getComputedStyle(this.container).display === "block";
  // }
  translate(lang1) {
    this.container.querySelector("._kt_lang1").innerText = lang1;
    // fetch(
    //   `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=zh&dt=t&q=${lang1}`
    // )
      // .then(res => res.json())
      // .then(result => {
      //   this.container.querySelector("._kt_lang2").innerText = result[0][0][0];
      // });
  }
}

let panel = new Panel();

let theSwitch = "off";

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(request);

  if (request.theSwitch) {
    theSwitch = request.theSwitch;
    sendResponse({ theSwitch: theSwitch, lang1: 1112323656561 });
  }
});

document.onmouseup = () => {
  let str = window
    .getSelection()
    .toString()
    .trim();

  if (str) {
    let fn = () => {
      return new Promise(resolve => {
        panel.translate();
        panel.show();
        resolve();
      });
    };

    fn().then(() => {
      setTimeout(() => {
        panel.hide();
        str = null;
      }, 2000);
    });
  }

  if (!str || theSwitch === "off") {
    panel.hide();
  }
};
