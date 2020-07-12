import React, { Component } from "react";

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

    isHidden = (ele: any) => {
        var style = window.getComputedStyle(ele);
        return (
            style.display === "none" ||
            style.visibility === "hidden" ||
            ele.attributes["type"].value === "hidden"
        );
    };

    handleClick = () => {
        console.log("====================================");
        console.log("button clicked!");
        console.log("====================================");

        console.log("all inputs:");
        let all = document.getElementsByTagName("input");
        console.log(all);

        let my_input = [];

        for (var i = 0, max = all.length; i < max; i++) {
            if (this.isHidden(all[i]) === false) {
                my_input.push(all[i]);
            }
        }

        console.log("My input:");
        console.log(my_input);
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
