import React from 'react'
import Loading from '../Loading'

class LoadThumbnail extends React.Component {
  state = {
    loading: false,
    thumb: undefined,
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!nextProps.file) {
      return
    }

    this.setState({ loading: true }, () => {
      let reader = new FileReader()

      reader.onloadend = () => {
        this.setState({ loading: false, thumb: reader.result })
      }

      reader.readAsDataURL(nextProps.file)
    })
  }

  render() {
    const { file } = this.props
    const { loading, thumb } = this.state

    if (!file) {
      return null
    }
    if (loading) {
      return <Loading />
    }

    return (
      <img
        src={thumb}
        alt={file.name}
        className="imgThumbnail"
        height={140}
        style={{
          marginBottom: '10px',
          justifyContent: 'center',
          width: 'auto',
          height: 'auto',
          objectFit: 'contain',
          maxWidth: '255px',
          maxHeight: '170px',
        }}
      />
    )
  }
}

export default LoadThumbnail
