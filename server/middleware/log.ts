/**
 * For logging access
 */
export default defineEventHandler((event) => {
    console.log("-> Se llama", event.method, "::", event._path);
})