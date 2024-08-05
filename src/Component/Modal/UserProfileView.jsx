import React from "react";
import SingleCard from "../../common/singleCard";
import "./UserProfileView.css";

const UserProfileView = ({ user }) => {
  console.log("data for profile view", user);
  return (
    <div>
      <div
        className="modal fade"
        id="exampleModalp"
        tabIndex="-1"
        role="dialog"
        aria-pledby="#modalprfview"
        aria-hidden="true"
      >
        <div className="modal-dialog " role="document">
          <div className="modal-content" style={{ backgroundColor: "#4682b4" }}>
            <div className="modal-header">
              <h5 className="modal-title text-white" id="exampleModalp">
                User Profile
              </h5>
              <button
                type="button"
                className="btn-close"
                data-dismiss="modal"
                aria-p="Close"
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
                  <SingleCard >
                    <h5 className="text-dark">{user.userName} Details</h5>
                    <div className="row">
                      <div class="col-sm-3 text-truncate">
                        <p class="mb-0">First Name :</p>
                      </div>
                      <div class="col-sm-9">
                        <p class="text-muted mb-0">{user.firstname}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      {" "}
                      <div class="col-sm-3 text-truncate">
                        <p class="mb-0">Last Name:</p>
                      </div>
                      <div class="col-sm-9">
                        <p class="text-muted mb-0">{user.lastname}</p>
                      </div>
                    </div>

                    <hr />
                    <div className="row">
                      {" "}
                      <div class="col-sm-3 text-nowrap">
                        <p class="mb-0">Contact Number:</p>
                      </div>
                      <div class="col-sm-9">
                        <p class="text-muted mb-0">{user.contactNumber}</p>
                      </div>
                    </div>

                    <hr />
                    <div className="row">
                      {" "}
                      <div class="col-sm-3 text-truncate">
                        <p class="mb-0">Website:</p>
                      </div>
                      <div class="col-sm-9">
                        <p class="text-muted mb-0">{user.websiteDetails}</p>
                      </div>
                    </div>

                    <hr />
                    <div className="row">
                      {" "}
                      <div class="col-sm-3 text-nowrap">
                        <p class="mb-0">Level 1 Introducer:</p>
                      </div>
                      <div class="col-sm-9">
                        <p class="text-muted mb-0">
                          {user.introducersUserName1}
                        </p>
                      </div>
                    </div>

                    <hr />
                    <div className="row">
                      {" "}
                      <div class="col-sm-3 text-nowrap">
                        <p class="mb-0">Level 1 Percentage:</p>
                      </div>
                      <div class="col-sm-9">
                        <p class="text-muted mb-0">{user.level1Percentage}%</p>
                      </div>
                    </div>

                    <hr />
                    <div className="row">
                      {" "}
                      <div class="col-sm-3 text-nowrap">
                        <p class="mb-0">Level 2 Introducer:</p>
                      </div>
                      <div class="col-sm-9 text-truncate">
                        <p class="text-muted  mb-0">
                          {user.introducersUserName2}
                        </p>
                      </div>
                    </div>

                    <hr />
                    <div className="row">
                      {" "}
                      <div class="col-sm-3 text-nowrap">
                        <p class="mb-0">Level 2 Percentage:</p>
                      </div>
                      <div class="col-sm-9">
                        <p class="text-muted mb-0">{user.level2Percentage}%</p>
                      </div>
                    </div>

                    <hr />
                    <div className="row">
                      {" "}
                      <div class="col-sm-3 text-nowrap">
                        <p class="mb-0">Level 3 Introducer:</p>
                      </div>
                      <div class="col-sm-9">
                        <p class="text-muted mb-0">
                          {user.introducersUserName}
                        </p>
                      </div>
                    </div>

                    <hr />
                    <div className="row">
                      {" "}
                      <div class="col-sm-3 text-nowrap">
                        <p class="mb-0">Level 3 Percentage:</p>
                      </div>
                      <div class="col-sm-9">
                        <p class="text-muted mb-0">{user.level3Percentage}%</p>
                      </div>{" "}
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

export default UserProfileView;
