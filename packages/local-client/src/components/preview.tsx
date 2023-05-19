import "./preview.css";
import { useRef, useEffect } from "react";
import { useTypedSelector } from "../hooks/use-typed-selector";
interface PreviewProps {
  code: string;
  error: string;
}

const html = `
    <html>
      <head>
        <style>
          html {
            background-color : white;
          }
        </style>
      </head>
      <body>
        <div id="root"></div>
        <script>
          const handleError = (err) => {
            const root = document.querySelector('#root');
            root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
            console.error(err);
          }
          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch (err) {
              handleError();
            }
          }, false);
          window.addEventListener('error' , (event) => {
            event.preventDefault();
            handleError();
          })
        </script>
      </body>
    </html>
  `;

const Preview: React.FC<PreviewProps> = ({ code, error }) => {
  const iframe = useRef<any>();

  const order = useTypedSelector((state) => {
    return state.cells.order;
  });

  useEffect(() => {
    iframe.current.srcdoc = html;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, "*");
    }, 50);
  }, [code, order]);

  return (
    <div className="preview-wrapper">
      <iframe
        title="preview"
        ref={iframe}
        sandbox="allow-scripts"
        srcDoc={html}
      />
      {error && <div className="preview-error">{error}</div>}
    </div>
  );
};

export default Preview;
