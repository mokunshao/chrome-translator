let lang1 = document.querySelector("#lang1");
let lang2 = document.querySelector("#lang2");

chrome.storage.local.get(["lang1", "lang2"], function(e) {
  lang1.value = e.lang1;
  lang2.value = e.lang2;
});

lang1.onchange = function(e) {
  chrome.storage.local.set({ lang1: e.target.value });
  chrome.tabs.query({ url: "<all_urls>" }, tabs => {
    for (let i = 1; i < tabs.length; i++) {
      chrome.tabs.sendMessage(tabs[i].id, {});
    }
  });
};

lang2.onchange = function(e) {
  chrome.storage.local.set({ lang2: e.target.value });
  chrome.tabs.query({ url: "<all_urls>" }, tabs => {
    for (let i = 1; i < tabs.length; i++) {
      chrome.tabs.sendMessage(tabs[i].id, {});
    }
  });
};
