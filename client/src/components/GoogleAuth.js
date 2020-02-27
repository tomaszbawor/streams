import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "359047017705-1h2u4f0rl0bq53vf7rqlj8n5k7p1fj5q.apps.googleusercontent.com",
          scope: "email profile"
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = isSignedIn => {
    const { signIn: logIn, signOut: logOut } = this.props;
    if (isSignedIn) {
      logIn(this.auth.currentUser.get().getId());
    } else {
      logOut();
    }
  };

  onSignInClicked = () => {
    this.auth.signIn();
  };

  onSignOutClicked = () => {
    this.auth.signOut();
  };

  renderAuthButton = () => {
    const { isSignedIn } = this.props;
    if (isSignedIn === null) {
      return null;
    }
    if (isSignedIn === true) {
      return (
        <button
          onClick={this.onSignOutClicked}
          className="ui red google button"
          type="button"
        >
          <i className="google icon" /> Sign out
        </button>
      );
    }
    return (
      <button
        onClick={this.onSignInClicked}
        className="ui red google button"
        type="button"
      >
        <i className="google icon" /> Sign in with google
      </button>
    );
  };

  render() {
    return this.renderAuthButton();
  }
}

GoogleAuth.propTypes = {
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  isSignedIn: PropTypes.bool // Is bool but may be null.
};

GoogleAuth.defaultProps = {
  isSignedIn: null
};

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
