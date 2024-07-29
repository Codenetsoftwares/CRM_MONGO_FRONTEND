import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../Utils/Auth";
import AccountService from "../../Services/AccountService";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { debounce } from "lodash";
import SingleCard from "../../common/singleCard";
import GridCard from "../../common/gridCard";
import { Oval } from 'react-loader-spinner'; // Import the Oval spinner

const UserProfile = () => {
  const auth = useAuth();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSearch = (event) => {
    setSearch(event.target.value);
    if (!event.target.value) {
      setUsers([]);
    }
  };

  const fetchData = async (searchTerm = search, newPage = page) => {
    try {
      setIsLoading(true);
      const res = await AccountService.userprofile(
        newPage,
        searchTerm,
        auth.user
      );
      const filteredData = res.data.SecondArray.filter(
        (item) => item !== null
      );
      setUsers((prevUsers) =>
        searchTerm.length > 0 ? filteredData : [...prevUsers, ...filteredData]
      );
      setHasMore(newPage < res.data.pageNumber);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search handler using lodash
  const debouncedSearchHandler = useCallback(
    debounce((searchTerm) => {
      setPage(1); // Reset page to 1 on new search
      fetchData(searchTerm, 1);
    }, 1300),
    [] // Empty dependency array ensures stable function
  );

  useEffect(() => {
    debouncedSearchHandler(search);

    // Cleanup function to cancel debounce on unmount or change
    return () => {
      debouncedSearchHandler.cancel();
    };
  }, [search, debouncedSearchHandler]);

  const fetchMoreData = () => {
    if (hasMore) {
      const nextPage = page + 1;
      setPage(nextPage); // Increment page number
      fetchData(search, nextPage);
    }
  };

  useEffect(() => {
    if (page > 1) {
      fetchData(); // Fetch more data when page changes
    }
  }, [page, search]);

  const handleInnerProfile = (id) => {
    navigate(`/innerprofile`, { state: { page: page, id: id, q: search } });
  };

  return (
    <SingleCard>
      <div className="m-3">
        <SingleCard>
          <div className="input-group input-group-sm">
            <button type="button" className="btn btn-primary">
              <i className="fas fa-search"></i>
            </button>
            <input
              type="search"
              name="search-form"
              id="search-form"
              className="form-control search-input"
              placeholder="Search User by Name"
              value={search}
              onChange={handleSearch}
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
            />
          </div>
        </SingleCard>

        <InfiniteScroll
          dataLength={users.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={ // Use the spinner here
            <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
              <Oval
                height={40}
                width={40}
                color="#4fa94d"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#4fa94d"
                strokeWidth={2}
                strokeWidthSecondary={2}
              />
            </div>
          }
          height={800}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>No more data to load</b>
            </p>
          }
        >
          <SingleCard className="mt-3">
            <GridCard columns={3}>
              {users.map((user, index) => (
                <div className="col" key={index}>
                  <div className="card container-fluid w-75 mt-2 border-dark">
                    <div className="card-body">
                      <p
                        onClick={() => {
                          handleInnerProfile(user._id);
                        }}
                        style={{ color: "blue", cursor: "pointer" }}
                      >
                        <span
                          className="d-flex justify-content-center"
                          title="Click here to know User details"
                        >
                          <b>{user.userName}</b>
                        </span>
                        <span
                          className="d-flex justify-content-center text-warning"
                          style={{ fontSize: "25px" }}
                        >
                          &#8679;
                        </span>
                        <span className="d-flex justify-content-center text-success blinking-text">
                          Click UserName to know User details
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </GridCard>
          </SingleCard>
        </InfiniteScroll>
      </div>
    </SingleCard>
  );
};

export default UserProfile;
