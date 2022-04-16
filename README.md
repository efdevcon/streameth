[![Netlify Status](https://api.netlify.com/api/v1/badges/a00af031-d631-4fdd-b041-add6f1f0594a/deploy-status)](https://app.netlify.com/sites/efdevcon-tv/deploys)

# StreamETH

This blockchain space has a very remote culture. Even events that are held physically still want to give remote attendees an experience as close to being physically present as possible. While solutions such as YouTube or other social media ‘Live’ media broadcasting solutions exist, they do not align with the core values of decentralization.

This open-source live-streaming and playback solution utilizes decentralized technologies and infrastructure that allows event hosts to easily spin up an environment for their virtual attendees.

## Demo

- https://streameth.tv/

## Development

This project is bootstrapped using a [Next.js](https://nextjs.org/). Check out our [Next.js documentation](https://nextjs.org/docs/) for more details.

Run the development server to watch the result at [http://localhost:3000](http://localhost:3000)

```bash
npm run dev
# or
yarn dev
```

## Add Event

Events are stored in the `/data` folder via JSON metadata. Below is a description of the fields and structure of the JSON:

| **Field**         | **Description**                                                                                                                                                                                            | **Required** | **Default** |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ----------- |
| name              | Name of event                                                                                                                                                                                              | Yes          |             |
| description       | Description of event                                                                                                                                                                                       | Yes          |             |
| start             | Start date of event. Format YYYY-MM-DD                                                                                                                                                                     | Yes          |             |
| end               | End date of event. Format YYYY-MM-DD                                                                                                                                                                       | Yes          |             |
| website           | Website URL                                                                                                                                                                                                |              |             |
| schedule          |                                                                                                                                                                                                            | Yes          |             |
| schedule.sessions | Lists all event sessions. Can be an empty array. See the Session section below for more details about the Session object.                                                                                  | Yes          | []          |
| rooms             | Lists all streaming rooms. Can be empty array. See Room section below for more details about Room object.                                                                                                  | Yes          | []          |
| recordings        | Lists all event recordings. Can be empty array. The presence of recordings generally indicates the event and the livestream are over. See Recording section below for more details about Recording object. | Yes          | []          |

### Session object

| **Field**  | **Description**                                                                                                                 | **Required** | **Default** |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------ | ----------- |
| id         | Session ID                                                                                                                      | Yes          |             |
| name       | Session name                                                                                                                    |              |             |
| abstract   | Session abstract                                                                                                                |              |             |
| descripion | Session description                                                                                                             |              |             |
| track      |                                                                                                                                 |              |             |
| speakers   | List all speakers for the session. Can be empty array. See the Speaker section below for more details about the Speaker object. | Yes          | []          |
| start      | Session start datetime in UTC ISO 8601 format.                                                                                  |              |             |
| end        | Session end datetime in UTC ISO 8601 format.                                                                                    |              |             |
| room       | The Room associated with the session.                                                                                           |              |             |

### Speaker object

| **Field**  | **Description**     | **Required** | **Default** |
| ---------- | ------------------- | ------------ | ----------- |
| id         | Speaker ID          |              |             |
| name       | Speaker name        |              |             |
| descripion | Speaker description |              |             |

### Room object

| **Field** | **Description**                                                                                     | **Required** | **Default** |
| --------- | --------------------------------------------------------------------------------------------------- | ------------ | ----------- |
| id        | Room ID                                                                                             | Yes          |             |
| streams   | List of streams. Can be empty array. See Stream section below for more details about Stream object. | Yes          | []          |

### Stream object

| **Field** | **Description** | **Required** | **Default** |
| --------- | --------------- | ------------ | ----------- |
| id        | Stream ID       | Yes          |             |

### Recording object

| **Field**    | **Description**      | **Required** | **Default** |
| ------------ | -------------------- | ------------ | ----------- |
| name         | Recording name       | Yes          |             |
| recordingUrl | URL to mp4 recording | Yes          |             |

## Livestream setup

To get your own livestreams working, follow these steps:

### 1. Get Livepeer API key

1. Sign up for a Livepeer account at [https://livepeer.com/](https://livepeer.com) to get an API key
2. Add the key as the env var, `LIVEPEER_API_KEY`, to your environment and `.env.local` (development)

### 2. Create streams

1. You can create streams directly from the Livepeer dashboard. After creation, you will get a livepeer stream ID. Copy it.
2. Add the stream ID to the `streams` field within the `rooms` field of the event JSON

Every room can have multiple streams. Generally there will be a primary stream, followed by any backup/failover streams. Separate rooms would have separate streams.

Below is an example event JSON file with 4 streams created in the Livepeer dashboard.

```json
{
  "version": 1,
  "name": "Event Name",
  "description": "Event description",
  "start": "2022-04-19",
  "end": "2022-04-19",
  "website": "https://example.com",
  "schedule": {
    "sessions": []
  },
  "rooms": [
    {
      "id": "Main",
      "streams": [
        {
          "id": "s3h6iabv-t4xp-t2i4-zu8bmdtsqg50"
        },
        {
          "id": "unr6b8mk-tzpm-18cm-8hmd56ef9r4a"
        }
      ]
    },
    {
      "id": "Second",
      "streams": [
        {
          "id": "06f5ewvi-18yl-vjmc-ds2sojzc7gku"
        },
        {
          "id": "o5tqsfd0-bod9-8tj0-fe9myey5rfha"
        }
      ]
    }
  ],
  "recordings": []
}
```

The first stream in each array would generally be the primary stream, while every subsequent stream in the array acts as the backup/failover stream.

### 3. (Optional) Get Mux Data API key

The video players are configured with Mux data for analytics.

1. Sign up for a Mux Data at [https://www.mux.com/](https://www.mux.com/) to get your API keys
2. You will need an access token and a secret key. Add these as `MUX_ACCESS_TOKEN` and `MUX_SECRET_KEY`, respectively, to your environment.
