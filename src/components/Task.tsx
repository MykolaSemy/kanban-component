import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TaskType } from "../services/columnsData";
import Item from "./Item";
export interface TaskProps {
  item: TaskType;
}
export const Task: React.FC<TaskProps> = ({ item }) => {
  const { id } = item;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.1 : 1,
  };

  return (
    <div className="w-full flex items-center justify-between ">
      <div
        style={style}
        className="w-full"
        ref={setNodeRef}
        {...attributes}
        {...listeners}
      >
        <Item item={item} />
      </div>
    </div>
  );
};
