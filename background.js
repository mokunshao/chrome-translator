let lang1, lang2;

chrome.storage.local.get(["lang1", "lang2"], function(e) {
  if (e.lang1) {
    lang1 = e.lang1;
  }
  if (e.lang2) {
    lang2 = e.lang2;
  }
  if (!e.lang1) {
    lang1 = { value: "auto", label: "auto" };
  }
  if (!e.lang1) {
    lang1 = { value: "zh-CN", label: "简体中文" };
  }
});

chrome.storage.onChanged.addListener(function(e) {
  if (e.lang1) {
    lang1 = e.lang1.newValue;
  }
  if (e.lang2) {
    lang2 = e.lang2.newValue;
  }
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "ktranslator",
    title: "Translate '%s'",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener(e => {
  chrome.tabs.create({
    url: `https://translate.google.cn/#view=home&op=translate&sl=${
      lang1.value
    }&tl=${lang2.value}&text=${e.selectionText}`
  });
});
