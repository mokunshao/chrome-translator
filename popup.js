let theSwitch = document.querySelector("#switch");

chrome.storage.local.get(["switchStatus"], e => {
  if (e.switchStatus) {
    theSwitch.querySelector(`input[value="${e.switchStatus}"]`).checked = true;
  } else {
    theSwitch.querySelector(`input[value="off"]`).checked = true;
  }
  chrome.tabs.query({ url: "<all_urls>" }, tabs => {
    for (let i = 1; i < tabs.length; i++) {
      chrome.tabs.sendMessage(tabs[i].id, {});
    }
  });
});

theSwitch.onchange = function(e) {
  e.target.checked = true;
  chrome.storage.local.set({ switchStatus: e.target.value });
  chrome.tabs.query({ url: "<all_urls>" }, tabs => {
    for (let i = 1; i < tabs.length; i++) {
      chrome.tabs.sendMessage(tabs[i].id, {});
    }
  });
};

document.querySelector("#go-to-options").addEventListener('click',function() {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL("options.html"));
  }
});
