import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../Utils/Auth";
import AccountService from "../../Services/AccountService";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { debounce } from "lodash";

const UserProfile = () => {
  const auth = useAuth();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const fetchData = async (searchTerm = search, newPage = page) => {
    try {
      setIsLoading(true);
      const res = await AccountService.userprofile(newPage, searchTerm, auth.user);
      const filteredData = res.data.SecondArray.filter((item) => item !== null);
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

  const handleInnerProfile = (id) => {
    navigate(`/innerprofile`, { state: { page: page, id: id, q: search } });
  };

  return (
    <div className="m-3">
      <h1 className="d-flex justify-content-center fs-3 text-bold">
        USER PROFILE
      </h1>
      <div className="input-group input-group-sm ">
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
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-sm"
        />
      </div>

      <InfiniteScroll
        dataLength={users.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        height={750}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>No more data to load</b>
          </p>
        }
      >
        {users.map((user, index) => (
          <div
            className="card container-fluid w-75 mt-2 border-dark"
            key={index}
          >
            <div className="card-body">
              <p
                onClick={() => {
                  handleInnerProfile(user._id);
                }}
                style={{ color: "blue", cursor: "pointer" }}
              >
                <span
                  className="d-flex justify-content-center"
                  title="Click here to know User details "
                >
                  <b>{user.userName}</b>
                </span>
                <span
                  className="d-flex justify-content-center text-warning "
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
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default UserProfile;
