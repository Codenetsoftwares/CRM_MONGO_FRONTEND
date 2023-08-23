import React, { useState, useEffect } from "react";
import { useAuth } from "../../Utils/Auth";
import AccountService from "../../Services/AccountService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import {
  faEdit,
  faTrashAlt,
  faPlus,
  faFileAlt,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import ModalAdWbl from "../Modal/ModalAdWbl";
import ModalWbdl from "../Modal/ModalWbdl";
import ModalWthWbl from "../Modal/ModalWthWbl";

const WebsiteDetails = () => {
  // const { id } = useParams();
  const auth = useAuth();
  const navigate = useNavigate();
  const [website, setWebsite] = useState("");
  const [getWebsite, setGetWebsite] = useState([]);
  const [name, setName] = useState([]);
  const [Id, setId] = useState("");

  console.log("Auth", auth);
  const handlewebsite = (event) => {
    setWebsite(event.target.value);
  };
  console.log(website);

  const handleSubmit = (e) => {
    e.preventDefault();

    // post api fetch

    AccountService.websitedetails(
      {
        websiteName: website,
      },
      auth.user
    )
      .then((res) => {
        console.log("res", res);
        if (res.status === 200) {
          alert("Website registered successfully!");
        } else {
          alert("Please give a website name to add");
        }
      })

      .catch((err) => {
        if (!err.response) {
          alert(err.message);
          return;
        }
      });
    // window.location.reload();
  };

  const handelName = (id) => {
    setName(id);
  };
  console.log("This is Name==>>>", name);

  const handelId = (id) => {
    setId(id);
  };

  console.log("ide", Id);
  // const handeldeletewebsite = (e, name) => {
  //   e.preventDefault();
  //   alert("Are You Sure You Want To Delete This Website?");
  //   const data = {
  //     name: name,
  //   };

  //   // console.log( data)
  //   AccountService.deletewebsite(data, auth.user)
  //     .then((res) => {
  //       // console.log(response.data);
  //       if (res.status === 200) {
  //         alert("Website Deleted successfully!");
  //         window.location.reload();
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       alert.error("e.message");
  //     });
  // };

  // get api  fetch
  useEffect(() => {
    AccountService.website(auth.user).then((res) => setGetWebsite(res.data));
  }, [auth]);
  console.log("Website", getWebsite);

  const handelstatement = (e, name) => {
    navigate(`/websitestatement/${name}`);
  };
  return (
    <>
      <div class="card text-center mt-2 mr-5 ml-5">
        <div class="card-header">Website Details</div>

        <div class="card-body">
          {getWebsite.length > 0 &&
            getWebsite.map((data, index) => {
              {
                localStorage.setItem("IdWeb", data._id);
              }
              return (
                <div class="card d-flex justify-content-between">
                  <div class="card-body ">
                    <p className="col">{data.websiteName}</p>
                    <div className=" d-flex justify-content-center gap-1">
                      <button
                        type="button"
                        class="btn btn-danger  btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#modalWthbl"
                      >
                        <FontAwesomeIcon icon={faMinus} className="add-icon" />
                      </button>
                      <button
                        type="button"
                        class="btn btn-success  btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#modalAdWbl"
                        onClick={() => {
                          handelId(data._id);
                        }}
                      >
                        <FontAwesomeIcon icon={faPlus} className="add-icon" />
                      </button>
                      <button
                        type="button"
                        class="btn btn-info  btn-sm"
                        onClick={(e) => {
                          handelstatement(e, data.websiteName);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faFileAlt}
                          className="add-icon"
                        />
                      </button>
                      <button type="button" class="btn btn-warning  btn-sm">
                        <FontAwesomeIcon icon={faEdit} />
                      </button>

                      <button type="button" class="btn btn-danger  btn-sm">
                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          className="delete-icon"
                          onClick={() => {
                            handelName(data.websiteName);
                          }}
                          data-bs-toggle="modal"
                          data-bs-target="#modalWbdl"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div class="card-footer text-muted ">
          <input
            class="form-control mb-2 text-center"
            id="inputPassword2"
            placeholder="Name"
            onChange={handlewebsite}
          />
          <a href="#" class="btn btn-primary" onClick={handleSubmit}>
            Add Website
          </a>
        </div>
        <ModalWthWbl />
        <ModalAdWbl ID={Id} />
        <ModalWbdl name={name} />
      </div>
    </>
  );
};

export default WebsiteDetails;