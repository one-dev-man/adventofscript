console.log("[service worker]");

// 

function onAoSLoginRequest(callback) {
    setTimeout(() => {
        let check_request = fetch("http://localhost:1266")
    }, 2000);
}

// 

async function getAoCSessionCookie() {
    return (await chrome.cookies.getAll({ url: "https://adventofcode.com/" })).filter(c => c.name == "session").map(c => c.value)[0];
}