<script lang="ts">
  import logo from "./assets/svelte.png";
  import Counter from "./lib/Counter.svelte";
  import Login from "./lib/Login.svelte";
  import Home from "./lib/Home.svelte";
  import { Router, Route, Link } from "svelte-navigator";

  import { loginToDexcomCloud, fetchDataFromDexcom } from "./utils/api_service";

  const doYourThing = async () => {
    const session_id = await loginToDexcomCloud("tommasorosso", "Apollo!");
    const readings = await fetchDataFromDexcom(session_id);
    alert(JSON.stringify(readings));
  };
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
