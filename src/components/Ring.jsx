const Ring = ({ level }) => {
  return (
    <div
      className="flex items-center justify-center bg-black/70 text-white rounded-[15px] w-[var(--lv)] md:w-[calc(var(--lv)*2)] z-10 shrink-0 aspect-[5/1]"
      style={{ "--lv": `${40 + level * 8}px` }}
    >
      <p className="m-0">{level}</p>
    </div>
  );
};

export default Ring;
