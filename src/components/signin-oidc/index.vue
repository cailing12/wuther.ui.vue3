<template>
<p>bbbbbb</p>
</template>

<script>
import Oidc from "oidc-client";

new Oidc.UserManager()
  .signinRedirectCallback()
  .then(function(c) {
    console.log("redirect",c)
    window.location = "/#/sign-redict";
  })
  .catch(function(e) {
    console.log(e)
  });
  export default{}

</script>