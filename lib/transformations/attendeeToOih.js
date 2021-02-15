/* eslint prefer-destructuring: "off" */
/* eslint no-restricted-syntax: "off" */

function attendeeToOih(attendee) {
  const person = {
    firstName: attendee.profile.first_name,
    lastName: attendee.profile.last_name,
    jobTitle: attendee.profile.job_title,
    gender: attendee.profile.gender,
    birthday: attendee.profile.birth_date,
    contactData: [],
    addresses: [],
  };

  if (attendee.profile.work_phone) {
    person.contactData.push({
      type: 'phone',
      value: attendee.profile.work_phone,
    });
  }

  if (attendee.profile.cell_phone) {
    person.contactData.push({
      type: 'mobile',
      value: attendee.profile.cell_phone,
    });
  }

  if (attendee.profile.website) {
    person.contactData.push({
      type: 'website',
      value: attendee.profile.website,
    });
  }

  if (attendee.profile.addresses) {
    for (const adr in attendee.profile.addresses) {
      if (Object.hasOwnProperty.call(attendee.profile.addresses, adr)) {
        const address = {
          street: attendee.profile.addresses[adr].address_1,
          streetNumber: attendee.profile.addresses[adr].address_2,
          city: attendee.profile.addresses[adr].city,
          country: attendee.profile.addresses[adr].country,
          zipcode: attendee.profile.addresses[adr].postal_code,
          region: attendee.profile.addresses[adr].region,
        };

        const hasAddressValue = Object.values(address).some(x => (x && x !== ''));

        if (hasAddressValue) person.addresses.push(address);
      }
    }
  }

  const expression = {
    data: person,
    metadata: {
      recordUid: attendee.id,
    },
  };

  return expression;
}

module.exports = {
  attendeeToOih,
};
