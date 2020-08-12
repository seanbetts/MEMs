import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import 'react-datepicker/dist/react-datepicker.css'

import FormBuilder from './FormBuilder'
import CreateMem from './CreateMem'
import { MySelect, MyDate, MyCheckbox } from './FormikFields'
import LoadThumbnail from './loadThumbnail'

import { Button } from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { Public as PublicIcon } from '@material-ui/icons'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  addMemForm: {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    flexWrap: 'nowrap',
  },
  memFormMain: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  memFormDetails: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
  },
  memFormImage: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    marginLeft: '30px',
    paddingBottom: '15px',
    justifyContent: 'flex-end',
  },
  memFormOptions: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  memFormCheckboxes: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
  },
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
  memCheckbox: {
    marginTop: '5px',
    marginBottom: '7px',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-end',
    width: '57%',
  },
  saveMem: {
    width: '100px',
    marginTop: '10px',
    padding: '5px',
    color: 'white',
    backgroundColor: 'black',
    borderRadius: '8px',
    '&:hover': {
      color: 'black',
      backgroundColor: 'green',
      borderRadius: '8px',
    },
  },
  reset: {
    width: '100px',
    marginTop: '10px',
    marginRight: '5px',
    padding: '5px',
    color: 'black',
    backgroundColor: 'white',
    border: '2px solid',
    borderRadius: '8px',
    '&:hover': {
      color: 'white',
      backgroundColor: 'red',
      border: 'none',
      borderRadius: '8px',
    },
  },
  error: {
    display: 'flex',
    flexDirection: 'row-reverse',
    marginTop: '-10px',
    marginBottom: '1px',
    fontSize: '12px',
    color: 'red',
  },
}))

const AddMemForm = () => {
  const classes = useStyles()

  return (
    <>
      <h2>Add a new MEM to your collection</h2>
      <Formik
        initialValues={{
          memType: '',
          memDate: '',
          image: '',
          favourite: false,
          broadcast: false,
        }}
        validationSchema={Yup.object({
          memType: Yup.string()
            .oneOf(
              ['event', 'person', 'place', 'music', 'movie', 'tvshow', 'game'],
              'Invalid MEM Type'
            )
            .required('Required'),
          memName: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
          memDate: Yup.date()
            .default(() => new Date())
            .required('Required'),
          favourite: Yup.boolean().oneOf([true], [false]),
          public: Yup.boolean().oneOf([true], [false]),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          await new Promise((r) => setTimeout(r, 500))
          setSubmitting(false)
        }}
      >
        {(props) => {
          const {
            values,
            touched,
            dirty,
            errors,
            handleReset,
            setFieldValue,
            setFieldTouched,
            isSubmitting,
          } = props
          return (
            <Form autoComplete="off" className={classes.addMemForm}>
              <div className={classes.memFormMain}>
                <div className={classes.memFormDetails}>
                  <MySelect
                    label="MEM Type"
                    name="memType"
                    className={classes.memSelectField}
                  >
                    <option value="">Select a MEM type</option>
                    <option value="event">Event</option>
                    <option value="person">Person</option>
                    <option value="place">Place</option>
                    <option value="music">Music</option>
                    <option value="movie">Movie</option>
                    <option value="tvshow">TV Show</option>
                    <option value="game">Game</option>
                  </MySelect>
                  {FormBuilder(
                    values.memType,
                    setFieldValue,
                    setFieldTouched,
                    values,
                    errors,
                    touched
                  )}
                  <div>MEM Date</div>
                  <MyDate
                    className={classes.memTextField}
                    name="memDate"
                    value={values.date}
                    onChange={setFieldValue}
                  />
                </div>
                <div className={classes.memFormImage}>
                  <LoadThumbnail file={values.file} />
                  <input
                    id="file"
                    name="file"
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      setFieldValue('file', event.currentTarget.files[0])
                    }}
                    className={classes.memImage}
                  />
                </div>
              </div>
              <div className={classes.memFormOptions}>
                <div className={classes.memFormCheckboxes}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'row',
                      flexWrap: 'nowrap',
                    }}
                  >
                    <FavoriteIcon />
                    <MyCheckbox
                      name="favourite"
                      className={classes.memCheckbox}
                    >
                      This MEM is a favourite!
                    </MyCheckbox>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'row',
                      flexWrap: 'nowrap',
                    }}
                  >
                    <PublicIcon />
                    <MyCheckbox
                      name="broadcast"
                      className={classes.memCheckbox}
                    >
                      I want to share this MEM far and wide...
                    </MyCheckbox>
                  </div>
                </div>
                <div className={classes.buttonContainer}>
                  <Button
                    type="button"
                    onClick={handleReset}
                    disabled={!dirty || isSubmitting}
                    className={classes.reset}
                  >
                    Reset
                  </Button>
                  <Button
                    type="submit"
                    onClick={() => CreateMem(props.values.file, values)}
                    disabled={isSubmitting}
                    className={classes.saveMem}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </Form>
          )
        }}
      </Formik>
    </>
  )
}

export default AddMemForm
