import { useEffect, useState } from "react";
import KanbanOptions from "./components/KanbanOptions";
import Kanban from "./components/Kanban";
import { Task } from "./components/Task";
import { useGetAllKeyValues } from "./hooks/useGetAllKeyValues";
import { useGetTaskKeys } from "./hooks/useGetTaskKeys";
import { columnsData } from "./services/columnsData";

const App = () => {
  const [itemField, setItemField] = useState("status");
  const [columns, setColumns] = useState<string[]>([
    "open",
    "planned",
    "in-progress",
    "done",
  ]);

  const taskKeys = useGetTaskKeys(columnsData[0]);
  const keyValues: string[] = useGetAllKeyValues(columnsData, itemField);

  useEffect(() => {
    setColumns(keyValues);
  }, [itemField]);

  const handleAddDeleteColumn = (columnName: string) => {
    setColumns((prev) =>
      !prev.includes(columnName)
        ? [...prev, columnName]
        : prev.filter((column) => column !== columnName)
    );
  };

  const handleSetItemField = (itemFieldName: string) => {
    setItemField(itemFieldName);
  };

  return (
    <div className="app">
      <KanbanOptions
        taskKeys={taskKeys}
        keyValues={keyValues}
        AddDeleteColumn={handleAddDeleteColumn}
        onSetItemField={handleSetItemField}
        itemField={itemField}
        columns={columns}
      />
      <Kanban
        columns={columns}
        itemField={itemField}
        itemComponent={Task}
        items={columnsData}
        onChange={(items: any) => console.log("onChange", items)}
      />
    </div>
  );
};

export default App;
