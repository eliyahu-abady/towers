const MenuItem = ({ page, name, setScreen }) => (
  <li className="w-full list-none">
    <button
      onClick={() => setScreen(page)}
      className="h-[60px] w-full rounded-[50px] my-4 border border-black bg-white hover:bg-black hover:text-white transition-all text-lg font-medium cursor-pointer"
    >
      {name}
    </button>
  </li>
);

function Menu({ setScreen }) {
  return (
    <div className="flex flex-col items-center w-full">
      <header className="mt-10">
        <h1 className="text-3xl font-bold uppercase border-b-4 border-black pb-2">
          מגדלי האינוי
        </h1>
      </header>

      <ul className="flex flex-col items-center w-full max-w-xs mt-32 p-0">
        <MenuItem page="game" name="משחק" setScreen={setScreen} />
        <MenuItem page="Instructions" name="הוראות" setScreen={setScreen} />
        <MenuItem page="records" name="שיאים" setScreen={setScreen} />
        <MenuItem page="auth" name="התחברות" setScreen={setScreen} />
      </ul>
    </div>
  );
}

export default Menu;
