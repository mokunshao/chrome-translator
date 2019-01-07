let selectNode = document.querySelector("#select");
selectNode.onchange = function() {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { theSwitch: this.value }, response => {
      console.log(response);
    });
  });
};
