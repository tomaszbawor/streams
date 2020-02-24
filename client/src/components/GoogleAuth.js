import React from "react";

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client.init({
        clientId:
          "359047017705-1h2u4f0rl0bq53vf7rqlj8n5k7p1fj5q.apps.googleusercontent.com",
        scope: "email profile"
      });
    });
  }

  render() {
    return <div>GoogleAuth</div>;
  }
}

export default GoogleAuth;
