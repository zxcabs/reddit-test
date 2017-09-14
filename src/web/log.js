export default function logController(areaEl) {
    return (text) => {
        areaEl.value = text;
    };
}
