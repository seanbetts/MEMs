import React from 'react';
import { Formik, Form, useField, useFormikContext } from 'formik';
import * as Yup from 'yup';
import styled from "@emotion/styled";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Button } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
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
        width: '58%',
    },
    saveMem: {
        width: '100px',
        marginTop: '10px',
        padding: '5px',
        color: 'white',
        backgroundColor: 'black',
        border: '2px solid',
        borderRadius: '8px',
        "&:hover": {
            color: 'black',
            border: '2px solid',
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
    }
}))

// Styled components ....
const StyledSelect = styled.select`
    color: var(--blue);
  `;

const StyledLabel = styled.label`
    margin-top: 1rem;
  `;

const MySelect = ({ label, ...props }) => {
    const classes = useStyles()
    const [field, meta] = useField(props);

    return (
        <>
            <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
            <StyledSelect {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className={classes.error}>{meta.error}</div>
            ) : null}
        </>
    );
};

const MyTextInput = ({ label, ...props }) => {
    const classes = useStyles()
    const [field, meta] = useField(props);

    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className={classes.error}>{meta.error}</div>
            ) : null}
        </>
    );
};

const MyDate = ({ ...props }) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props);

    return (
        <DatePicker
            {...field}
            {...props}
            selected={(field.value && new Date(field.value)) || null}
            onChange={val => {
                setFieldValue(field.name, val);
            }}
        />
    );
};

const MyCheckbox = ({ children, ...props }) => {
    const classes = useStyles()
    const [field, meta] = useField({ ...props, type: "checkbox" });
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
    );
};

class Thumb extends React.Component {
    state = {
        loading: false,
        thumb: undefined,
    };

    componentWillReceiveProps(nextProps) {
        if (!nextProps.file) { return; }

        this.setState({ loading: true }, () => {
            let reader = new FileReader();

            reader.onloadend = () => {
                this.setState({ loading: false, thumb: reader.result });
            };

            reader.readAsDataURL(nextProps.file);
        });
    }

    render() {
        const { file } = this.props;
        const { loading, thumb } = this.state;

        if (!file) { return null; }

        if (loading) { return <p>loading...</p>; }

        return (
            <img src={thumb}
                alt={file.name}
                className="imgThumbnail"
                height={140}
                style={{ marginBottom: '10px', justifyContent: 'center', width: 'auto', height: 'auto', objectFit: 'contain', maxWidth: '255px', maxHeight: '170px' }} />
        );
    }
}

const AddMem = () => {
    const classes = useStyles()

    return (
        <>
            <h2>Add a new MEM to your collection</h2>
            <Formik
                initialValues={{
                    memType: "",
                    memName: "",
                    memDate: "",
                    image: "",
                    favourite: "",
                    public: ""
                }}
                validationSchema={Yup.object({
                    memType: Yup.string()
                        .oneOf(
                            ["event", "person", "place", "music", "movie", "tvshow", "game"],
                            "Invalid MEM Type"
                        )
                        .required("Required"),
                    memName: Yup.string()
                        .max(20, "Must be 20 characters or less")
                        .required("Required"),
                    memDate: Yup.date()
                        .default(() => (new Date()),
                    )
                        .required("Required"),
                    favourite: Yup.boolean()
                        .required("Required")
                        .oneOf([true], [false]),
                    public: Yup.boolean()
                        .required("Required")
                        .oneOf([true], [false]),
                })}
                onSubmit={async (values, { setSubmitting }) => {
                    await new Promise(r => setTimeout(r, 500));
                    setSubmitting(false);
                }}
            >
                {props => {
                    const {
                        values,
                        touched,
                        errors,
                        dirty,
                        isSubmitting,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        handleReset,
                        setFieldValue
                    } = props;
                    return (
                        <Form autocomplete="off" className={classes.addMemForm}>
                            <div className={classes.memFormMain}>
                                <div className={classes.memFormDetails}>
                                    <MySelect label="MEM Type" name="memType" className={classes.memSelectField}>
                                        <option value="">Select a MEM type</option>
                                        <option value="event">Event</option>
                                        <option value="person">Person</option>
                                        <option value="place">Place</option>
                                        <option value="music">Music</option>
                                        <option value="movie">Movie</option>
                                        <option value="tvshow">TV Show</option>
                                        <option value="game">Game</option>
                                    </MySelect>
                                    <MyTextInput
                                        className={classes.memTextField}
                                        label="MEM Name"
                                        name="memName"
                                        type="text"
                                        placeholder="<hello, world>"
                                    />
                                    <div>MEM Date</div>
                                    <MyDate
                                        className={classes.memTextField}
                                        name="memDate"
                                        value={values.date}
                                        onChange={setFieldValue}
                                    />
                                </div>
                                <div className={classes.memFormImage}>
                                    <Thumb file={values.file} />
                                    <input id="file" name="file" type="file" accept="image/*" onChange={(event) => {
                                        setFieldValue("file", event.currentTarget.files[0]);
                                    }} className={classes.memImage} />
                                </div>
                            </div>
                            <div className={classes.memFormOptions}>
                                <div className={classes.memFormCheckboxes}>
                                    <MyCheckbox name="favourite" className={classes.memCheckbox}>
                                        This MEM is a favourite!
                                </MyCheckbox>
                                    <MyCheckbox name="public" className={classes.memCheckbox}>
                                        I want to share this MEM far and wide...
                                </MyCheckbox>
                                </div>
                                <div className={classes.buttonContainer}>
                                    <Button type="submit" disabled={isSubmitting} className={classes.saveMem}>Save</Button>
                                </div>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </>
    );
};

export default AddMem;