function getRootNode() {
    return document.body
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
}