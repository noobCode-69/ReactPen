import "./text-editor.css";
import MDEditor from "@uiw/react-md-editor";
import { useActions } from "../hooks/use-actions";

import { useState, useEffect, useRef } from "react";
import { Cell } from "../state";
interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const [editing, setEditing] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const { updateCell } = useActions();

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return;
      }
      setEditing(false);
    };
    document.addEventListener("click", listener, { capture: true });

    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div className="text-editor" ref={ref}>
        <MDEditor
          maxHeight={window.innerHeight * 0.9}
          highlightEnable={false}
          data-color-mode="dark"
          onChange={(value) =>
            updateCell(cell.id, value == undefined ? "" : value)
          }
          value={cell.content}
        />
      </div>
    );
  }

  const valueToDisplay =
    cell.content == "" || cell.content == undefined
      ? "Click here to edit..."
      : cell.content;

  return (
    <div
      className="text-editor text-editor-preview card"
      onClick={() => setEditing(true)}
    >
      <div className="card-content">
        <MDEditor.Markdown source={valueToDisplay} />
      </div>
    </div>
  );
};

export default TextEditor;
