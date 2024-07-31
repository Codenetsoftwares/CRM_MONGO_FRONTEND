import React from "react";
import SingleCard from "../../common/singleCard";

const SubAdminProfileView = ({ data }) => {
  console.log("=====>>> sp", data);
  return (
    <div>
      <div
        className="modal fade"
        id="subadminProfile"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered " role="document">
          <div className="modal-content" style={{ backgroundColor: "#4682b4" }}>
            <div className="modal-header">
              <h5 className="modal-title text-white">INTRODUCER PROFILE</h5>
              <button
                type="button"
                className="btn-close"
                data-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container">
                <div className="row">
                  <div className="col-12 text-center mb-3">
                    <img
                      //   src={user.image}
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                      alt="avatar"
                      className="img-fluid rounded-circle bg -white border-3"
                      style={{
                        width: "150px",
                        borderColor: "black",
                        borderStyle: "solid",
                        marginBottom: "-55px", // Half of image height to overlap
                        filter: "drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.8))",
                        backgroundColor: "white",
                        position: "relative", // Ensure it has the proper z-index
                        zIndex: 1, // Ensure it stacks above other elements
                      }}
                    />
                    {/* <h4 className="text-white mt-5">{user.userName}</h4> */}
                  </div>
                </div>
                <SingleCard
                  className="single-card"
                  style={{
                    borderColor: "black",
                    borderStyle: "solid",
                    borderWidth: "2px",
                    filter: "drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.8))",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.8)",
                    paddingTop: "20px", // Height of the image to push down content
                    position: "relative", // Ensure it has the proper z-index
                    zIndex: 0, // Ensure it stacks below the image if needed
                    boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
                    // height:"25px"
                  }}
                >
                  <SingleCard>
                    <h5 className="text-dark text-center">
                      {data.userName}
                      <br />
                      Details
                    </h5>

                    <div className="row">
                      <div className="col-sm-3 text-truncate">
                        <p className="mb-0">First Name:</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{data.firstname}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      {" "}
                      <div className="col-sm-3 text-truncate">
                        <p className="mb-0">Last Name:</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{data.lastname}</p>
                      </div>
                    </div>
                  </SingleCard>
                </SingleCard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubAdminProfileView;
