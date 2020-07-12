import React, { Component } from "react";

// import { getVisibleInputs } from "../../helpers/scrape";

// import { browser, Tabs } from "webextension-polyfill-ts";

// // // // //

// // Scripts to execute in current tab
// const scrollToTopScript = `window.scroll(0,0)`;
// const scrollToBottomScript = `window.scroll(0,9999999)`;

// /**
//  * Executes a string of Javascript on the current tab
//  * @param code The string of code to execute on the current tab
//  */
// function executeScript(code: string): void {
//     // Query for the active tab in the current window
//     browser.tabs
//         .query({ active: true, currentWindow: true })
//         .then((tabs: Tabs.Tab[]) => {
//             // Pulls current tab from browser.tabs.query response
//             const currentTab: Tabs.Tab | undefined = tabs[0];
//             // Short circuits function execution is current tab isn't found
//             if (!currentTab) {
//                 return;
//             }
//             // Executes the script in the current tab
//             browser.tabs
//                 .executeScript(currentTab.id, {
//                     code,
//                 })
//                 .then(() => {
//                     console.log("Done Scrolling");
//                 });
//         });
// }

type MainState = {
    sample: string;
};

export default class Main extends Component<{}, MainState> {
    constructor(props: any) {
        super(props);

        this.state = {
            sample: "Hello there!",
        };
    }

    componentDidMount() {
        console.log("Working!");
    }

    handleClick = () => {
        console.log("====================================");
        console.log("button clicked!");
        console.log("====================================");

        // console.log("document url");
        // console.log(document.URL);

        // let inputs = getVisibleInputs();
        // console.log(inputs);
    };

    render() {
        return (
            <div className="row">
                <div className="col-lg-12 text-center">
                    <p className="lead mb-0">Jake says - {this.state.sample}</p>
                    <button onClick={this.handleClick}>Click Me</button>
                </div>
            </div>
        );
    }
}
