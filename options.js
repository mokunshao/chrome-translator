let select1 = document.querySelector("#select1");
let select2 = document.querySelector("#select2");

chrome.storage.local.get(["lang1", "lang2"], function(e) {
  if (e.lang1) {
    select1.value = e.lang1.value;
  }
  if (e.lang2) {
    select2.value = e.lang2.value;
  }
  if (!e.lang1) {
    select1.value = "auto";
    chrome.storage.local.set({ lang1: { value: "auto", label: "auto" } });
  }
  if (!e.lang2) {
    select2.value = "zn-CN";
    chrome.storage.local.set({ lang1: { value: "zh-CN", label: "简体中文" } });
  }
});

select1.onchange = function() {
  let label = select1.querySelector(`option[value=${this.value}]`).label;
  chrome.storage.local.set({ lang1: { value: this.value, label: label } });
};

select2.onchange = function() {
  let label = select2.querySelector(`option[value=${this.value}]`).label;
  chrome.storage.local.set({ lang2: { value: this.value, label: label } });
};
