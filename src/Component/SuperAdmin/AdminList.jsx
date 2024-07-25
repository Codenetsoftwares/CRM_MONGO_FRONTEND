import React, { useCallback, useEffect, useState } from "react";
import AccountService from "../../Services/AccountService";
import { Link } from "react-router-dom";
import { useAuth } from "../../Utils/Auth";
import Pagination from "../Pagination";
import { debounce } from "lodash";
import InfiniteScroll from "react-infinite-scroll-component";


const AdminList = () => {
  const [adminList, setAdminList] = useState([]);
  const [Erorr, setErorr] = useState(false);
  const [erorrData, setErorrData] = useState("");
  const auth = useAuth();

  const [pageNumber, setPageNumber] = useState("");
  const [totalData, setTotalData] = useState(0);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);


const handleSearch = (event) => {
  setSearch(event.target.value);
  if (!event.target.value) {
    setAdminList([]);
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
       setAdminList((prevUsers) =>
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
  }, [page]);

  // useEffect(() => {
  //   if (auth.user) {
  //     AccountService.getAdminList(page, q, auth.user)
  //       .then((res) => {
  //         setAdminList(res.data.SecondArray);
  //         setPageNumber(res.data.pageNumber);
  //         setTotalData(res.data.allIntroDataLength);
  //       })
  //       .catch((err) => setAdminList([]));
  //   }
  // }, [auth, q, page]);
  // console.log("=>>>>>>>>>", adminList);

  // Data for Filter
  // for (let i = 0; i < adminList.length; i++) {
  //   RawFilterData.push({
  //     userName: adminList[i].userName,
  //     _id: adminList[i]._id,
  //   });
  // }

  // const filteredUsers = RawFilterData.filter((user) => {
  //   const lowerCaseUserName = user.userName.toLowerCase();
  //   const lowerCaseQuery = q.toLowerCase();
  //   return lowerCaseUserName.includes(lowerCaseQuery);
  // });
  // console.log(auth.user);

  return (
    <div className="card container">
      <div className="card-header border-transparent">
        <h3 className=" d-flex justify-content-center fs-3 text-bold">
          LIST OF SUB-ADMIN
        </h3>
      </div>
      <div className="input-group input-group-sm mb-3 p-3">
        <input
          type="search"
          name="search-form"
          id="search-form"
          className="search-input"
          placeholder="Search User by Name"
          value={search}
          onChange={handleSearch}
          class="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-sm"
        />
      </div>
      <InfiniteScroll
        dataLength={adminList.length}
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
        {adminList.map((data, i) => {
          return (
            <div className="card container" key={data?._id}>
              <div className="card-body ">
                <div className="d-flex justify-content-between">
                  <div className=" text-left ">
                    <h5 className="fs-6 ">{i + 1}.</h5>
                  </div>
                  <div className="">
                    <h5 className="fs-5 text-nowrap">{data?.userName} </h5>
                  </div>
                  <div className="">
                    <button
                      className=""
                      style={{
                        height: "30px",
                        backgroundColor: "#0275d8",
                        border: "none",
                        borderRadius: "5px",
                      }}
                    >
                      <p>
                        <Link to={`/subadminedit/${data?._id}`}>
                          <button type="button" class="btn btn-info">
                            Details
                          </button>
                        </Link>
                      </p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </InfiniteScroll>
    </div>
  );
};
export default AdminList;
