/* eslint prefer-destructuring: "off" */
/* eslint no-await-in-loop: "off" */

const request = require('request-promise').defaults({ simple: false, resolveWithFullResponse: true });

/**
 * This method fetches objects from Snazzy Contacts
 * depending on the value of count variable and type
 *
 * @param token - Snazzy Contacts token required for authentication
 * @param snapshot - current state of snapshot
 * @return {Object} - Array of person objects containing data and meta
 */
async function getAttendees(token, eventId, snapshot) {
  try {
    let attendees = [];

    const options = {
      method: 'GET',
      uri: `https://www.eventbriteapi.com/v3/events/${eventId}/attendees/`,
      headers: {
        authorization: `Bearer ${token}`,
      },
      json: true,
    };

    if (snapshot.lastItem) options.qs.last_item_seen = snapshot.lastItem;

    const response = await request(options);

    if (response.statusCode !== 200) return [];

    attendees = response.body.attendees;

    if (response.body.pagination.has_more_items === true) {
      let hasMore = true;
      let { continuation } = response.body.pagination;
      let counter = 1;

      while (hasMore === true) {
        options.qs.continuation = continuation;
        const loopResponse = await request(options);
        if (loopResponse.statusCode !== 200) break;
        attendees = attendees.concat(loopResponse.body.attendees);
        hasMore = loopResponse.body.pagination.has_more_items;
        continuation = loopResponse.body.pagination.continuation;

        counter += 1;
        if (counter > 20) break;
      }
    }

    return attendees;
  } catch (e) {
    console.error(e);
    return [];
  }
}


module.exports = { getAttendees };
