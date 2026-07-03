# AirBoard OAuth configuration

AirBoard keeps its existing browser account and session format. Social login is
added through a server-side OAuth bridge so provider secrets and authorization
codes never enter the static frontend.

## Required environment variables

Frontend deployment:

- `AIRBOARD_AUTH_BASE_URL`: OAuth bridge origin, for example `https://auth.airboard.kr`
- `AIRBOARD_AUTH_REDIRECT_URI`: public AirBoard callback URL

OAuth bridge:

- `AIRBOARD_APP_ORIGIN`
- `AIRBOARD_GOOGLE_CLIENT_ID`
- `AIRBOARD_GOOGLE_CLIENT_SECRET`
- `AIRBOARD_KAKAO_CLIENT_ID`
- `AIRBOARD_KAKAO_CLIENT_SECRET`
- `AIRBOARD_APPLE_CLIENT_ID`
- `AIRBOARD_APPLE_TEAM_ID`
- `AIRBOARD_APPLE_KEY_ID`
- `AIRBOARD_APPLE_PRIVATE_KEY`
- `AIRBOARD_OAUTH_SESSION_SECRET`

Generate `outputs/config.js` from the two frontend variables during deployment.
Do not place provider secrets in `config.js`.

## OAuth bridge contract

Start login:

`GET /oauth/{google|kakao|apple}/start?redirect_uri=<url>&state=<state>`

After provider verification, redirect to AirBoard:

`<redirect_uri>?oauth_ticket=<single-use-ticket>&state=<original-state>`

Exchange the one-time ticket:

`GET /oauth/session?ticket=<single-use-ticket>`

The session endpoint must validate and consume the ticket, set an HttpOnly
session cookie, and return:

```json
{
  "user": {
    "email": "student@example.com",
    "name": "Student",
    "avatar": "https://example.com/avatar.jpg",
    "provider": "google",
    "subject": "provider-user-id"
  }
}
```

Logout:

`POST /oauth/logout`

Clear the OAuth bridge session cookie and return a successful empty response.

For failures, redirect with `oauth_error` and the original `state`.
