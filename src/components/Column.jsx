import Ring from "./Ring";

const Column = ({ arrayData, index: indexColumn, color, onColumnClick }) => {
  return (
    <button
      className="relative flex flex-col justify-end items-center h-62.5 sm:h-87.5 w-full max-w-50 mx-1 sm:mx-4 border border-transparent hover:border-black bg-[#faebd7] p-0 transition-colors focus:outline-none"
      onClick={() => onColumnClick(indexColumn)}
    >
      <div
        className="absolute bottom-0 h-55 sm:h-75 w-5 sm:w-7.5 z-0"
        style={{ backgroundColor: color }}
      ></div>
      {arrayData.map((ring, indexRing) => (
        <Ring key={indexRing} level={ring} />
      ))}
    </button>
  );
};

export default Column;
