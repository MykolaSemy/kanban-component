import { TaskType } from "../services/columnsData";

export const useGetAllKeyValues = (data: TaskType[], prefferedKey: string) => {
  let uniqueKeyValues: any = [];
  data.forEach((task) => {
    Object.entries(task).forEach(([key, value]) => {
      if (
        key.toLowerCase() === prefferedKey.toLowerCase() &&
        !uniqueKeyValues.includes(value)
      ) {
        uniqueKeyValues.push(value);
      }
    });
  });

  return uniqueKeyValues;
};
