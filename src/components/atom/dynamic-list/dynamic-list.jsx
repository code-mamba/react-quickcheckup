
import "./dynamic-list.css";

const DynamicList = ({label, values, setValues }) => {
  const handleAddInput = (e) => {
    e.preventDefault();
    setValues([...values, ""]);
  };

  const handleDeleteInput = (index) => {
    const newInputs = values.filter((_, i) => i !== index);
    setValues(newInputs);
  };

  const handleInputChange = (index, event) => {
    const newInputs = [...values];
    newInputs[index] = event.target.value;
    setValues(newInputs);
  };

  return (
    <div >
      <label>{label}</label>
      <div className="dynamic-list">
      {values.map((value, index) => (
        <div key={index} className="input-container">
          <input
            type="text"
            placeholder={`Medicine ${index + 1}`}
            value={value}
            onChange={(event) => handleInputChange(index, event)}
          />
          <button
            type="button"
            className="delete-btn"
            onClick={() => handleDeleteInput(index)}
          >
             <i class="fa fa-trash-o"></i>
          </button>
        </div>
      ))}
      </div>
      <div>
      <button className="add-btn" onClick={handleAddInput}>Add Prescription</button>
      </div>
    </div>
  );
};


export default DynamicList;
