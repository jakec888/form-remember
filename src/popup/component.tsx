import React, { FunctionComponent } from "react";
// import { Hello } from "@src/components/hello";
import { browser } from "webextension-polyfill-ts";
// import { Scroller } from "@src/components/scroller";
import "./styles.scss";

import Main from "@src/components/main";

// // // //

// export const Popup: FunctionComponent = () => {
//     // Sends the `popupMounted` event
//     React.useEffect(() => {
//         browser.runtime.sendMessage({ popupMounted: true });
//     }, []);

//     // Renders the component tree
//     return (
//         <div className="popup-container">
//             <div className="container mx-4 my-4">
//                 <Main />
//                 {/* <Hello />
//                 <hr />
//                 <Scroller /> */}
//             </div>
//         </div>
//     );
// };

export const Popup: FunctionComponent = () => {
    // Sends the `popupMounted` event
    React.useEffect(() => {
        browser.runtime.sendMessage({ popupMounted: true });
        browser.runtime.sendMessage({ find: true });
    }, []);

    // Renders the component tree
    return (
        <div className="popup-container">
            <div className="container mx-4 my-4">
                <Main />
            </div>
        </div>
    );
};
