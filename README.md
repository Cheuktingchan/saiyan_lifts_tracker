# Saiyan Lifts Tracker

This is a workout tracker deployed as a mobile web app. It is designed to be performant and minimalistic by using ethnographic testing - perfect for use in the gym. Say goodbye to your notes app!
https://saiyan-lifts-tracker.vercel.app/

![saiyan-lifts_20-10-24](https://github.com/user-attachments/assets/1bd3af56-56af-4558-a071-fc2b5f7c557c)

## Features

-   Quickly log workouts with details (exercises, sets, reps, weight).
-   Track progress over time with charts and statistics.
-   Organise your sets and exercises into cycles.
-   Gamify your training and push through plateaus!
## Installation

1. Clone this repository: `git clone https://github.com/your-username/workout-tracker.git`
2. Install dependencies: `npm install`
3. Set the following environment variables in `/.env.local` : `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Start development server: `npm run dev`

## Supabase Local Config

1. `npx supabase init`
2. `npx supabase start` (must have Docker installed)
3. `npx supabase db reset`
