let theSwitch = document.querySelector("#switch");

chrome.storage.local.get(["switchStatus"], e => {
  if (e.switchStatus) {
    theSwitch.querySelector(`input[value="${e.switchStatus}"]`).checked = true;
  } else {
    theSwitch.querySelector(`input[value="off"]`).checked = true;
  }
});

theSwitch.onchange = function(e) {
  e.target.checked = true;
  chrome.storage.local.set({ switchStatus: e.target.value });
};

document.querySelector("#go-to-options").addEventListener("click", function() {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL("options.html"));
  }
});
