

function DropdownOption({ value, image, onSelect, label }) {
  return (
    <div
      className="flex justify-start items-center border p-2 hover:bg-gray-300 cursor-pointer bg-slate-400 w-28 text-sm"
      onClick={() => onSelect(value)}
    >
      <img className="w-10 h-10 mr-1" src={image} alt="" />
      <span>{label}</span>
    </div>
  );
}

export default DropdownOption;
