import { Button } from "src/components/atoms";

 

export const USERS_COLUMNS = (handleEdit, handleDelete) => {
    
    
   return [
    {
        Header: 'Id',
        accessor: 'id'
    },
    {
        Header: 'Name',
        accessor: 'username',
    },
    {
        Header: 'Email',
        accessor: 'email',
    },
    {
        Header: 'Date of Birth',
        accessor: 'dob',
    },
    {
        Header: 'Contact',
        accessor: 'contact'
    },
    {
        Header: 'User Type',
        accessor: 'userrole'
    },
    {
        Header: 'Actions',
        Cell: ({row}) =>(
            <>
            <div style={{display: "flex", flexDirection:"row", gap: "1rem"}}>
            <div>
                <Button onClick={()=>handleEdit(row.original)} variant="success" label="Edit"/>
            </div>
              <div>
              <Button onClick={()=>handleDelete(row.original)} variant="danger" label="Delete"/>
          </div>
          </div>
          </>
        )
        
    }
]}