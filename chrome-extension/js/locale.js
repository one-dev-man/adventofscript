export const Locale = {
    AOC_HOSTNAME: "adventofcode.com",

    getCurrentTab: async () => {
        return (await chrome.tabs.query({ active: true, lastFocusedWindow: true }))[0]
    },
    
    isOnAOCTab: async () => {
        let tab = await Locale.getCurrentTab();
        
        if(!tab.url)
            return false;
    
        return new URL(tab.url).hostname == Locale.AOC_HOSTNAME;
    },

    getAOCTabs: async () => {
        return Array.from(await chrome.tabs.query({})).filter(t => t.url.includes(Locale.AOC_HOSTNAME));
    }
}