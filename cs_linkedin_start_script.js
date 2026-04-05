const s = document.createElement("script");
s.src = chrome.runtime.getURL("cs_linkedin_page_hook.js");
s.onload = () => s.remove();

(document.documentElement || document.head || document).appendChild(s);