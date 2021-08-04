import React from "react";
import { Form, Field } from "react-final-form";

const PostForm = props => {
    const renderError = ({ error, touched }) => {
        if (touched && error) {
            return <div className="post-form__error">{error}</div>;
        }
    };

    const renderInput = ({ input, label, meta }) => {
        const className = `post-form__field ${meta.error && meta.touched
            ? "error"
            : ""}`;
        return (
            <div className={className}>
                <label className="post-form__label">{label}</label>
                <input
                    className="post-form__input"
                    {...input}
                    autoComplete="off"
                />
                {renderError(meta)}
            </div>
        );
    };

    const renderTextarea = ({ input, label, meta }) => {
        const className = `post-form__field ${meta.error && meta.touched
            ? "error"
            : ""}`;
        return (
            <div className={className}>
                <label className="post-form__label">{label}</label>
                <textarea
                    className="post-form__textarea"
                    {...input}
                    autoComplete="off"
                />
                {renderError(meta)}
            </div>
        );
    };

    const onSubmit = formValues => {
        props.onSubmit(formValues);
    };

    return (
        <Form
            initialValues={props.initialValues}
            onSubmit={onSubmit}
            validate={formValues => {
                const errors = {};

                if (!formValues.title) {
                    errors.title = "You must enter a title!";
                }

                if (!formValues.description) {
                    errors.description = "You must enter a description!";
                }

                if (!formValues.content) {
                    errors.content = "You must enter content!";
                }

                if (!formValues.tags) {
                    errors.tags = "You must enter tags!";
                }

                return errors;
            }}
            render={({ handleSubmit }) => (
                <div className="post-form-container">
                    <form onSubmit={handleSubmit} className="post-form">
                        <h1 className="post-form__title">Add a new post</h1>
                        <Field
                            name="title"
                            component={renderInput}
                            label="Enter Title"
                        />
                        <Field
                            name="description"
                            component={renderInput}
                            label="Enter Description"
                        />
                        <Field
                            name="content"
                            component={renderTextarea}
                            label="Enter Content"
                        />
                        <Field
                            name="tags"
                            component={renderInput}
                            label="Enter Tags"
                        />
                        <button className="post-form__button">Submit</button>
                    </form>
                </div>
            )}
        />
    );
};

export default PostForm;
