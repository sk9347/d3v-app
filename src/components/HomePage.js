import "./cssFile/home.css";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./routes/NavStack/NavStack";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 9;
  const [sortBy, setSortBy] = useState("name"); 
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    axios.get("https://dummyjson.com/products").then((res) => {
      setData(res.data.products);
    });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); 
  };

  const handleSort = (event) => {
    setSortBy(event.target.value);
  };

  const handleAddToCart = (product) => {
    setSelectedProduct(product);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const filteredData = data.filter((val) => {
    return val.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortBy === "name") {
      return a.title.localeCompare(b.title);
    } else if (sortBy === "price") {
      return a.price - b.price;
    }
    return 0;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const context = useContext(AuthContext);

  return (
    <>
      <div className="home-container">
        <div className="navabar">
          <div>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <select value={sortBy} onChange={handleSort}>
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
            </select>
          </div>
          <div>
          <h2 style={{color:'whitesmoke',display:'inline-block'}}>D3V</h2>
          </div>
          <div>
            <button
              onClick={() => {
                context.handleLogout();
              }}
            >
              logout
            </button>
          </div>
        </div>

        <h1>All products</h1>

        <div className="product-container">
          {currentItems.map((val, ind) => {
            return (
              <div key={ind}>
                <div className="card">
                  <img
                    src={val.thumbnail}
                    alt="Denim Jeans"
                    style={{ width: "100%" }}
                  />
                  <h1>{val.title}</h1>
                  <p className="price">Price: {val.price}</p>
                  <p className="price">Rating: {val.rating}</p>
                  <p className="price">stock: {val.stock}</p>
                  <p>{val.description}</p>
                  <p>
                    <button onClick={() => handleAddToCart(val)}>
                      See More
                    </button>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        {/* Pagination */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          {Array.from(
            { length: Math.ceil(sortedData.length / itemsPerPage) },
            (_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                style={{
                  backgroundColor: "rgb(8, 14, 85)",
                  color: "white",
                  borderRadius: "50%",
                  margin: "1px",
                  padding: "1em",
                }}
              >
                {i + 1}
              </button>
            )
          )}
        </div>
        <div className="footer">
          <h4>© Copyright:D3V Technology Solutions</h4>
        </div>
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Product Details</h2>
            {selectedProduct && (
              <div>
                <img src={selectedProduct.thumbnail} alt="Product Thumbnail" />
                <p>Title: {selectedProduct.title}</p>
                <p>Price: {selectedProduct.price}</p>
                <p>Rating: {selectedProduct.rating}</p>
                <p>Stock: {selectedProduct.stock}</p>
                <p>Description: {selectedProduct.description}</p>
                <button
                  className="close"
                  onClick={closePopup}
                  style={{
                    backgroundColor: "red",
                    padding: "1em",
                    color: "whitesmoke",
                    borderRadius: "10px",
                  }}
                >
                  &times;close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
