<script lang="ts">
    import { loginToDexcomCloud } from "../utils/api_service";

    import Error from "./Error.svelte";
    import Loading from "./Loading.svelte";
    let loading = false;
    let error = "";
    let username: string = "";
    let password: string = "";

    const login = async (username, password) => {
        loading = true;
        const response = await loginToDexcomCloud(username, password);
        loading = false;
        if (response.Code == "InvalidArgument") {
            error = "Wrong Credentials";
        } else {
            window.localStorage.setItem("dexcom-session-id", response);
            window.location.href = "/";
        }
    };
</script>

{#if !loading}
    <div>
        <lottie-player
            id="firstLottie"
            src="https://assets1.lottiefiles.com/packages/lf20_nkwmg07i.json"
            autoplay
            loop
            style="width: {(window.innerHeight / window.innerWidth) *
                100 *
                1.7}vw;"
        />
        <h1>Login</h1>
        <label for="username">Username</label>
        <input id="username" bind:value={username} />
        <label for="password">Password</label>
        <input id="password" type="password" bind:value={password} />
        <button on:click={() => login(username, password)}>Login</button>

        {#if error != ""}
            <Error {error} />
        {/if}
    </div>
{:else}
    <Loading />
{/if}

<style>
    * {
        font-family: "Nunito", sans-serif;
        color: rgb(0, 50, 74);
    }
    *:focus-visible {
        outline: none;
    }
    h1 {
        font-family: "Square Peg", cursive;
        font-size: 40px;
    }
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        height: 100vh;
        overflow: hidden;
    }
    button {
        margin-top: 1rem;
        background-color: rgb(0, 205, 178);
        min-width: 80px;
    }

    label {
        margin-top: 0.5rem;
    }

    input {
        padding: 0.5rem 1rem;
        min-width: 250px;
        border-radius: 20px;
        border: 1px solid gainsboro;
    }

    button {
        padding: 0.5rem 1rem;
        border-radius: 20px;
        margin-top: 3rem;
        border: none;
    }

    #firstLottie {
        height: 100vh;
        position: absolute;
        z-index: -1;
        top: 0;
        bottom: 0;
        margin-top: -0.6rem;
        left: 0;
        right: 0;
        overflow: hidden;
    }
</style>
