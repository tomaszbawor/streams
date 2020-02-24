import React from "react";

class GoogleAuth extends React.Component {
  state = {
    isSignedIn: null
  };

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
          this.onAuthChange();
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  };

  onSignInClicked = () => {
    this.auth.signIn();
  };

  onSignOutClicked = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return null;
    } else if (this.state.isSignedIn === true) {
      return (
        <button
          onClick={this.onSignOutClicked}
          className="ui red google button"
        >
          <i className="google icon" /> Sign out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClicked} className="ui red google button">
          <i className="google icon" /> Sign in with google
        </button>
      );
    }
  }

  render() {
    return this.renderAuthButton();
  }
}

export default GoogleAuth;
