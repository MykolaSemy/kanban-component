import { TaskType } from "../services/columnsData";

interface ItemProps {
  item: TaskType;
  dragOverlay?: boolean;
}
const Item: React.FC<ItemProps> = ({ item, dragOverlay }) => {
  return (
    <div
      className={`${
        dragOverlay ? "cursor-grabbing " : "grab "
      }" bg-white shadow-lg px-5 py-1 my-2 rounded  h-14 w-full "`}
    >
      {item.title}
    </div>
  );
};
export default Item;
