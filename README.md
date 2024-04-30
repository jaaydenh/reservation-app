## Reservation App

This is a frontend for a reservation app that allows users to book appointments with providers and allows providers to set their availability hours.

Built with [Next.js](https://nextjs.org/), [Material UI](https://mui.com/), and [Material UI NextJS](https://mui.com/guides/nextjs/).

## Getting Started

Run the development server:

```bash
npm run dev
```

## Styling

The app mostly uses Material UI for styling but ocassionally uses Tailwind CSS for some components.

## Routes

- `/` - list providers
- `/provider/:id` - list provider availability
- `/provider/:id/edit` - edit provider availability
- `/client/:id` - list client reservations

## Data Architecture

Setting weekly availability rules follows this structure:

```json
{
  "rules": [
    { "day": "Sun", "intervals": [{ "from": "09:00", "to": "17:00" }] },
    { "day": "Mon", "intervals": [{ "from": "09:00", "to": "17:00" }] },
    { "day": "Tue", "intervals": [{ "from": "09:00", "to": "17:00" }] },
    { "day": "Wed", "intervals": [{ "from": "09:00", "to": "17:00" }] },
    { "day": "Thu", "intervals": [{ "from": "09:00", "to": "17:00" }] },
    { "day": "Fri", "intervals": [{ "from": "09:00", "to": "17:00" }] },
    { "day": "Sat", "intervals": [{ "from": "09:00", "to": "17:00" }] }
  ]
}
```

In the future this will allow for a type definition to dinstinguish between day and date based availability rules.

The server would be resonsible for transforming this data into a simplied format that used by the frontend when displaying a provider's availability.

```json
{
  "id": 2,
  "name": "Provider 1",
  "availability_timezone": "America/New_York",
  "days": [
    {
      "date": "2024-04-30",
      "status": "available",
      "slots": [
        { "status": "available", "start_time": "2024-04-30T09:00:00-04:00" },
        { "status": "available", "start_time": "2024-04-30T10:15:00-04:00" },
        { "status": "available", "start_time": "2024-04-30T11:30:00-04:00" }
      ]
    }
  ]
}
```

## Mock Data

The app uses mock data from src/data

## Tradeoffs and Next Steps

- Because of time constraints, providers are only to set per day availability that would persist for all weeks into the future. Ideally, providers would also be able to set date based availability using a calendar interface.
- In the future, all times sent and received by the server should be in UTC and converted by the client to the user's timezone.
