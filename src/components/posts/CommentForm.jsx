import React from "react";
import { Form, Field } from "react-final-form";

const CommentForm = props => {
    const renderError = ({ error, touched }) => {
        if (error && touched) {
            return <div className="post-form__error">{error}</div>;
        }
    };

    const renderTextarea = ({ input, label, meta }) => {
        const className = `comment-form__field ${meta.error ? "error" : ""}`;

        return (
            <div className={className}>
                <label className="comment-form__label">{label}</label>
                <textarea
                    className="comment-form__textarea"
                    {...input}
                    autoComplete="off"
                />
                {renderError(meta)}
            </div>
        );
    };

    const onSubmit = formValues => {
        // console.log(formValues);
        props.onCommentSubmit(formValues);
    };

    return (
        <Form
            initialValues={props.initialValues}
            onSubmit={onSubmit}
            validate={formValues => {
                const errors = {};

                if (!formValues.content) {
                    errors.content = "Comment cannot be empty!";
                }

                return errors;
            }}
            render={({ handleSubmit, form }) => (
                <form
                    onSubmit={async event => {
                        await handleSubmit(event);
                        form.reset();
                        form.resetFieldState("content");
                    }}
                    className="comment-form"
                >
                    <Field
                        name="content"
                        component={renderTextarea}
                        label="Write a comment"
                    />

                    <button className="comment-form__button">Submit</button>
                </form>
            )}
        />
    );
};

export default CommentForm;
