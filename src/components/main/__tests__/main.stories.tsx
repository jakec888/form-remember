import * as React from "react";
import { storiesOf } from "@storybook/react";
import Main from "../component";
import { Story } from "@src/components/dev";

// // // //

storiesOf("Hello", module).add("renders", () => {
    return (
        <Story>
            <Main />
        </Story>
    );
});
