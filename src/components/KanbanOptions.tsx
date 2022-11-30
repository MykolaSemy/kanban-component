interface KanbanOptinosProps {
  itemField: string;
  AddDeleteColumn: (columnName: string) => void;
  onSetItemField: (itemFieldName: string) => void;
  taskKeys: string[];
  keyValues: string[];
  columns: string[];
}

const KanbanOptinos: React.FC<KanbanOptinosProps> = ({
  columns,
  keyValues,
  taskKeys,
  AddDeleteColumn,
  onSetItemField,
  itemField,
}) => {
  return (
    <div className="mt-48">
      <div className="flex  justify-center items-center">
        <p className="mx-2 text-white">Choose the prefed key to sort:</p>
        <select
          name=""
          onChange={(e) => onSetItemField(e.target.value)}
          value={itemField}
          id=""
        >
          {taskKeys.map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>
      <div>
        <p className="mx-2 text-white text-center">
          choose the preffered columns
        </p>
        {keyValues.map((key: string) => (
          <button
            className={`${
              columns.includes(key)
                ? " bg-green-700 text-white "
                : " bg-white text-black "
            }" rounded m-1 px-2 "`}
            onClick={() => AddDeleteColumn(key)}
          >
            {key}
          </button>
        ))}
      </div>
    </div>
  );
};

export default KanbanOptinos;
