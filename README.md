Live Demo(Netlify): https://star-wars-fleet-management-sanjeev.netlify.app/

Star Wars Fleet Management Dashboard

Overview

This project is a Star Wars Fleet Management Dashboard that allows users to search, filter, and compare starships from the Star Wars universe. The application fetches starship data from the Star Wars API (SWAPI) and presents it in a user-friendly dashboard.

Features

Search Starships - Users can search for starships by name (e.g., "Millennium Falcon").

Paginated Starship List - Displays starships with name, model, manufacturer, crew size, and hyperdrive rating.

Filter Starships - Filters starships based on:

Hyperdrive Rating: <1.0, 1.0-2.0, >2.0

Crew Size: 1-5, 6-50, 50+

Compare Starships - Select up to 3 starships and compare their details in a side-by-side view.

Persist Selected Starships - The selected starships remain when navigating between pages.

Dark Mode Support - Implemented using TailwindCSS themes.

Tech Stack

Next.js (App Router) - Framework

shadcn + TailwindCSS - UI styling

react-query - Efficient API data fetching and caching

ts-rest - Type-safe API interactions

react-table - Displaying starship lists

Jotai - Managing selected starships across pages

Setup Instructions

Prerequisites

Node.js (>=16.0.0)

Yarn (or npm)

Installation

Clone the repository:

git clone <repository-url>
cd star-wars-fleet-dashboard

Install dependencies:

yarn install

Start the development server:

yarn dev

Open http://localhost:3000/ in your browser.

Additional Implementations

State Persistence: Jotai ensures selected starships persist across navigation.

Error Handling: Handles API failures gracefully with UI messages.

Performance Optimizations: React Query caching, infinite scrolling for pagination.

Mobile-Friendly: Fully responsive design.

Animations: Smooth transitions using Framer Motion.

API Endpoint

Starship Search:

GET https://swapi.dev/api/starships/?search={starship-name}

Deployment

The app is deployed on Vercel. You can access it here: Live Demo
