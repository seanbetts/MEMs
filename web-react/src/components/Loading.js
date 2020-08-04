import React from "react";
import CircularProgress from '@material-ui/core/CircularProgress';

const Loading = () => (
    <div className="spinner" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ margin: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress color="#000000" />
            <p>Remembering...</p>
        </div>
    </div>
);

export default Loading;