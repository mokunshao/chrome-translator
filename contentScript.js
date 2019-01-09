class Translator {
  constructor() {
    this.creatPanel();
    this.bind();
  }
  creatPanel() {
    let panelContent = `
    <header><span>ktranslator</span><span class="exit">x</span></header>
    <main>
      <div class="lang">语言1</div>
      <div class="text1">...</div>
      <hr />
      <div class="lang">语言2</div>
      <div class="text2">...</div>
    </main>
    `;
    let container = document.createElement("div");
    container.innerHTML = panelContent;
    container.classList.add("ktranslator");
    document.body.appendChild(container);
    this.container = container;
  }
  bind() {
    this.container.querySelector(".exit").addEventListener("click", () => {
      this.hidePanel();
    });
  }
  showPanel() {
    this.container.classList.add("show");
  }
  hidePanel() {
    this.container.classList.remove("show");
  }
  translate(lang1) {
    this.container.querySelector(".text1").innerText = lang1;
    this.container.querySelector(".text2").innerText = null;
    fetch(
      `https://translate.google.cn/translate_a/single?client=gtx&sl=auto&tl=zh&dt=t&q=${lang1}`
    )
      .then(res => res.json())
      .then(result => {
        for (let i = 0; i < result[0].length; i++) {
          this.container.querySelector(".text2").innerText += result[0][i][0];
        }
      });
  }
  setPositon(x, y) {
    this.container.style.left = x + "px";
    this.container.style.top = y + "px";
  }
}

let translator = new Translator();

let switchStatus;

chrome.storage.local.get(["switchStatus"], function(e) {
  if (e.switchStatus) {
    switchStatus = e.switchStatus;
  } else {
    switchStatus = "off";
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  chrome.storage.local.get(["switchStatus"], function(e) {
    switchStatus = e.switchStatus;
  });
});

document.onmouseup = e => {
  let selectedText = window
    .getSelection()
    .toString()
    .trim();

  if (selectedText && switchStatus === "on") {
    translator.setPositon(e.clientX, e.clientY);
    translator.showPanel();
    translator.translate(selectedText);
  } else if (!selectedText || switchStatus === "off") {
    // translator.hidePanel();
  }
};
