import React from 'react'
import { useField, useFormikContext } from 'formik'
import DatePicker from 'react-datepicker'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  error: {
    display: 'flex',
    flexDirection: 'row-reverse',
    marginTop: '-10px',
    marginBottom: '1px',
    fontSize: '12px',
    color: 'red',
  },
}))

const MySelect = ({ label, ...props }) => {
  const classes = useStyles()
  const [field, meta] = useField(props)

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className={classes.error}>{meta.error}</div>
      ) : null}
    </>
  )
}

const MyTextInput = ({ label, ...props }) => {
  const classes = useStyles()
  const [field, meta] = useField(props)

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className={classes.error}>{meta.error}</div>
      ) : null}
    </>
  )
}

const MyDate = ({ ...props }) => {
  const { setFieldValue } = useFormikContext()
  const [field] = useField(props)

  return (
    <DatePicker
      {...field}
      {...props}
      selected={(field.value && new Date(field.value)) || null}
      onChange={(val) => {
        setFieldValue(field.name, val)
      }}
    />
  )
}

const MyCheckbox = ({ children, ...props }) => {
  const classes = useStyles()
  const [field, meta] = useField({ ...props, type: 'checkbox' })
  return (
    <>
      <label className="checkbox">
        <input {...field} {...props} type="checkbox" />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className={classes.error}>{meta.error}</div>
      ) : null}
    </>
  )
}

export { MySelect, MyTextInput, MyDate, MyCheckbox }
