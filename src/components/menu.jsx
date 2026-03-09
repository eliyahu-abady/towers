function Menu({ setScreen }) {
  return (
    <div className="flex flex-col items-center w-full mt-10 relative">
      <h1 className="text-[3.2em] leading-[1.1] font-bold mb-16 absolute -top-10 md:top-10 text-center w-full">
        towers of hanoi
      </h1>

      {/* הרחקה כדי לפצות על הכותרת */}
      <ul className="flex flex-col items-center w-full max-w-xs mt-32 p-0">
        {["game", "about", "records", "auth"].map((item) => (
          <li key={item} className="w-full list-none">
            <button
              onClick={() => setScreen(item === "auth" ? "auth" : item)}
              className="h-[60px] w-full rounded-[50px] my-4 border border-black bg-transparent hover:bg-black hover:text-white transition-all text-lg font-medium"
            >
              {item === "auth" ? "sign" : item}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Menu;
