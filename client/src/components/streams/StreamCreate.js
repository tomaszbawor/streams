import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamCreate extends React.Component {
  renderInput = ({ input, label }) => {
    return (
      <div className="field">
        <label htmlFor={label}>{label}</label>
        <input onChange={input.onChange} value={input.value} id={label} />
      </div>
    );
  };

  render() {
    return (
      <form className="ui form">
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
      </form>
    );
  }
}

export default reduxForm({
  form: "streamCreate"
})(StreamCreate);
