import React, { useContext, useEffect, useState } from 'react';
import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../store/Context';
import { collection, getDocs } from "firebase/firestore";
import { PostContext } from '../../store/PostContext';
import { useNavigate } from 'react-router-dom';


function Posts() {
  const { firebase } = useContext(FirebaseContext);
  const [products, setProducts] = useState([]);
  const { setPostDetails } = useContext(PostContext)
  const Navigate = useNavigate()

  useEffect(() => {
    getPosts()
    async function getPosts() {
      //get posts data from firebase on page load
      const querySnapshot = await getDocs(collection(firebase.db, "products"));
      const allPosts = querySnapshot.docs.map((doc) => {
        return { //returning array of products
          id: doc.id, // id of product document
          ...doc.data(),  // all the fields inside product document
        }
      })
      setProducts(allPosts)
      // console.log(allPosts) //test

    }
  }, [firebase.db])
  // console.log(products)   //test

  const limitedArray = products.slice(0, 5)
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading mb-3">
          <span>Quick Menu</span>
          <span className='me-3'>View more</span>
        </div>
        <div className="cards image">


          {limitedArray.map((product) => {
            return (
              <div className="card" onClick={() => { setPostDetails(product); Navigate('/view') }}>
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image mb-3">
                  <img src={product.imageURL} alt="product" />
                </div>

                <div className="content">
                  <h4 >&#x20B9; {product.price}</h4>
                  <span className="kilometer">{product.productName}</span>
                  <p className="name">{product.category}</p>
                </div>
                <div className="date">
                  <span>{product.createdAt}</span>
                </div>
              </div>)
          })}

        </div>
      </div>


      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="container-fluid mt-4">

          <div className="card mb-4">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>Tue Oct 11 2023</span>
            </div>
          </div>

          {products.map((product) => {
            return (
              <div className="card mb-4" onClick={() => { setPostDetails(product); Navigate('/view') }}>
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image mb-3">
                  <img src={product.imageURL} alt="product" />
                </div>

                <div className="content">
                  <h4 >&#x20B9; {product.price}</h4>
                  <span className="kilometer">{product.productName}</span>
                  <p className="name">{product.category}</p>
                </div>
                <div className="date">
                  <span>{product.createdAt}</span>
                </div>
              </div>)
          })}

        </div>
      </div>
    </div>
  );
}

export default Posts;
