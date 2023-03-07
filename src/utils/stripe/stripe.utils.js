//create Stripe instance
import { loadStripe } from '@stripe/stripe-js'
console.log(process.env.STRIPE_PUBLISHABLE_KEY);

export const stripePromise = loadStripe("pk_test_51MikpyATOxM3OIxfFfyyS59KCOvowNoIzZGi7l6MgmzVu05MaFDNYx8wdWQ63XXt0qKZ4S5IUP9wIy7SJLZvaFDM00Cm3GeF2y")