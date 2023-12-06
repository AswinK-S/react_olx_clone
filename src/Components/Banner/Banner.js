import React from 'react';
import './Banner.css';
import Arrow from '../../assets/Arrow'
function Banner(props) {
  return (
    <div className="bannerParentDiv ms-0">
      {props.menubar && <div className="bannerChildDiv">
        <div className="menuBar">
          <div className="categoryMenu mt-2 my-auto">
            <span>ALL CATEGORIES</span>
            <Arrow></Arrow>
          </div>
          <div className="otherQuickOptions mt-2 my-auto">
            <span>Cars</span>
            <span>Motorcy...</span>
            <span>Mobile Ph...</span>
            <span>For Sale:Houses & Apart...</span>
            <span>Scoot...</span>
            <span>Commercial & Other Ve...</span>
            <span>For Rent: House & Apart...</span>
          </div>
        </div>
      </div>}
      {props.location === "header" &&
        <><div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="d-block w-100"  src="../../../Images/banner1.png" alt="Banner" />
            </div>
            <div className="carousel-item">
            <img className="d-block w-100"  src="../../../Images/banner2.png" alt="Banner" />
            </div>
            <div className="carousel-item">
            <img className="d-block w-100"  src="../../../Images/banner3.png" alt="Banner" />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
          </>}
      {props.location === "footer" && <img className='w-100'
        src="../../../Images/footer-banner.png" alt="Banner"
      />}
    </div>
  );
}

export default Banner;
