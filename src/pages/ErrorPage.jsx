import React from 'react';
import { Link } from 'react-router-dom';

export default function ErrorPage() {
    return (
        <React.Fragment>
            <main className="py-5">
                <div className="container">
                    <div className="h-100px d-none d-lg-block"></div>
                    <div className="row align-items-center text-center py-sm-5">
                        <div className="col-lg-8 mx-auto">
                            <h1 className="display-1 mt-4">404</h1>
                            <h2 className="mb-2 h1">Are you lost?</h2>
                            <p>`You are looking for something that either doesn&apos;t exist or you aren&apos;t allowed to look for.`</p>
                            <Link className="btn btn-primary btn-sm" to="/welcome">Go to home page</Link>
                        </div>
                    </div>
                    <div className="h-100px d-none d-lg-block"></div>
                </div>
            </main>
        </React.Fragment>
    );
}
