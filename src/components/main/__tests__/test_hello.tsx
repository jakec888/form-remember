import * as React from "react";
import Main from "../component";
import renderer, { ReactTestRendererJSON } from "react-test-renderer";

it("component renders", () => {
    const tree: ReactTestRendererJSON | null = renderer
        .create(<Main />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
