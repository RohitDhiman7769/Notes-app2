import { useEffect, useState } from 'react';
import axios from 'axios'
import './App.css';
import ProductComp from './ProductComp';
import FetchedUserData from './FetchedUserData';

function App() {

  //GET VALUE OF USERPERSONAL DETAILS
  const [userProductInput, setUserProductInput] = useState([])
  const [userPersonalDetails, setUserPersonalDetails] = useState({ username: '', userdiscription: '', usercountry: '', userstate: '', userpincode: '' })
  const [saveProductInput, setSaveProductInput] = useState(false)
  const [userPeroductDataList, setUserProductDataList] = useState([])
  const [isEditing, setIsEditing] = useState(null);
  const [productInputLabels, setProductInputLabels] = useState(false)
  const [isDataModalOpen, setIsModalOpen] = useState(false)
  const [fetchedData, setFetchedData] = useState([])

  const [editMode, setEditMode] = useState(null)

  //PRODUCT MAP STATE
  const [addProductComp, setAddProductComp] = useState([])

  // CALL SUBMIT BUTTON TO SEND ALL DATA INTO BACKEND
  async function submitdata() {
    setProductInputLabels(false)
    setProductInputLabels(false)
    try {

      const dataToSend = {
        userPersonalDetails: userPersonalDetails,
        userProductDataList: userProductInput,
      };

      const response = await axios.post('http://localhost:3001/Data-inserted',
        dataToSend,
        {
          headers: {
            'content-type': 'application/json'
          },
        }
      )
      console.log(response)
    } catch (err) {
      console.log(err)
    }
    setUserProductDataList([])
  }


  //GET VALUE OF USER PERSONAL INPUT
  function handleUserInput(e) {
    const { name, value } = e.target
    setUserPersonalDetails((usersdata) => ({
      ...usersdata,
      [name]: value
    }))
  }

  //ADD PRODUCT FUCNTION
  function addProduct() {
    setProductInputLabels(true);
    const newArray = [...addProductComp];
    newArray.push({ product_name: '' });
    setAddProductComp(newArray);
  }

  // GET VALUE OF USER PRODUCTS
  const handleChange = (e, index) => {
    const { name, value } = e.target
    setUserProductInput((prevData) => ({
      ...prevData,
      [index]: {
        ...prevData[index],
        [name]: value

      }
    }))
  }


  //SAVE AFTER SET THE PRODUCT VALUES
  function saveProduct(e, index) {
    if (isEditing === index) {
      setIsEditing(null)
    }
    e.preventDefault()
    setIsEditing(index);
    setIsEditing(null)
    setSaveProductInput(true)
    // setAfterSaveProduct(true)
    const newData = { ...userProductInput }
    setUserProductDataList((prevList) => [...prevList, newData])
    setUserProductInput({ serialNumber: '', productName: '', Price: '', quantity: '' })
  }


  // TO CLOSE ADD PRODUCT COMPONENT
  function cancelAddProductCompFun(Index) {
    if (addProductComp.length == 1) {
      setProductInputLabels(false);

    }
    setAddProductComp(addProductComp.filter((_, id) => id !== Index));
  }



  //EDIT PRODUCT INPUT AFTER SAVE
  function handleEdit(index) {
    setIsEditing(index);
    console.log('isEditing', isEditing)
    setUserProductInput(userPeroductDataList[index]);
  }

  //DELETE AFTER EDIT
  function handleDelete(index) {
    const updatedUserPeroductDataList = [...userPeroductDataList]
    updatedUserPeroductDataList.splice(index, 1);
    setUserProductDataList(updatedUserPeroductDataList);
  }


  {
    saveProductInput &&
      userProductInput.map((Value, Index) => {
        return (
          isEditing === Index ? (

            <div style={{ display: "flex" }}>
              <div className='addproductInput'>
                <ProductComp key={Index}
                  isEditing={true} />
              </div>
            </div>

          )
            :
            (

              <div style={{ display: 'flex' }}>
                <div key={Index} className='savedProductData'>
                  <p>{Value.serialNumber}</p>
                  <p>{Value.productName}</p>
                  <p>{Value.Price}</p>
                  <p>{Value.quantity}</p>
                </div>
                <div style={{ display: 'flex' }}>
                  <button onClick={() => handleEdit(Index)}>Edit</button>
                  <button onClick={() => handleDelete(Index)}>Delete</button>
                </div>
              </div>
            )
        );
      })
  }
  // </div>



  //USER DATA FETCHED FUNCTION
  async function checkData() {
    setIsModalOpen(true)
    try {
      const response = await axios.get('http://localhost:3001/Fetch-Data',)
      setFetchedData(response.data)
    } catch (err) {
      console.log(err)
    }
  }



  const handleInputChange = (index, fieldName, value) => {
    const updatedData = [...fetchedData];
    updatedData[index][fieldName] = value;
    setFetchedData(updatedData);
  };

  //DELETE  FUNCTION
  // const deleteItem = (index) => {
  //   const updatedData = [...fetchedData];
  //   updatedData.splice(index, 1);
  //   setFetchedData(updatedData);
  // };



  //TO CANCEL FUNCTION
  const cancelEdit = (index) => {
    // toggleEditMode(index);
    // console.log(index)
  }

  //SAVE CHANGES FUNCTION
  // const saveChanges = (index) => {
  //   toggleEditMode(index);
  // }


  //SAVE PRODUCT INFO AFTER EDIT
  function saveChanges(e) {
    e.preventDefault()
    // setIsEditing(null)
    // setIsOpenAddProductMdal(false)
    // setAfterSaveProduct(true)
    // const newData = { ...userProductInput }
    // setUserProductDataList((prevList) => [...prevList, newData])
    // setUserProductInput({ serialNumber: '', productName: '', Price: '', quantity: '' })
  }



  return (
    <div className="container">
      <div className='main' >
        <form>
          <div className='userInputSection'>
            <div className='userinput'>
              <label>Name</label>
              <input name='username' placeholder='Name' onChange={handleUserInput}></input>
            </div>
            <div className='userinput'>
              <label>Discription</label>
              <input name='userdiscription' placeholder='Discription' onChange={handleUserInput}></input>

            </div>
            <div className='userinput'>
              <label>Country</label>
              <input name='usercountry' placeholder='Country' onChange={handleUserInput} ></input>
            </div>
            <div className='userinput'>
              <label>State</label>
              <input name='userstate' placeholder='State' onChange={handleUserInput}></input>
            </div>
            <div className='userinput'>
              <label>Pin Code</label>
              <input name='userpincode' placeholder='Pin Code' onChange={handleUserInput}></input>
            </div>
          </div>
        </form>

        <div >
          <div>

            {/* PRODUCT ADD BUTTON */}
            <button onClick={addProduct} className='productBtn'>Add Product+</button>
          </div>
          {productInputLabels &&
            <div className='productLabel'>
              <p>Serial No.</p>
              <p>Product Name</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Status</p>
            </div>
          }

          <table>
            <tbody>

              {addProductComp.map((item, index) => (
                <tr key={index}>
                  <ProductComp key={item.id} isEditing={setIsEditing === index} cancelProductComp={() => cancelAddProductCompFun(index, item)} saveBtn='Save' cancelBtn='Cancel' inputHandleChange={(e) => { handleChange(e, index) }} saveProductFunction={(e) => saveProduct(e, index)} serialNumberValue={item} />
                </tr>
              ))
              }

            </tbody>
          </table>



        </div>
      </div>


      <div className='submitBtn'>
        {/* FORM SUBMIT BUTTON */}
        <button onClick={submitdata}>Submit</button>
      </div>



      {/* FETCH DATA BUTTON */}
      <button onClick={checkData} className='viewDatabtn'>View Data</button>

      {isDataModalOpen &&
        < FetchedUserData productData={fetchedData} editMode={editMode} dataHandleInputChange={handleInputChange} saveDataChanges={saveChanges} cancelIfDataEdit={cancelEdit}  checkData={checkData} />
      }

    </div>
  );
}

export default App;

// serialNumber} productNameValue={userProductInput.productName} priceValue={userProductInput.Price} quantityValue={userProductInput.quantity}