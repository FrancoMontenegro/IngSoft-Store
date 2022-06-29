import { useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import "./newProduct.css";
import app from "../../firebase";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (e)=>{
    setInputs(prev=>{
      return {...prev, [e.target.name]:e.target.value};
    });
  };
  //const handleCategories = (e)=>{}
  const handleClick = (e)=> {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on('state_changed',
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  },
  (error) => {
    // Handle unsuccessful uploads
  },
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      const product = {...inputs, img:downloadURL};
      addProduct(product, dispatch);
    });
  }
);
  };

  console.log(file);


  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Nuevo Producto</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Imagen</label>
          <input type="file" id="file" onChange={e=>setFile(e.target.files[0])}/>
        </div>
        <div className="addProductItem">
          <label>Nombre</label>
          <input name="nombre" type="text" placeholder="Apple Airpods" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Descripción</label>
          <input name="desc" type="text" placeholder="Lorem Ipsum..." onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Categoria</label>
          <input name="categoria" type="text" placeholder="Categoría" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Precio</label>
          <input name="precio" type="number" placeholder="Precio" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select name="stock" id="active" onChange={handleChange}>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </div>
        <button onClick={handleClick} className="addProductButton">Crear</button>
      </form>
    </div>
  );
}
