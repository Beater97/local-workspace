import * as React from "react";
import Editor from "@monaco-editor/react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@renderer/store";
import { updateNote } from "@renderer/slices/noteSlice";

// TIPI PROPS GIUSTI
interface MonacoEditorComponentProps {
  note: Note;
}

const MonacoEditorComponent: React.FC<MonacoEditorComponentProps> = ({ note }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleEditorChange = React.useCallback(
    (value: string | undefined) => {
      if (value !== undefined && value !== note.content) {
        dispatch(updateNote({ id: note.id, data: { ...note, content: value } }));
      }
    },
    [dispatch, note]
  );

  return (
    <div className="w-full h-full">
      <Editor
        height="90vh"
        defaultLanguage="markdown"
        value={note.content}
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: false },
          fontSize: 16,
          wordWrap: "on",
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  );
};

export default MonacoEditorComponent;
