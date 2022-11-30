import { useEffect } from "react";
import { TaskType } from "../services/columnsData";

export const useSetSortedTasks = (
  columnNames: string[],
  unsortedTasks: TaskType[],
  sortingKey: string,
  setTasks: React.Dispatch<React.SetStateAction<Record<string, TaskType[]>>>
) => {
  useEffect(() => {
    setTasks((tasks) => {
      let sortedTasks: any = {};
      columnNames.forEach(
        (columnName) =>
          (sortedTasks[columnName] = unsortedTasks.filter(
            (task: any) => task[sortingKey] === columnName
          ))
      );
      return sortedTasks;
    });
  }, [unsortedTasks, columnNames, sortingKey]);
};
