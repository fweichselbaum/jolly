import { mount } from 'svelte';
import App from './App.svelte';
import './app.css';

// @ts-ignore
const app = mount(App, { target: document.getElementById('app'), })

export default app
