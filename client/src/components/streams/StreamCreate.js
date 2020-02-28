import React from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { createStream } from "../../actions";

class StreamCreate extends React.Component {
  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label htmlFor={label}>{label}</label>
        <input
          onChange={input.onChange}
          value={input.value}
          id={label}
          autoComplete="off"
        />
        {this.renderError(meta)}
      </div>
    );
  };

  renderError = ({ touched, error }) => {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
    return null;
  };

  onSubmit = formValues => {
    const { createStream: createStreamAction } = this.props;
    createStreamAction(formValues);
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)} className="ui form error">
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary" type="submit">
          Submit
        </button>
      </form>
    );
  }
}

StreamCreate.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  createStream: PropTypes.func.isRequired
};

const validate = formValues => {
  const errors = {};
  const { title, description } = formValues;

  if (!title) {
    errors.title = "You must enter title";
  }

  if (!description) {
    errors.description = "You must enter description";
  }
  return errors;
};

const formWrapped = reduxForm({
  form: "streamCreate",
  validate
})(StreamCreate);

export default connect(null, { createStream })(formWrapped);
