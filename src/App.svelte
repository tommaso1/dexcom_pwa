<script lang="ts">
  import Login from "./lib/Login.svelte";
  import Home from "./lib/Home.svelte";
  import { Router, Route, Link } from "svelte-navigator";
</script>

<Router>
  <Route path="login">
    <Login />
  </Route>
  <Route path="/">
    <Home />
  </Route>
</Router>

<style>
</style>
