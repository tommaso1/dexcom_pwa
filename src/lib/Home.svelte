<script lang="ts">
    import { getTime, getStandardDeviation } from "../utils/dexcom_data_record";

    import { fetchDataFromDexcom } from "../utils/api_service";

    const sessionId = window.localStorage.getItem("dexcom-session-id");
    let lastData = [];
    let dailyData = [];

    $: dailyAverage = (
        dailyData.map((d) => d.Value).reduce((a, b) => a + b, 0) /
        dailyData.length
    ).toFixed(0);

    $: standardDeviation = getStandardDeviation(dailyData).toFixed(0);

    $: formattedData = lastData.map((ld) => [getTime(ld), ld.Value]);

    if (!sessionId) {
        window.location.href = "/login";
    } else {
        fetchDataFromDexcom(sessionId, 6).then((d) => {
            console.log(d);
            if (typeof d !== "string") lastData = d;
            else {
                window.localStorage.clear();
                window.location.href = "/login";
            }
        });
        fetchDataFromDexcom(sessionId, 150).then((d) => {
            console.log(d);
            if (typeof d !== "string") dailyData = d;
            else {
                window.localStorage.clear();
                window.location.href = "/login";
            }
        });
    }
</script>

<p>
    Daily Average {dailyAverage} ({dailyData.length > 0
        ? `${getTime(
              dailyData[dailyData.length - 1]
          ).toLocaleString()} - ${getTime(dailyData[0]).toLocaleString()}`
        : ""})
</p>
<p>Standard Deviation {standardDeviation}</p>
<p>Data</p>

<ul>
    {#each formattedData.map(([t, v]) => [t.toLocaleString(), v]) as item}
        <li>{item[0]} {item[1]}</li>
    {/each}
</ul>
