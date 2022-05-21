<script lang="ts">
    const sessionId = window.localStorage.getItem("dexcom-session-id");
    if (!sessionId) {
        window.location.href = "/login";
    }
</script>

Homepage