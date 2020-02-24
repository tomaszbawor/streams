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
          this.setState({
            isSignedIn: this.auth.isSignedIn.get()
          });
        });
    });
  }

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return <div>I do not know if signed in</div>;
    } else if (this.state.isSignedIn === true) {
      return <div>Perfect I am signed in</div>;
    } else {
      return <div>Not signed in</div>;
    }
  }

  render() {
    return this.renderAuthButton();
  }
}

export default GoogleAuth;
