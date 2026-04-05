// Select the node that will be observed for mutations
const targetNode = getRootNode();

// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
const callback = (mutationList, observerHandle) => {
    // disconnect so that we don't trigger re-render
    observerHandle.disconnect();
    for (const mutation of mutationList) {
        if (["childList"].includes(mutation.type)) {
            process(targetNode)
        }
    }
    // continue observing
    observerHandle.observe(targetNode, config);
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);
