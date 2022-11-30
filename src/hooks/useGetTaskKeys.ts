import { TaskType } from "../services/columnsData";

export const useGetTaskKeys = (task:TaskType) => {
    return Object.keys(task)
}