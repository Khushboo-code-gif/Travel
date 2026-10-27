# MoodTrip AI

MoodTrip AI is a travel-planning web app that helps travelers discover destinations based on their mood, plan an itinerary, explore places on a map, and connect with other travelers. The current project is an interactive prototype: some integrations use live services when configured, while authentication, community trip posts, and some travel data are backed by in-memory or mock data.

## Contents

- [Features](#features)
- [Technology](#technology)
- [Requirements](#requirements)
- [Run locally](#run-locally)
- [Environment variables](#environment-variables)
- [How to use the app](#how-to-use-the-app)
- [Pages and routes](#pages-and-routes)
- [API endpoints](#api-endpoints)
- [Database](#database)
- [Project structure](#project-structure)
- [Available scripts](#available-scripts)
- [Current limitations](#current-limitations)
- [Deployment](#deployment)

## Features

- **Mood-based discovery:** choose a travel mood and preferences to browse destination recommendations.
- **Destination exploration:** browse destinations, hidden gems, and destination detail pages.
- **AI-assisted itineraries:** generate a day-by-day itinerary with an OpenAI API key; a built-in mock itinerary is used when the key is not configured.
- **Map exploration:** view destinations using Mapbox when a valid access token is configured.
- **Trip planning:** create and view travel plans, with trip and budget/packing UI.
- **Travel community prototype:** browse sample travel-buddy posts, submit join requests, and edit trip-request state during the session.
- **Profiles and reviews:** profile, destination review, and trip-sharing pages and API routes are included.
- **Live travel pricing integration:** flight and hotel search routes use the Amadeus test API when credentials are set and return sample results otherwise.
- **Responsive interface:** built with Tailwind CSS, Radix UI primitives, Framer Motion, and Lucide icons.

## Technology

- [Next.js](https://nextjs.org/) 16 with the App Router and React 19
- TypeScript
- Tailwind CSS 4
- Supabase JavaScript client and PostgreSQL schema
- OpenAI API for itinerary generation
- Amadeus test API for flight and hotel search
- Mapbox GL / `react-map-gl` for maps
- ESLint 9

## Requirements

- Node.js **20.9 or later** (required by the installed Next.js version)
- npm (the repository includes `package-lock.json`)
- Optional service accounts/keys for live integrations; the app can be started without them in demo mode

Check versions:

```bash
node --version
npm --version
```

## Run locally

1. Clone the repository and enter the project directory:

   ```bash
   git clone https://github.com/Khushboo-code-gif/Travel.git
   cd Travel
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. (Optional) Create a `.env.local` file in the project root and add the integration keys you plan to use. See [Environment variables](#environment-variables).

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000).

The development command runs Next.js with Webpack. Changes to source files are reflected by the dev server.

## Environment variables

All integrations below are optional for starting the app. Add only the values you have to `.env.local`; do not commit this file or expose server-only secrets in client-side code.

| Variable | Used for | Required? |
|---|---|---|
| `OPENAI_API_KEY` | Server-side AI itinerary generation | No. Without it, the app generates a mock itinerary. |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | No. Without Supabase configuration, the client uses a mock client. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase public/anonymous client key | No. Configure together with the URL to connect to Supabase. |
| `SUPABASE_SERVICE_ROLE_KEY` | Database social seed script only | No. Keep this secret on the server; never use it as a `NEXT_PUBLIC_` variable. |
| `AMADEUS_CLIENT_ID` | Amadeus test API client ID for flight/hotel search | No. Sample results are returned if credentials are absent. |
| `AMADEUS_CLIENT_SECRET` | Amadeus test API client secret | No. Sample results are returned if credentials are absent. |
| `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` | Map tiles in map views | No. A valid token is needed for a fully working map; the source currently contains a placeholder fallback. |

Example `.env.local`:

```dotenv
OPENAI_API_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
AMADEUS_CLIENT_ID=
AMADEUS_CLIENT_SECRET=
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=
```

Restart the development server after changing environment variables. Supabase service-role credentials are highly privileged and must never be exposed to the browser or committed to Git.

## How to use the app

1. Open the home page and choose **Explore by mood** (or open `/mood`).
2. Select a mood and continue to preferences.
3. Browse recommendations and destination detail pages.
4. Generate a trip plan and review its itinerary, budget, and packing information.
5. Explore destinations on the map or browse community trip posts.

The current sign-in flow is a demo interaction, not production authentication. Some trip and community actions update in-memory React state and will reset when the page/app reloads.

## Pages and routes

| Path | Purpose |
|---|---|
| `/` | Landing page and featured travel moods/destinations |
| `/about` | About MoodTrip |
| `/how-it-works` | Product walkthrough |
| `/mood` | Select a travel mood |
| `/preferences` | Set trip preferences |
| `/recommendations` | View destination recommendations |
| `/explore` | Browse destinations |
| `/explore-map` | Explore destinations on a map |
| `/destination/[slug]` | Destination information and reviews |
| `/planning` | Trip planning flow |
| `/trips` | Browse sample travel-buddy requests |
| `/trips/create` | Create a travel-buddy request |
| `/dashboard` | Traveler dashboard |
| `/profile` and `/profile/[username]` | Personal and public profile pages |
| `/profile/edit` | Edit profile |
| `/trip/share/[slug]` | Shared trip page |
| `/messages` | Messaging UI |
| `/onboarding` and `/complete-profile` | Onboarding/profile setup |

## API endpoints

The app's Next.js Route Handlers are under `src/app/api`.

| Endpoint | Methods | Purpose |
|---|---|---|
| `/api/destinations` | `GET` | List/search destinations |
| `/api/destination/[slug]` | `GET` | Fetch a destination by slug |
| `/api/destinations/hidden-gems` | `GET` | Fetch hidden-gem destinations |
| `/api/recommend` | `POST` | Request destination recommendations |
| `/api/generate-trip` | `POST` | Generate a destination and itinerary |
| `/api/locations` | `GET` | Location lookup |
| `/api/search/semantic` | `POST` | Semantic destination search |
| `/api/live/flights` | `GET` | Flight search |
| `/api/live/hotels` | `GET` | Hotel search |
| `/api/trips` | `GET`, `POST`, `DELETE` | Read, save, and delete trips |
| `/api/trip/share/[slug]` | `GET` | Fetch a shared trip |
| `/api/reviews` | `GET`, `POST` | Read and submit reviews |
| `/api/profile/[username]` | `GET` | Fetch a public profile |

These endpoints are part of an evolving prototype. Configure Supabase and the relevant external API credentials before relying on live or persistent data.

## Database

The project includes a Supabase/PostgreSQL schema and supporting data tools in `database/`:

- `database/supabase_schema.sql` — database types, tables, indexes, functions, and related schema setup.
- `database/DATABASE_DOCS.md` — schema notes, data dictionary, and API/database design documentation.
- `database/data/` — CSV datasets for destinations, hotels, restaurants, trips, and media.
- `database/generate_data.js` and `database/generate_travel_data.py` — data generation utilities.
- `database/seed_social.js` — example social data seed script.
- `database/validate_data.ts` — data validation utility.

To connect a Supabase project:

1. Create a Supabase project and configure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`.
2. Review `database/supabase_schema.sql`, then run the schema in the Supabase SQL Editor.
3. Import or generate the destination-related data required by the features you want to test.
4. For `database/seed_social.js` only, set `SUPABASE_SERVICE_ROLE_KEY` in `.env.local` and run the script from the repository root:

   ```bash
   node database/seed_social.js
   ```

The seed script requires an initialized database and destination data. It uses a service-role key, so only run it against a database you control and never publish that key.

## Project structure

```text
src/
  app/                 App Router pages and API route handlers
  components/          Shared UI, layout, map, mood, profile, and trip components
  context/              Client-side auth and trip state providers
  data/                 Mock destinations, trips, and moods
  lib/                  AI, Supabase, map/geography, and external API helpers
  services/             Destination service logic
  types/                Shared TypeScript types
database/
  data/                 CSV datasets
  *.sql                 Supabase schema and extensions
  *.js, *.py, *.ts      Data generation, seeding, and validation utilities
public/                  Static assets
```

## Available scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build locally (run `npm run build` first) |
| `npm run lint` | Run ESLint |

There is no test script configured in `package.json` at this time.

Before submitting changes, run:

```bash
npm run lint
npm run build
```

## Current limitations

- Authentication is currently mocked in client state; it is not a real sign-in or authorization system.
- Community trip posts and some trip/profile interactions use mock or in-memory state, so they are not reliably persisted.
- Without Supabase configuration, the mock client returns empty database results; mock destination data is used by selected features but this does not replace a configured database.
- AI itinerary generation and Amadeus searches have fallback/demo behavior. Results should not be treated as guaranteed travel, availability, or booking information.
- A valid Mapbox token is needed for live map tiles.
- The project contains no configured automated test suite.

## Deployment

The app can be deployed to [Vercel](https://vercel.com/) or another platform that supports Next.js:

1. Push the repository to your Git provider and import it into your hosting platform.
2. Set the required environment variables for the services you intend to enable in the hosting project's environment settings.
3. Build with `npm run build` and serve with `npm run start` (Vercel configures the Next.js build and runtime automatically).
4. Configure Supabase schema/data and external service access separately; deployment does not provision these services.

Do not add secrets to the repository. Use your hosting provider's secret/environment-variable manager.
