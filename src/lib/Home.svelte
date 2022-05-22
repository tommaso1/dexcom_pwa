<script lang="ts">
    import { getTime, getStandardDeviation } from "../utils/dexcom_data_record";

    import { fetchDataFromDexcom } from "../utils/api_service";
    import Loading from "./Loading.svelte";

    const sessionId = window.localStorage.getItem("dexcom-session-id");
    let loading = false;
    let lastData = [];
    let dailyData = [];

    $: dailyAverage = (
        dailyData.map((d) => d.Value).reduce((a, b) => a + b, 0) /
        dailyData.length
    ).toFixed(0);

    $: standardDeviation = getStandardDeviation(dailyData).toFixed(0);

    $: formattedData = lastData.map((ld) => [getTime(ld), ld.Value]);

    const fetchAll = async () => {
        loading = true;
        await fetchDataFromDexcom(sessionId, 6).then((d) => {
            if (d[0]) lastData = d;
            else {
                window.localStorage.clear();
                window.location.href = "/login";
            }
        });

        await fetchDataFromDexcom(sessionId, 150).then((d) => {
            if (typeof d !== "string") dailyData = d;
            else {
                window.localStorage.clear();
                window.location.href = "/login";
            }
        });
        loading = false;
    };

    if (!sessionId) {
        window.location.href = "/login";
    } else {
        fetchAll();
    }
</script>

{#if !loading}
    <h1>Current Data</h1>
    <div class="stats">
        <lottie-player
            id="fruit"
            src="https://assets8.lottiefiles.com/packages/lf20_9ux1ls.json"
            autoplay
            loop
            style="height: 150px"
        />
        <lottie-player
            id="fruit3"
            src="https://assets3.lottiefiles.com/packages/lf20_rmpmxft3.json"
            autoplay
            loop
            style="height: 150px"
        />
    </div>

    <ul>
        {#each formattedData.map( ([t, v], i) => [t.toLocaleTimeString(), v, i] ) as item}
            <li
                style="opacity: {1 - 0.15 * item[2]};"
                class={item[2] == 0 ? "current" : ""}
            >
                <h2 style="font-size: {40 - 2.3 * item[2]}px;">{item[1]}</h2>
                <span style="font-size: {14 - item[2]}px;">{item[0]}</span>
            </li>
        {/each}
    </ul>
    <h1>Stats</h1>
    <lottie-player
        id="fruit2"
        src="https://assets6.lottiefiles.com/packages/lf20_7CAQeC.json"
        autoplay
        loop
        style="height: 150px"
    />

    <div class="stats">
        <div class="info">
            <h2>{standardDeviation}</h2>
            <p>Std Dev</p>
        </div>
        <div class="info">
            <h2>{dailyAverage}</h2>
            <p>Avg</p>
        </div>
    </div>
    <div class="stats">
        <div class="info" on:click={fetchAll}>
            <p>Refresh</p>
        </div>
    </div>
{:else}
    <Loading />
{/if}

<style>
    * {
        color: rgb(0, 10, 14);
        outline: none;
    }
    .current {
        border: 1px solid gainsboro;
        border-radius: 1000px;
        width: 4rem;
        height: 4rem;
    }
    .current h2 {
        margin-top: 8px;
    }
    ul {
        list-style-type: none;
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        justify-content: space-evenly;
        margin: 0;
        padding: 0;
        text-align: center;
        font-family: "Square Peg", cursive;
    }
    h2 {
        margin: 0;
        margin-left: 0.3rem;
        margin-right: 0.3rem;
        line-height: 32px;
        padding: 0;
        font-family: "Square Peg", cursive;
    }
    h1 {
        font-family: "Square Peg", cursive;
        text-align: center;
        margin-bottom: 0;
    }

    .info {
        border: 1px solid gainsboro;
        border-radius: 1000px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 4rem;
        height: 4rem;
    }
    .info h2 {
        margin: 0;
        font-size: 2rem;
        line-height: 1.6rem;
    }
    .info p {
        margin: 0;
        line-height: 1rem;
        font-size: 0.75rem;
    }
    .stats {
        display: flex;
        justify-content: space-evenly;
    }
</style>
