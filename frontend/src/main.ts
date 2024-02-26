import { createRoot } from "svelte";
import App from "./App.svelte";
import "./app.css";

// @ts-ignore
const app = createRoot(App, { target: document.getElementById("app") });

export default app;
