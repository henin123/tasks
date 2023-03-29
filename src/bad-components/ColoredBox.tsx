import React, { useState } from "react";
import { Button } from "react-bootstrap";

interface Colored {
    setColor: () => void;
}

export const COLORS = ["red", "blue", "green"];

const DEFAULT_COLOR_INDEX = 0;

function ChangeColor({ setColor }: Colored): JSX.Element {
    return <Button onClick={setColor}>Next Color</Button>;
}

function ColorPreview({ colorIndex }: { colorIndex: number }): JSX.Element {
    return (
        <div
            data-testid="colored-box"
            style={{
                width: "50px",
                height: "50px",
                backgroundColor: COLORS[colorIndex],
                display: "inline-block",
                verticalAlign: "bottom",
                marginLeft: "5px"
            }}
        ></div>
    );
}

export function ColoredBox(): JSX.Element {
    const [colorIndex, setColorIndex] = useState<number>(DEFAULT_COLOR_INDEX);
    const change = () => setColorIndex((1 + colorIndex) % COLORS.length);
    return (
        <div>
            <h3>Colored Box</h3>
            <span>The current color is: {COLORS[colorIndex]}</span>
            <div>
                <ChangeColor setColor={change}></ChangeColor>
                <ColorPreview colorIndex={colorIndex}></ColorPreview>
            </div>
        </div>
    );
}