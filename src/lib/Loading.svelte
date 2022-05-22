<script lang="ts">
    let tooMuch = false;
    setTimeout(() => (tooMuch = true), 2000);
</script>

<div>
    <h3>Once upon a time..</h3>
    <lottie-player
        id="firstLottie"
        src="https://assets3.lottiefiles.com/private_files/lf30_lher7spi.json"
        style="width:100%; height: 300px;"
        autoplay
        loop
    />
    <h4>
        {#if !tooMuch}
            There was an app loading some content <br />
        {:else}
            The web was slow, but the little app was determined to accomplish
            its goal <br />
        {/if}
    </h4>
</div>

<style>
    * {
        font-family: "Square Peg", cursive;
        outline: none;
    }
    div {
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    h3 {
        text-align: center;
        font-size: 2rem;
    }
    h4 {
        font-size: 1.5rem;
        text-align: center;
    }
</style>
