import React, { useState } from 'react';
import './crudStyle.css';

const Crud = () => {
  
  const [tableItems, setTableItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [editItem, setEditItem] = useState(null);

  // add item
  const addItem = () => {
    // no null value 
    if (!itemName) return;
    
    if (editItem) {
      const updatedItems = tableItems.map((item) =>
        item.id === editItem.id ? { ...item, name: itemName } : item
      );
      setTableItems(updatedItems);
      setEditItem(null);
    } else {
      const newItem = {
        id: Math.random(),
        name: itemName,
      };
      setTableItems([...tableItems, newItem]);
    }
    setItemName('');
  };

  // edit item
  const editItemHandler = (id) => {
    const itemToEdit = tableItems.find((item) => item.id === id);
    setEditItem(itemToEdit);
    setItemName(itemToEdit.name);
  };


  // clear all table item 
  const clearList = () => {
    setTableItems([]);
  };

  //  delete item
  const removeItem = (id) => {
    const updatedItems = tableItems.filter((item) => item.id !== id);
    setTableItems(updatedItems);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 ">
          <h1 className="text-center col-4">Todo List</h1>
          <div className="card">
            <div className="card-body">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Todo Item"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className={
                    editItem
                      ? 'btn btn-success btn-block'
                      : 'btn btn-primary btn-block'
                  }
                  onClick={addItem}
                >
                  {editItem ? 'Edit Item' : 'Add Item'}
                </button>
              </form>
            </div>
          </div>
          {/* if table item is more than 0 it will work */}
          {tableItems.length > 0 && (
            <div className="card mt-4">
              <div className="card-body">
                <ul className="list-group">
                  {tableItems.map((item) => (
                    <li key={item.id} className="list-group-item">
                      <div className="row">
                        <div className="col-md-8">{item.name}</div>
                        <div className="col-md-4 text-right">
                          <button
                            className="btn btn-warning col-md-2"
                            onClick={() => editItemHandler(item.id)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => removeItem(item.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card-footer">
                <button className="btn btn-danger" onClick={clearList}>
                  Clear List
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
     
    </div>
  );
};

export default Crud;

