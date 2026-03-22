import Ring from "./Ring";

const Column = ({ arrayData, index: indexColumn, color, onColumnClick }) => {
  return (
    <button
      className="relative flex flex-col justify-end items-center h-[250px] sm:h-[350px] w-full max-w-[200px] mx-1 sm:mx-4 border border-transparent hover:border-black bg-[#faebd7] p-0 transition-colors focus:outline-none"
      onClick={() => onColumnClick(indexColumn)}
    >
      <div
        className="absolute bottom-0 h-[220px] sm:h-[300px] w-[20px] sm:w-[30px] z-0"
        style={{ backgroundColor: color }}
      ></div>
      {arrayData.map((ring, indexRing) => (
        <Ring key={indexRing} level={ring} />
      ))}
    </button>
  );
};

export default Column;
