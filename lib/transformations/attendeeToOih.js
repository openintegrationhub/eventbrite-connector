/* eslint prefer-destructuring: "off" */

function attendeeToOih(attendee) {
  const expression = {
    data: attendee,
    metadata: {},
  };

  return expression;
}

module.exports = {
  attendeeToOih,
};
