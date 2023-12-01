

function DropdownOption({ value, image, onSelect, label }) {
  return (
    <div
      className="flex justify-start p-1 hover:bg-gray-200 cursor-pointer bg-slate-400 w-48"
      onClick={() => onSelect(value)}
    >
      <img className="w-8 h-8 mr-2" src={image} alt="" />
      <span>{label}</span>
    </div>
  );
}

export default DropdownOption;
