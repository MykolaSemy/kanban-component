import { useDroppable } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { Task, TaskProps } from "./Task";
import { TaskType } from "../services/columnsData";
interface ColumnProps {
  id: string;
  tasks: TaskType[];
  ItemComponent: any;
}
const Column: React.FC<ColumnProps> = ({ id, tasks, ItemComponent }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <SortableContext id={id} items={tasks} strategy={rectSortingStrategy}>
      <div className="column" ref={setNodeRef}>
        <h1 className="column-title">{id}</h1>
        <div className="py-5">
          {!tasks.length && (
            <h1 className="opacity-40 text-center">No tasks here :(</h1>
          )}
          {tasks.map((item) => (
            <ItemComponent item={item} key={item.id} />
          ))}
        </div>
      </div>
    </SortableContext>
  );
};

export default Column;
