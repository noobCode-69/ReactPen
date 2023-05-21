import express from "express";
import fs from "fs/promises";
import path from "path";
interface Cell {
  id: string;
  content: string;
  type: "code" | "text";
}

const initialValue = [
  {
    content:
      '<h2 align="center">🚀 Introducing ReactPen: Your Companion for React Code Collaboration and Sharing</h2>\n<ul >\n    <li><strong>⚡️ Interactive Development -</strong> Write and test React components in an interactive environment.</li>\n    <li><strong>🌟 Live Preview -</strong> See the changes to your components in real-time.</li>\n    <li><strong>📃 Documentation Generation -</strong> Generate documentation alongside your components effortlessly.</li>\n    <li><strong>👥 Collaboration -</strong> Share and collaborate on your React components and documents with others.</li>\n</ul>',
    type: "text",
    id: "ija",
  },
  {
    content: "### Write React code without leaving your browser 🤩",
    type: "text",
    id: "min",
  },
  {
    content:
      "import React, { useEffect } from 'react';\nimport ReactDOM from 'react-dom';\n\nconst logo =\n  'https://th.bing.com/th/id/R.f81a6f373c244b1f70f4b7402b5ab372?rik=rbXh4ieLuKt%2bmA&riu=http%3a%2f%2flogos-download.com%2fwp-content%2fuploads%2f2016%2f09%2fReact_logo_logotype_emblem.png&ehk=QhGOkKcUKCU7FBQgHOajOiJqJBACUTD2Ni6LsfqzCEA%3d&risl=&pid=ImgRaw&r=0';\n\nfunction App() {\n\n  \n\n  const logoStyle = {\n    height: '40vmin',\n    pointerEvents: 'none',\n  };\n\n  const headerStyle = {\n    backgroundColor: '#282c34',\n    minHeight: '100vh',\n    display: 'flex',\n    flexDirection: 'column',\n    alignItems: 'center',\n    justifyContent: 'center',\n    fontSize: 'calc(10px + 2vmin)',\n    color: 'white',\n  };\n\n  const linkStyle = {\n    color: '#61dafb',\n  };\n\n  return (\n    <div className=\"App\">\n      <header className=\"App-header\" style={headerStyle}>\n        <img\n          src={logo}\n          className=\"App-logo\"\n          alt=\"logo\"\n          style={logoStyle}\n        />\n        <p>\n          Edit <code>src/App.js</code> and save to reload.\n        </p>\n        <a\n          className=\"App-link\"\n          href=\"https://reactjs.org\"\n          target=\"_blank\"\n          rel=\"noopener noreferrer\"\n          style={linkStyle}\n        >\n          Learn React\n        </a>\n      </header>\n    </div>\n  );\n}\n\nReactDOM.render(<App />, document.querySelector('#root'));",
    type: "code",
    id: "dsf",
  },
  {
    content: "### Make Public API requests on the fly🚀",
    type: "text",
    id: "ksu",
  },
  {
    content:
      "import React, { useState, useEffect } from 'react';\nimport ReactDOM from 'react-dom'\nimport axios from 'axios';\n\nconst BlogList = () => {\n  const [blogs, setBlogs] = useState([]);\n\n  useEffect(() => {\n    const fetchBlogs = async () => {\n      try {\n        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');\n        setBlogs(response.data);\n      } catch (error) {\n        console.error('Error fetching blogs:', error);\n      }\n    };\n\n    fetchBlogs();\n  }, []);\n\n  return (\n    <div>\n      <h2>Blog List</h2>\n      {blogs.map(blog => (\n        <div key={blog.id} style={{ border: '1px solid black', padding: '10px', marginBottom: '10px' }}>\n          <h3 style={{ color: 'blue' }}>{blog.title}</h3>\n          <p style={{ fontStyle: 'italic' }}>{blog.body}</p>\n        </div>\n      ))}\n    </div>\n  );\n};\n\nReactDOM.render(<BlogList/> , document.querySelector(\"#root\"))\n",
    type: "code",
    id: "xhw",
  },
  {
    content: "### Import any npm package without any hassle 🎉",
    type: "text",
    id: "gfr",
  },
  {
    content:
      "import React, { useState } from 'react';\nimport DatePicker from 'react-datepicker';\nimport 'react-datepicker/dist/react-datepicker.css';\nimport ReactDOM from 'react-dom';\n\nconst MyDatePicker = () => {\n  const [selectedDate, setSelectedDate] = useState(null);\n\n  const handleDateChange = date => {\n    setSelectedDate(date);\n  };\n\n  const containerStyle = {\n    display: 'flex',\n    flexDirection: 'column',\n    alignItems: 'center',\n    height: '100vh',\n    backgroundColor: '#f8f8f8',\n  };\n\n  const headingStyle = {\n    fontSize: '24px',\n    marginBottom: '20px',\n  };\n\n  const datePickerContainerStyle = {\n    display: 'flex',\n    justifyContent: 'center',\n  };\n\n  const datePickerStyle = {\n    fontSize: '16px',\n    padding: '10px',\n    borderRadius: '4px',\n    border: '1px solid #ccc',\n  };\n\n  return (\n    <div style={containerStyle}>\n      <h1 style={headingStyle}>React Datepicker Example</h1>\n      <div style={datePickerContainerStyle}>\n        <DatePicker\n          selected={selectedDate}\n          onChange={handleDateChange}\n          dateFormat=\"dd/MM/yyyy\"\n          placeholderText=\"Select a date\"\n          style={datePickerStyle}\n        />\n      </div>\n    </div>\n  );\n};\n\nReactDOM.render(<MyDatePicker />, document.querySelector('#root'));\n",
    type: "code",
    id: "bl4",
  },
  {
    content:
      '<h2 align="center">How does it work?</h2>\n\n1. Install the package  "npm i -g react-journal"\n\n2. Run the package "react-journal filename -p PORT_NUMBER"\n\n3.  The App will start at the specified port number and you will see a file with specified filename will be created (if it does not exist) , This is the file where users data get\'s store\n',
    type: "text",
    id: "mdk",
  },
  {
    content:
      '<h2 align="center">⚠️WARNINGS!!!</h2>\n \n1. Very minimal scope right now.\n2. The package is not tested properly therefore can have bugs\n3. Packages that are not available on "unpkg" will not be dynamically imported.\n4. If at any point you loose you screen, close you server at the terminal (Ctrl +C) , delete the file and then restart the server again.',
    type: "text",
    id: "aso",
  },
];

const initialValueString = JSON.stringify(initialValue);

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();

  router.use(express.json());

  const fullPath = path.join(dir, filename);
  router.get("/cells", async (req, res) => {
    try {
      const result = await fs.readFile(fullPath, { encoding: "utf-8" });
      // console.log(result);
      return res.send(JSON.parse(result));
    } catch (error: any) {
      if (error.code === "ENOENT") {
        // Add code to create a file and add default cells
        // console.log("insdide catch");
        await fs.writeFile(fullPath, initialValueString, "utf-8");
        return res.send(initialValue);
      } else {
        // console.log("throwing an error");
        throw error;
      }
    }
  });

  router.post("/cells", async (req, res) => {
    const { cells }: { cells: Cell[] } = req.body;
    await fs.writeFile(fullPath, JSON.stringify(cells), "utf-8");
    return res.send({ status: "ok" });
  });

  return router;
};
