/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { dialog, fs } from "@tauri-apps/api";
import { useCallback, useState } from "react";

interface MenuProps extends React.ClassAttributes<HTMLDivElement> {
  history: Array<{ expr: string; res: number }>;
  onExprLoad: (expr: string) => void;
}

export default function Menu({
  history,
  onExprLoad,
}: MenuProps): React.ReactElement {
  const [msg, setMsg] = useState("");

  const handleSave = useCallback(async () => {
    const savePath = (await dialog.open({
      directory: false,
      multiple: false,
    })) as string;
    if (!!savePath) {
      setMsg("Saving...");
      await fs.writeFile({
        path: savePath,
        contents: history.map((e) => `${e.expr} = ${e.res}`).join("\n"),
      });
      setMsg("Saved");
    }
  }, [history]);

  const handleLoad = useCallback(async () => {
    const loadPath = (await dialog.open({
      directory: false,
      multiple: false,
    })) as string;
    const contents = await fs.readTextFile(loadPath);
    const firstLine = contents.split("\n")[0];
    onExprLoad(firstLine);
    setMsg("Loaded");
  }, [onExprLoad]);

  return (
    <div
      className="menu"
      css={css`
        display: flex;
        flex-direction: column;

        & button {
          font-size: 1rem;
          padding: 8px 16px;
        }

        & .message {
          text-align: center;
        }
      `}
    >
      <button onClick={handleSave}>Save history</button>
      <button onClick={handleLoad}>Load expression</button>
      {msg.length > 0 && <p className="message">{msg}</p>}
    </div>
  );
}
