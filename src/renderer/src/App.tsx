
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store";
import { useEffect } from "react";
import { fetchNotes } from "./slices/noteSlice";
import { fetchPasswords } from "./slices/passwordSlice";
import { fetchTasks } from "./slices/taskSlice";
import { fetchKanbanColumns } from "./slices/kanbanColumnSlice";
import { fetchFolders } from "./slices/folderSlice";
import { fetchAttachments } from "./slices/attachmentSlice";

function Note() {
  return <h1 className="text-2xl font-bold">Note</h1>;
}
function Password() {
  return <h1 className="text-2xl font-bold">Password</h1>;
}
function Kanban() {
  return <h1 className="text-2xl font-bold">Kanban</h1>;
}

export default function App() {
    const dispatch = useDispatch<AppDispatch>();
 useEffect(() => {
    dispatch(fetchNotes());
    dispatch(fetchPasswords());
    dispatch(fetchTasks());
    dispatch(fetchKanbanColumns());
    dispatch(fetchFolders());
    dispatch(fetchAttachments());
  }, [dispatch]);

  return (
    <div className="h-[100vh]">
    <BrowserRouter>
      <div className="flex w-screen h-full">
        <Sidebar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/note" element={<Note />} />
            <Route path="/password" element={<Password />} />
            <Route path="/kanban" element={<Kanban />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
    </div>
  );
}
