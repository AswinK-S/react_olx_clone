import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext, FirebaseContext } from '../../store/Context';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import Swal from 'sweetalert2';

const Create = () => {
  const [productName, setProductName] = useState('')
  const [category, setCategory] = useState('')
  const [productDetails, setProductDetails] = useState('')
  const [image, setImage] = useState(null)
  const [price, setPrice] = useState('')

  const { user } = useContext(AuthContext)
  const { firebase } = useContext(FirebaseContext)
  const navigate = useNavigate();

  async function handleCreateAd(e) {   //On click of upload and submit
    e.preventDefault()
    console.log('create ad', productName, category, productDetails, price, image.name)  //test mode
    if (!user) return alert('Please login to continue');   // ensure user is logged in
    const date = new Date()
    try {

      // Upload an image to Firebase Storage
      const storage = getStorage();
      const storageRef = ref(storage, `/image/${image.name}`);

      // 'file' comes from the Blob or File API
      uploadBytes(storageRef, image).then((snapshot) => {
        console.log('Uploaded a blob or file!');  //test

        getDownloadURL(storageRef).then(async (url) => {
          console.log('URL' + url);  //test

          // Add the product data to Firebase Firestore
          const productCollection = collection(firebase.db, "products");
          await addDoc(productCollection, {
            productName,
            category,
            productDetails,
            price,
            imageURL: url,
            userID: user.uid,
            createdAt: date.toDateString()
          })
            .then((docRef) => {
              console.log('Ad created successfully ID =>', docRef.id);   //test
              Swal.fire({ position: 'top-center', icon: 'success', text: 'Ad created successfully', width: 340, showConfirmButton: false, timer: 1500 })

              navigate('/');
            }).catch((err) => { throw Error("Error creating ad") }) //error alert
        });
      });

    } catch (error) {
      console.error('Error creating ad:', error);
      alert('An error occurred while creating the ad.');
    }
  }

  return (
    <Fragment>
      <Header />
      <div className="row mx-5 p-4">
        <div className="col-12 col-md-4"></div>
        <div className="col-12 col-md-4 p-4 box">
          <div className="p-3">
            <form>
              <div className="col-12 mb-3">
                <label htmlFor="product_name" className="form-label">Product Name</label>
                <input type="text" className="form-control" name="product_name" placeholder="Enter the product name"
                  required value={productName} onChange={(e) => setProductName(e.target.value.trimStart())} />
              </div>

              <div className="col-12 mb-3">
                <label htmlFor="Category" className="form-label">Category</label>
                <input type="text" className="form-control" name="Category" placeholder="Enter the category"
                  required value={category} onChange={(e) => setCategory(e.target.value.trimStart())} />
              </div>

              <div className="col-12">
                <label htmlFor="description" className="form-label">Product Description</label>
                <textarea className="form-control" name="description" id="floatingTextarea2" style={{ height: 20 }}
                  required value={productDetails} onChange={(e) => setProductDetails(e.target.value)}></textarea>
                <label htmlFor="floatingTextarea2"></label>
              </div>

              {image && <img src={image ? URL.createObjectURL(image) : ''} alt="post" className='mb-4 w-50' />}

              <div className="col-12 mb-4">
                <label htmlFor="product_image" className="form-label">Product Images</label>
                <input type="file" className="form-control" name="product_image" accept="image/*" multiple id="imageInput"
                  onChange={(e) => setImage(e.target.files[0])} />
              </div>

              <div className="col-md-4 mb-4">
                <label htmlFor="sellingPrice" className="form-label">Selling Price</label>
                <input type="number" step="0.01" className="form-control" id="sellingPrice" name="sellingPrice"
                  value={price} onChange={(e) => setPrice(e.target.value)} />
              </div>
              <br />
              <div className="text-center">
                <button className="btn btn-primary px-4 py-2" onClick={handleCreateAd}>Create AD</button>
              </div>

            </form>

          </div>
        </div>

      </div>

    </Fragment>
  );
};

export default Create;
