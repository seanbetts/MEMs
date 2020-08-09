import React from 'react'
import { insert } from 'formik'

const Loading = () => (
  <div
    className="spinner"
    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
  >
    <div
      style={{
        margin: '100px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img
        src="https://storage.googleapis.com/mems-images/images/MEMsLoader.gif"
        alt="MEMs Loader"
        style={{
          width: '50px',
          clipPath: 'inset (7% 0 round 7% 7%)',
          WebkitClipPath: 'inset(7% 0 round 7% 7%)',
        }}
      />
      <p>Remembering...</p>
    </div>
  </div>
)

export default Loading
