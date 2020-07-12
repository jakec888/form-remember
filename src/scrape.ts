import { browser } from "webextension-polyfill-ts";

function getVisibleInputs() {
    let all = document.getElementsByTagName("input");
    let visibleInput: any[] = [];

    console.log("all");
    console.log(all);

    for (var i = 0, max = all.length; i < max; i++) {
        var style = window.getComputedStyle(all[i]);
        if (
            style.display === "none" ||
            style.visibility === "hidden" ||
            all[i].attributes[<any>"type"].value === "hidden"
        ) {
            visibleInput.push(all[i]);
        }

        console.log("visibleInput");
        console.log(visibleInput);

        return visibleInput;
    }
}

browser.runtime.onMessage.addListener((request: { find: boolean }) => {
    if (request.find) {
        console.log("getting all visible inputs");
        getVisibleInputs();
        console.log("all visible inputs gotten");
    }
});
