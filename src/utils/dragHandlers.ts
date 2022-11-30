import { DragOverEvent, DragStartEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { TaskType } from "../services/columnsData";
import { removeAtIndex, insertAtIndex } from "./array";

export const handleDragStart = (
  { active }: DragStartEvent,
  columns: Record<string, TaskType[]>,
  setActiveId: React.Dispatch<React.SetStateAction<TaskType | null>>
) => {
  //getting drag element
  let columnKey = active.data.current?.sortable.containerId;
  let index = active.data.current?.sortable.index;
  setActiveId(columns[columnKey][index]);
};

export const handleDragCancel = (
  setActiveId: React.Dispatch<React.SetStateAction<TaskType | null>>
) => setActiveId(null);

export const handleDragOver = (
  { active, over }: DragOverEvent,
  setColumns: React.Dispatch<React.SetStateAction<Record<string, TaskType[]>>>
) => {
  const overId = over?.id;

  if (!overId) {
    return;
  }
  const activeContainer = active.data.current?.sortable.containerId;
  const overContainer = over.data.current?.sortable.containerId || over.id;

  if (activeContainer !== overContainer) {
    setColumns((columns) => {
      const activeIndex = active.data.current?.sortable.index;
      const overIndex =
        over.id in columns
          ? columns[overContainer].length + 1
          : over.data.current?.sortable.index;

      return moveBetweenContainers(
        columns,
        activeContainer,
        activeIndex,
        overContainer,
        overIndex,
        columns[activeContainer][activeIndex]
      );
    });
  }
};

export const handleDragEnd = (
  { active, over }: any,
  setActiveId: React.Dispatch<React.SetStateAction<TaskType | null>>,
  columns: Record<string, TaskType[]>,
  setColumns: React.Dispatch<React.SetStateAction<Record<string, TaskType[]>>>
) => {
  if (!over) {
    setActiveId(null);
    return;
  }

  if (active.id !== over.id) {
    const activeContainer = active.data.current.sortable.containerId;
    const overContainer = over.data.current?.sortable.containerId || over.id;
    const activeIndex = active.data.current.sortable.index;
    const overIndex =
      over.id in columns
        ? columns[overContainer].length + 1
        : over.data.current.sortable.index;

    setColumns((columns) => {
      let newColumns;
      if (activeContainer === overContainer) {
        newColumns = {
          ...columns,
          [overContainer]: arrayMove(
            columns[overContainer],
            activeIndex,
            overIndex
          ),
        };
      } else {
        newColumns = moveBetweenContainers(
          columns,
          activeContainer,
          activeIndex,
          overContainer,
          overIndex,
          columns[activeContainer][activeIndex]
        );
      }

      return newColumns;
    });
  }

  setActiveId(null);
};
export const moveBetweenContainers = (
  items: Record<string, TaskType[]>,
  activeContainer: string,
  activeIndex: number,
  overContainer: string,
  overIndex: number,
  item: TaskType
) => {
  return {
    ...items,
    [activeContainer]: removeAtIndex(items[activeContainer], activeIndex),
    [overContainer]: insertAtIndex(items[overContainer], overIndex, item),
  };
};
