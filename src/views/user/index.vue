<template>
<p>aaaaaaaaaa</p>
</template>

<script>
import Oidc from "oidc-client";

var config = {
  authority: "http://localhost:5000",
  client_id: "wuther.ui",
  redirect_uri: "http://localhost:8080/#/signin-oidc",
  response_type: "id_token token",
  scope: "openid profile",
  post_logout_redirect_uri: "http://localhost:8080/#/"
};
var mgr = new Oidc.UserManager(config);
export default {
  beforeCreate() {
    mgr.signinRedirect();
  }
};
</script>