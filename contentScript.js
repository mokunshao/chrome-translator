class Translator {
  constructor() {
    this.creatPanel();
    this.bind();
  }
  creatPanel() {
    let panelContent = `
    <header><span>ktranslator</span><span class="exit">x</span></header>
    <main>
      <div class="lang" id="lang1">Language 1</div>
      <div class="text1">...</div>
      <hr />
      <div class="lang" id="lang2">Language 2</div>
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
  translate(raw) {
    this.container.querySelector("#lang1").innerText = lang1;
    this.container.querySelector("#lang2").innerText = lang2;
    this.container.querySelector(".text1").innerText = raw;
    this.container.querySelector(".text2").innerText = null;
    fetch(
      `https://translate.google.cn/translate_a/single?client=gtx&sl=${lang1}&tl=${lang2}&dt=t&q=${raw}`
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

let switchStatus, lang1, lang2;

chrome.storage.local.get(["switchStatus", "lang1", "lang2"], function(e) {
  if (e.switchStatus) {
    switchStatus = e.switchStatus;
    lang1 = e.lang1;
    lang2 = e.lang2;
  } else {
    switchStatus = "off";
    lang1 = "auto";
    lang2 = "zh-CN";
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  chrome.storage.local.get(["switchStatus", "lang1", "lang2"], function(e) {
    switchStatus = e.switchStatus;
    lang1 = e.lang1;
    lang2 = e.lang2;
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
