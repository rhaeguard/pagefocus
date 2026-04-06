// Select the node that will be observed for mutations
let targetNode = getRootNode();

// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };

/**
 * Callback function to execute when mutations are observed
 * 
 * @param {MutationRecord[]} mutationList
 * @param {MutationObserver} observerHandle
 */
const callback = (mutationList, observerHandle) => {
    // disconnect so that we don't trigger re-render
    observerHandle.disconnect();
    const oldTargetNode = targetNode;
    targetNode = process(targetNode);
    if (targetNode == null) {
        targetNode = oldTargetNode
    }
    // continue observing
    observerHandle.observe(targetNode, config);
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);
