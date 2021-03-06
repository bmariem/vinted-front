// Lib
import React, { useState, useEffect } from "react";
import axios from "../../config/api";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";

// Components
import Spinner from "../../components/Spinner/Spinner";
import Card from "../../components/Card/Card";

import imgEffect from "../../assets/images/tear.svg";

// CSS
import "./Home.css";

const Home = ({ token, setLoginIsOpen, title, sortByPrice }) => {
  // STATES
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  // Maximum number of offers per page
  const limit = 5;

  const handlePageClick = (event) => {
    setPage(event.selected + 1);
  };

  const navigate = useNavigate();

  const handlePublishClick = () => {
    if (token) {
      // user authenticated => navigate to publish page
      navigate("/offer/publish");
    } else {
      // user not authenticated => set loginModal on true & redirect to targetUrl
      setLoginIsOpen(true);
      navigate("/?target_url=/offer/publish");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/offers?page=${page}&limit=${limit}&title=${title}&sort=${sortByPrice}`
        );

        // update data state with all the offers
        setData(response.data);

        // Calculate the maximum number of pages
        setPageCount(Math.ceil(Number(response.data.count) / limit));
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [page, title, sortByPrice]);

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="Home">
      <div className="home-bg-img">
        <img src={imgEffect} alt="shape" className="home-img-shape" />
        <div>
          <div className="home-msg">
            Prêts à faire du tri dans vos placards ?
            <button onClick={handlePublishClick}>Commencer à vendre</button>
          </div>
        </div>
      </div>

      <div className="cards">
        {/* Get all offers */}
        {data.offers.map((offer) => {
          return <Card offer={offer} key={offer._id} />;
        })}
      </div>
      <div className="home-pagination">
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          pageCount={pageCount}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
};

export default Home;
