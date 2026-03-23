const MenuItem = ({ page, name, setScreen }) => (
  <li className="w-full list-none">
    <button
      onClick={() => setScreen(page)}
      className="h-15 w-full rounded-[50px] my-4 border border-black bg-white hover:bg-black hover:text-white transition-all text-lg font-medium cursor-pointer"
    >
      {name}
    </button>
  </li>
);

export default MenuItem;
