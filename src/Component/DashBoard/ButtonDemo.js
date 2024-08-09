import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Utils/Auth";
import Deposit from "../../Assets/dpst.jpg";
import Withdraw from "../../Assets/Wth.jpg";

function ButtonDemo() {
  const auth = useAuth();
  const [userrole, setUserRole] = useState([]);

  useEffect(() => {
    setUserRole(auth.user?.role);
  }, [auth]);
  return (
    <div className="container-fluid">
      <div
        className="row justify-content-center align-items-center min-vh-100"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(184,23,170,0.9668242296918768) 100%)",
        }}
      >
        <div className="col-md-6 text-center">
          <div className="row ">
            <div className="col-md-6">
              {userrole.some(
                (role) =>
                  role === "superAdmin" ||
                  role === "Dashboard-View" ||
                  role === "Create-Deposit-Transaction" ||
                  role === "Create-Withdraw-Transaction" ||
                  role === "Create-Transaction"
              ) && (
                <Link to="/withdraw" style={{ cursor: "pointer" }}>
                  <div class="card" style={{ width: "18rem" }}>
                    <img
                      class="card-img-top"
                      src={Withdraw}
                      alt="Card image cap"
                    />
                    <div
                      class="card-body"
                      style={{
                        backgroundImage:
                          "linear-gradient(90deg, rgba(255,65,177,1) 0%, rgba(227,236,70,0.9668242296918768) 100%)",
                      }}
                    >
                      <p class="card-text">
                        <b>Withdraw</b>
                      </p>
                    </div>
                  </div>
                </Link>
              )}
            </div>
            <div className="col-md-6">
              {userrole.some(
                (role) =>
                  role === "superAdmin" ||
                  role === "Dashboard-View" ||
                  role === "Create-Deposit-Transaction" ||
                  role === "Create-Withdraw-Transaction" ||
                  role === "Create-Transaction"
              ) && (
                <Link to="/deposit" style={{ cursor: "pointer" }}>
                  <div class="card" style={{ width: "18rem" }}>
                    <img
                      class="card-img-top"
                      src={Deposit}
                      alt="Card image cap"
                    />
                    <div
                      class="card-body"
                      style={{
                        backgroundImage:
                          "linear-gradient(90deg, rgba(107,255,121,1) 0%, rgba(241,255,0,0.9668242296918768) 100%)",
                      }}
                    >
                      <p class="card-text">
                        <b>Deposit</b>
                      </p>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ButtonDemo;
