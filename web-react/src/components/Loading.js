import React from "react";
import CircularProgress from '@material-ui/core/CircularProgress';

const loading =
    "https://cdn.auth0.com/blog/auth0-react-sample/assets/loading.svg";

const Loading = () => (
    <div className="spinner" style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress color="#000000" />
        <p>Loading...</p>
    </div>
);

export default Loading;