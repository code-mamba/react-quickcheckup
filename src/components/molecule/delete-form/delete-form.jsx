import { Button } from "src/components/atom/index";
import './delete-form.css'
export const Delete = ({ handleDelete, onClose, extra }) => {
  return (
    <>
      <div className="delete-container">
        <h2>Are you sure you want to delete ?</h2>
        <div style={{ display: "flex", flexDirection: "row", gap: "12rem" }}>
          <div>
            <Button
              onClick={() => handleDelete()}
              variant="success"
              label="Delete"
            />
          </div>
          <div>
            <Button onClick={() => onClose()} variant="danger" label="Cancel" />
          </div>
        </div>
      </div>
    </>
  );
};
