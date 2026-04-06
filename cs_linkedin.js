function getRootNode() {
    const iframe = document.querySelector(`iframe[data-testid="interop-iframe"]`);
    if (iframe != null) {
        return iframe.contentDocument
    }
    const vfeed = document.getElementById("voyager-feed")
    if (vfeed != null) {
        return vfeed
    }
    return document.getElementById("root")
}

function process(root) {
    try{
        const news = root.querySelectorAll(`aside[aria-label="LinkedIn News"]`)[0]
        news.parentElement.removeChild(news)
    } catch(err) {}

    try{
        const articles = document.querySelectorAll(`div[role=article]`)
        for (let article of articles) {
            let removeElement = false;
            const spans = article.getElementsByTagName("span")
            for (let span of spans) {
                const content = span.innerText.toLowerCase();
                removeElement = content.includes("suggested")
                removeElement = removeElement || content.includes("promoted")

                if (removeElement) {
                    break
                }
            }
            if (removeElement) {
                article.innerHTML = "removed"
            }
        }
    } catch(err) {}

    return getRootNode()
}