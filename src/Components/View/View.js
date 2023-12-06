import React, { useContext, useEffect, useState } from 'react';
import './View.css';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/Context';
import { collection, getDocs, query, where } from 'firebase/firestore';

function View() {
  // const [productDetails, setProductDetails] = useState(null)
  const [sellerDetails, setSellerDetails] = useState(null)
  const { postDetails } = useContext(PostContext)
  const { firebase } = useContext(FirebaseContext)

  
  useEffect(() => {
    const { userID } = postDetails
    console.log(userID);
    
    async function getSellerData() {
      //get Seller details from firebase on page load
      const q = query(collection(firebase.db, "users"), where("id", "==", userID));
      const querySnapshot = await getDocs(q);
      const seller = querySnapshot.docs.map((user) => {
        return {
          id: user.id,   //seller ID
          ...user.data()  // selller information
        }
      })
      // console.log(seller[0])     //test
      console.log('posted ad details',postDetails)
      setSellerDetails(seller[0])
    }
    getSellerData()
  }, [firebase.db, postDetails])

 

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-8 p-3 text-center">

            <div className="h-100 ">
              <img className='curv'
                src={postDetails ? postDetails.imageURL : ''}
                alt="product"
              />
            </div>

          </div>
          <div className="col-sm-4 py-5">
            <div className="card bg-light mb-4">
              <h2 className='fw-bold'>&#x20B9;{postDetails ? postDetails.price : ''}/-</h2>
              <h4>{postDetails ? postDetails.productName : ''}</h4>
              <p>{postDetails ? postDetails.category : ''}</p>
              <p>{postDetails ? postDetails.productDetails : ''}</p>
              <hr />
              <span>{postDetails ? postDetails.createdAt : ''}</span>
            </div>
            <div className="card">
              <div className="contactDetails">
                <p>Seller details</p>
                <h5>{sellerDetails ? sellerDetails.name : ""}</h5>
                <p>&#9742; {sellerDetails ? sellerDetails.phone : ''}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
export default View;
