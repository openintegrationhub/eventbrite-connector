![beta](https://img.shields.io/badge/Status-Beta-yellow.svg)

# Eventbrite Connector

> Eventbrite Connector for Open Integration Hub.

## Actions

## Triggers

### getAttendees
This trigger will get all attendees from a specified Eventbrite event. Make sure to pass the event's ID as `eventId`, and the "private token" of your API Key as `accessToken`. The Connector will automatically recognize new or updated attendees, and pass them on as they occur.

## Integrated Transformations

By default, this connector attempts to automatically transform data to and from the OIH Address Master Data model. If you would like to use your own transformation solution, simply set `skipTransformation: true` in the `fields` object of your flow configuration. Alternatively, you can also inject a valid, stringified JSONata expression in the `customMapping` key of the `fields` object, which will be used instead of the integrated transformation.
