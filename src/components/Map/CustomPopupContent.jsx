const CustomPopupContent = ({ title, description, location }) => (
    <div className="flex justify-center items-center bg-slate-400">
      <table className="w-full">
        <tbody>
          <tr>
            <td className="font-semibold">Title:</td>
            <td>{title}</td>
          </tr>
          <tr>
            <td className="font-semibold">Description:</td>
            <td>{description}</td>
          </tr>
          <tr>
          <td className="font-semibold">Coordinate:</td>
          <td>{location.lat.toFixed(2)}, {location.lng.toFixed(2)}</td>
        </tr>
        </tbody>
      </table>
    </div>
  );
  
  export default CustomPopupContent;
  