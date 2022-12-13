# StreamETH

This blockchain space has a very remote culture. Even events that are held physically still want to give remote attendees an experience as close to being physically present as possible. While solutions such as YouTube or other social media ‘Live’ media broadcasting solutions exist, they do not align with the core values of decentralization.

This open-source live-streaming and playback solution utilizes decentralized technologies and infrastructure that allows event hosts to easily spin up an environment for their virtual attendees.

## Demo

- https://streameth.tv/
- https://watch.ethberlin.ooo
- https://live.devcon.org

## Development

This project is bootstrapped using a [Next.js](https://nextjs.org/). Check out our [Next.js documentation](https://nextjs.org/docs/) for more details.

Run the development server to watch the result at [http://localhost:3000](http://localhost:3000)

```bash
npm run dev
# or
yarn dev
```

# Configuration
The configuration file can be found at config/streameth.json

The configuration file is used to store event details, data sources, and installed plugins. To use it, follow these steps:

  1. Replace the placeholder values for name, description, start, end, website, and poster with the appropriate values for your event.
    
  2. The data object defines which data integration to use. Currently, streameth supports the following integrations:
  
  - [CMS](src/services/cms/README.md)
  - [Google Sheets](src/services/gsheet/README.md)
  - [Pretalx](src/services/pretalx/readme.md)
  
  3. If any plugins are installed for the event, add their names to the plugins array. ( Not supported yet)

Example:
```
{
  "name": "ETHBerlin",
  "description": "ETHBerlin³ is a hackathon, a cultural festival, an educational event, a platform for hacktivism, and a community initiative to push the decentralized ecosystem forward.",
  "start": "2022-09-16",
  "end": "2022-09-18",
  "website": "https://ethberlin.ooo/",
  "poster": "/images/default.png",
  "data": {
    "type": "gsheet",
    "config": {
      "sheetId": "1IDUQ1bkgV0NSLLhZ3qoJqh4CGMdKmxGr_TlYKVsGO3o"
    }
  },
  "plugins": []
}
```


## Livestream setup

To get your own livestreams working, follow these steps:

### 1. Get Livepeer API key

1. Sign up for a Livepeer account at [https://livepeer.com/](https://livepeer.com) to get an API key
2. Add the key as the env var, `LIVEPEER_API_KEY`, to your environment and `.env.local` (development)

### 2. Create streams

1. You can create streams directly from the Livepeer dashboard. After each stream creation, you will get a livepeer stream ID. Copy it.
2. Add the stream ID to the `streams` field for a stage object. Accessing the stage object will vary depending on which data integration you are using. 

### 3. (Optional) Get Mux Data API key

The video players are configured with Mux data for analytics.

1. Sign up for a Mux Data at [https://www.mux.com/](https://www.mux.com/) to get your API keys
2. You will need an access token and a secret key. Add these as `MUX_ACCESS_TOKEN` and `MUX_SECRET_KEY`, respectively, to your environment.
