chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "ktranslator",
    title: "Translate '%s'",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener(e => {
  chrome.tabs.create({
    url: `https://translate.google.cn/#view=home&op=translate&sl=auto&tl=zh-CN&text=${
      e.selectionText
    }`
  });
});
