import React from "react";
import CircularProgress from '@material-ui/core/CircularProgress';

const Loading = () => (
    <div className="spinner" style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress color="#000000" />
        <p>Loading...</p>
    </div>
);

export default Loading;