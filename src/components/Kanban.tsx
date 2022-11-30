import { DndContext, DragOverlay } from "@dnd-kit/core";
import { useState, useEffect } from "react";
import { useAllSensors } from "../hooks/useAllSensors";
import { useSetSortedTasks } from "../hooks/useSetSortedTasks";
import { TaskType } from "../services/columnsData";
import {
  handleDragStart,
  handleDragCancel,
  handleDragOver,
  handleDragEnd,
} from "../utils/dragHandlers";
import Column from "./Column";
import Item from "./Item";
import { TaskProps } from "./Task";

interface KanbanProps {
  columns: string[];
  itemField: string;
  itemComponent: React.FC<TaskProps>;
  items: TaskType[];
  onChange: (item: any) => void;
}

const Kanban: React.FC<KanbanProps> = ({
  itemComponent,
  columns: columnNames,
  itemField,
  items: data,
  onChange,
}) => {
  const [tasks, setTasks] = useState<Record<string, TaskType[]>>({});
  const [activeTask, setActiveTask] = useState<TaskType | null>(null);

  useSetSortedTasks(columnNames, data, itemField, setTasks);

  useEffect(() => {
    onChange(tasks);
  }, [tasks]);

  const sensors = useAllSensors();

  return (
    <DndContext
      sensors={sensors}
      onDragStart={(e) => handleDragStart(e, tasks, setActiveTask)}
      onDragCancel={() => handleDragCancel(setActiveTask)}
      onDragOver={(e) => handleDragOver(e, setTasks)}
      onDragEnd={(e) => handleDragEnd(e, setActiveTask, tasks, setTasks)}
    >
      <div className="my-16 justify-center items-start flex">
        {Object.entries(tasks).map(([key, value]) => (
          <Column
            id={key}
            tasks={value}
            key={key}
            ItemComponent={itemComponent}
          />
        ))}
      </div>

      <DragOverlay>
        {activeTask ? <Item item={activeTask} dragOverlay /> : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Kanban;
