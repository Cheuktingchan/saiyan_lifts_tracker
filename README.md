# Saiyan Lifts Tracker

WIP:
This is a workout tracker web application designed to be performant and simple - perfect for use in the gym. Say goodbye to your notes app!
https://saiyan-lifts-tracker.vercel.app/

## Features

-   Log workouts with details (exercises, sets, reps, weight).
-   Track progress over time with charts and statistics.
-   Set goals and track your progress towards them.

## Installation

1. Clone this repository: `git clone https://github.com/your-username/workout-tracker.git`
2. Install dependencies: `npm install`
3. Set the following environment variables in `/.env.local` : `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Start development server: `npm run dev`

## Supabase Local Config

1. `npx supabase init`
2. `npx supabase start` (must have Docker installed)
3. `npx supabase db reset`
