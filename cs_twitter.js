function getRootNode() {
    return document.getElementById("react-root")
}

function process(root) {
    try {
        root.querySelectorAll("nav[role=navigation][aria-live=polite]")[0].querySelectorAll("div[role=tablist]")[0].innerHTML = ""
    } catch (err) { }

    try {
        const sidebar = root.querySelector("div[aria-label=Trending]");
        if (sidebar != null) {
            const parent = sidebar.children[0];
            const sidebarElements = [...sidebar.children[0].children].slice(2);
            for (let el of sidebarElements) {
                parent.removeChild(el)
            }
        }
    } catch (err) { }

    try {
        const posts = root.querySelectorAll("article[role=article][data-testid=tweet]");
        for (let post of posts) {
            for (let span of post.getElementsByTagName("span")) {
                if (span.innerText == "Ad") {
                    post.innerHTML = "ad removed"
                }
            }
        }
    } catch (err) { }

    try {
        const nav = root.querySelectorAll("nav[aria-label=Primary][role=navigation]")[0];
        for (let a of nav.children) {
            let removeEntry = false;
            removeEntry = removeEntry || a.href.endsWith("/grok")
            removeEntry = removeEntry || a.href.endsWith("/premium_sign_up")
            removeEntry = removeEntry || a.href.endsWith("/bookmarks")
            removeEntry = removeEntry || a.href.endsWith("/studio")

            if (removeEntry) {
                nav.removeChild(a)
            }
        }
    } catch (err) { }
}