import React from 'react'
import { MySelect, MyTextInput } from './FormikFields'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  memSelectField: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    marginTop: '5px',
    marginBottom: '15px',
    backgroundColor: '#F5F5F5',
    padding: '0.5rem',
    width: '400px',
    fontSize: '0.8rem',
    border: '2px solid',
    borderRadius: '4px',
  },
  memTextField: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    marginTop: '5px',
    marginBottom: '15px',
    backgroundColor: '#F5F5F5',
    padding: '0.5rem',
    width: '400px',
    fontSize: '0.8rem',
    border: '2px solid',
    borderRadius: '4px',
  },
}))

const videoGenres = [
  { value: 'Action', label: 'Action' },
  { value: 'Adventure', label: 'Adventure' },
  { value: 'Animation', label: 'Animation' },
  { value: 'Comedy', label: 'Comedy' },
  { value: 'Crime', label: 'Crime' },
  { value: 'Drama', label: 'Drama' },
  { value: 'Family', label: 'Family' },
  { value: 'Fantasy', label: 'Fantasy' },
  { value: 'Horror', label: 'Horror' },
  { value: 'Music', label: 'Music' },
  { value: 'Mystery', label: 'Mystery' },
  { value: 'Romance', label: 'Romance' },
  { value: 'Science Fiction', label: 'Science Fiction' },
  { value: 'Thriller', label: 'Thriller' },
  { value: 'War', label: 'War' },
]

const FormBuilder = (selectInput) => {
  const classes = useStyles()

  if (selectInput === 'event') {
    return (
      <div>
        <MyTextInput
          className={classes.memTextField}
          label="Event Name"
          name="eventName"
          type="text"
          placeholder="<hello, world>"
        />
      </div>
    )
  } else if (selectInput === 'person') {
    return (
      <div>
        <MyTextInput
          className={classes.memTextField}
          label="First Name"
          name="firstName"
          type="text"
          placeholder="Bruce"
        />
        <MyTextInput
          className={classes.memTextField}
          label="Surname"
          name="surName"
          type="text"
          placeholder="Wayne"
        />
        <MyTextInput
          className={classes.memTextField}
          label="Nickname"
          name="nickName"
          type="text"
          placeholder="Batman"
        />
        <MyTextInput
          className={classes.memTextField}
          label="Relationships"
          name="relationships"
          type="text"
          placeholder="Team Member"
        />
      </div>
    )
  } else if (selectInput === 'place') {
    return (
      <div>
        <MyTextInput
          className={classes.memTextField}
          label="Place Name"
          name="placeName"
          type="text"
          placeholder="Wayne Manor"
        />
        <MyTextInput
          className={classes.memTextField}
          label="City"
          name="city"
          type="text"
          placeholder="Gotham"
        />
        <MyTextInput
          className={classes.memTextField}
          label="Postcode"
          name="postCode"
          type="text"
          placeholder="GT14 8AT"
        />
      </div>
    )
  } else if (selectInput === 'music') {
    return (
      <div>
        <MyTextInput
          className={classes.memTextField}
          label="Album"
          name="album"
          type="text"
          placeholder="OK Computer"
        />
        <MyTextInput
          className={classes.memTextField}
          label="Artist"
          name="artist"
          type="text"
          placeholder="Radiohead"
        />
        <MySelect label="Genre" name="genre" className={classes.memSelectField}>
          <option value="">Select a Genre</option>
          <option value="electronic">Electronic</option>
          <option value="folk">Folk</option>
          <option value="funkSoul">Funk & Soul</option>
          <option value="hipHop">Hip Hop</option>
          <option value="jazz">Jazz</option>
          <option value="pop">Pop</option>
          <option value="rock">Rock</option>
        </MySelect>
      </div>
    )
  } else if (selectInput === 'movie') {
    return (
      <div>
        <MyTextInput
          className={classes.memTextField}
          label="Movie"
          name="movie"
          type="text"
          placeholder="Batman"
        />
        <MyTextInput
          className={classes.memTextField}
          label="Genre"
          name="genre"
          type="text"
          placeholder="Action & Adventure"
        />
      </div>
    )
  } else if (selectInput === 'tvshow') {
    return (
      <div>
        <MyTextInput
          className={classes.memTextField}
          label="TV Show"
          name="tvShow"
          type="text"
          placeholder="Batman Beyond"
        />
        <MyTextInput
          className={classes.memTextField}
          label="Genre"
          name="genre"
          type="text"
          placeholder="Animation"
        />
      </div>
    )
  } else if (selectInput === 'game') {
    return (
      <div>
        <MyTextInput
          className={classes.memTextField}
          label="Game"
          name="game"
          type="text"
          placeholder="Batman"
        />
        <MyTextInput
          className={classes.memTextField}
          label="Genre"
          name="genre"
          type="text"
          placeholder="Action & Adventure"
        />
      </div>
    )
  }
}

export default FormBuilder
