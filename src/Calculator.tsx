/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import Clock from "./Clock";
import Menu from "./Menu";

const configuration = [
  ["(", ")", "DEL", "AC"],
  ["7", "8", "9", "/"],
  ["4", "5", "6", "*"],
  ["1", "2", "3", "-"],
  ["0", ".", "=", "+"],
];
const funcKeys = ["DEL", "AC"];
const opKeys = ["/", "*", "-", "+", "(", ")"];

const baseKeyStyle = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #215a69;
  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.73);
  border-radius: 4px;
  font-size: 1.2rem;
  margin: 4px;
  width: 52px;
  height: 52px;
  text-align: center;
  cursor: pointer;
  /* transition: all 0.1s ease-in-out; */
  user-select: none;

  &:hover {
    background-color: #999999;
  }

  &:active {
    transform: translateY(2px) translateX(2px);
    box-shadow: 0px 0px 0px 0px;
  }
`;

function styleForKey(key: string) {
  if (funcKeys.includes(key)) {
    return css`
      background-color: #fa7e61;
      font-weight: bold;
    `;
  } else if (opKeys.includes(key)) {
    return css`
      background-color: #b5a886;
    `;
  } else if (key === "=") {
    return css`
      background-color: #f44174;
      font-weight: bold;
    `;
  } else {
    return css`
      color: #215a69;
      background-color: #fee1c7;
    `;
  }
}

export default function Calculator(): React.ReactElement {
  const [history, setHistory] = useState<Array<{ expr: string; res: number }>>(
    []
  );
  const [expr, setExpr] = useState("");

  const handleClick = (key: string): void => {
    if (key === "DEL") {
      setExpr(expr.slice(0, -1));
    } else if (key === "AC") {
      setExpr("");
    } else if (key === "=") {
      try {
        // eslint-disable-next-line no-eval
        const res = eval(expr);
        setHistory([...history, { expr, res }]);
        setExpr(res.toString());
      } catch (e) {
        setExpr("");
      }
    } else {
      setExpr(expr + key);
    }
  };

  return (
    <div
      css={css`
        padding: 16px 16px;
        height: 100vh;
        min-width: 800px;
        max-width: 900px;
        background: rgb(148, 187, 233);
        background: radial-gradient(
          circle,
          rgba(148, 187, 233, 0.6) 0%,
          rgba(238, 174, 202, 0.8) 99%
        );
      `}
    >
      <div
        css={css`
          height: 60px;
          border: 2px solid #222222;
          box-shadow: 0px 0px 0px 4px rgba(90, 175, 197, 0.71);
          text-align: right;
          font-size: 2rem;
          margin-bottom: 40px;
          overflow-x: auto;
        `}
      >
        {expr}
      </div>
      <div
        css={css`
          display: flex;
          align-items: center;

          & > canvas {
            margin-left: auto;
          }

          & > .menu {
            margin-left: auto;
            margin-right: 20px;
          }
        `}
      >
        <Clock length={250} />
        <Menu
          history={history}
          onExprLoad={(e) => {
            setExpr(e);
          }}
        />
        <div
          css={css`
            padding: 16px;
            border: 2px solid #555555;
            box-shadow: 0px 12px 10px -3px rgba(32, 21, 121, 0.68);
          `}
        >
          {configuration.map((row, rowId) => (
            <div key={rowId}>
              {row.map((key) => (
                <div
                  css={css`
                    ${baseKeyStyle}${styleForKey(key)}
                  `}
                  key={key}
                  onClick={() => handleClick(key)}
                  tabIndex={0}
                >
                  {key}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
