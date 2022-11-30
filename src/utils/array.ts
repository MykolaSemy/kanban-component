import { arrayMove as dndKitArrayMove } from "@dnd-kit/sortable";
import { TaskType } from "../services/columnsData";

export const removeAtIndex = (array: TaskType[], index: number) => {
  return [...array.slice(0, index), ...array.slice(index + 1)];
};

export const insertAtIndex = (array: TaskType[], index: number, item: TaskType) => {
  return [...array.slice(0, index), {...item}, ...array.slice(index)];
};

export const arrayMove = (
  array: TaskType[],
  oldIndex: number,
  newIndex: number
) => {
  return dndKitArrayMove(array, oldIndex, newIndex);
};
