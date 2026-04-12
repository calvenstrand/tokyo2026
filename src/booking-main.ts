import { mount } from 'svelte'
import './app.css'
import BookingApp from './BookingApp.svelte'

const app = mount(BookingApp, {
  target: document.getElementById('app')!,
})

export default app
