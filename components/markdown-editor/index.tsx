"use client";

import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

interface MarkdownEditorProps {
  value: string;
  name: string;
  onChange: (e: { target: { name: string; value: string } }) => void;
}

const MarkdownEditor = ({ value, name, onChange }: MarkdownEditorProps) => {
  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={(input) => {
        onChange({
          target: {
            name,
            value: input,
          },
        });
      }}
      className="rounded-xl ring-offset-2 ring-2 ring-transparent focus-visible:ring-ring focus-within:ring-ring focus:ring-ring focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed"
    />
  );
};

export default MarkdownEditor;

