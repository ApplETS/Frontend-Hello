<a href="https://demo-nextjs-with-supabase.vercel.app/">
  <img width="1081" alt="image" src="https://github.com/projets-fin-bac-24/frontend-ps/assets/25663435/ce8c7702-4e5c-4b49-861b-678ba03cf820">
  <h1 align="center">Hello Frontend</h1>
</a>

<p align="center">
 Hello Frontend is the main interface to handle all things related to publication of news on the platform ÉTSMobile. It connects to [Backend Hello](https://github.com/ApplETS/Backend-Hello)
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#clone-and-run-locally"><strong>Clone and run locally</strong></a>
</p>
<br/>

## Features

- Organizer features
  - Organize events, review older events posted, and more!  
  - Change your user preferences
  - Manage your in progress events
- Moderator features
  - Review events posted by organizer, approve or deny events.
  - Insure having a nice QA over which events gets delivered through the platform.
- Styling with [Daisy UI](https://daisyui.com/)
- Auth handled by supabase
- Environment variables setup
- Communicate with [Backend-Hello](https://github.com/ApplETS/Backend-Hello)

## Prerequisites
- Docker (suppose to be already installed at this point)
- [Git](https://git-scm.com/downloads)
- [Node](https://nodejs.org/en/download/package-manager)
- [Visual Studio Code](https://code.visualstudio.com/)

## Clone and run locally

3. Use `cd` to change into the app's directory

   ```bash
   cd Frontend-Hello
   ```

4. Rename `.env.local.example` to `.env.local` and update the following:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=[INSERT SUPABASE PROJECT URL]
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[INSERT SUPABASE PROJECT API ANON KEY]
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=[INSERT RECAPTCHA_SITE_KEY]
   RECAPTCHA_SECRET_KEY=[INSERT RECAPTCHA_SECRET_KEY]
   API_BASE_URL=http://localhost:8080/api
   ```

   Both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` can be found in [your Supabase project's API settings](https://app.supabase.com/project/_/settings/api)
   All the `RECAPTCHA` related stuff needs to be defined and found in a google cloud project.

6. You can now run the Next.js local development server:

   ```bash
   npm run dev
   ```

   The frontend should now be running on [localhost:3000](http://localhost:3000/).

> Check out [the docs for Local Development](https://supabase.com/docs/guides/getting-started/local-development) to also run Supabase locally.
