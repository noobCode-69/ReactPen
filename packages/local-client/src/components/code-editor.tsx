import "./code-editor.css";
import "./syntax.css";
import Editor, { Monaco } from "@monaco-editor/react";
import parser from "prettier/parser-babel";
import { editor } from "monaco-editor";
import prettier from "prettier";
import { useRef } from "react";

interface CodeEditorProps {
  initialValue: string;
  onChange: (value: string | undefined) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
  const activateMonacoJSXHighlighter = async (
    editor: editor.IStandaloneCodeEditor,
    monaco: Monaco
  ) => {
    const { default: traverse } = await import("@babel/traverse");
    const { parse } = await import("@babel/parser");
    const { default: MonacoJSXHighlighter } = await import(
      "monaco-jsx-highlighter"
    );

    const monacoJSXHighlighter = new MonacoJSXHighlighter(
      monaco,
      parse,
      traverse,
      editor
    );

    monacoJSXHighlighter.highlightOnDidChangeModelContent();
    monacoJSXHighlighter.addJSXCommentCommand();

    return {
      monacoJSXHighlighter,
    };
  };

  const editorRef = useRef<editor.IStandaloneCodeEditor | undefined>(undefined);

  const onEditorContentChange = (value: string | undefined) => {
    onChange(value);
  };

  const handleEditorDidMount = (
    editor: editor.IStandaloneCodeEditor,
    monaco: Monaco
  ) => {
    editorRef.current = editor;
    activateMonacoJSXHighlighter(editor, monaco);
  };

  const onFormatClick = () => {
    if (!editorRef.current) {
      return;
    }
    const unformatted = editorRef.current.getValue();
    const formatted = prettier
      .format(unformatted, {
        parser: "babel",
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, "");
    editorRef.current.setValue(formatted);
  };

  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={onFormatClick}
      >
        Format
      </button>
      <Editor
        value={initialValue}
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          tabSize: 2,
        }}
        theme="vs-dark"
        height={'100%'}
        language="javascript"
        onChange={onEditorContentChange}
        onMount={handleEditorDidMount}
      />
    </div>
  );
};

export default CodeEditor;
