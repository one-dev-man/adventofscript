console.log("[service worker]");

// 

chrome.tabs.onActivated.addListener(activation_info => {
    console.log(activation_info);
});

// 

async function getAoCSessionCookie() {
    return (await chrome.cookies.getAll({ url: "https://adventofcode.com/" })).filter(c => c.name == "session").map(c => c.value)[0];
}