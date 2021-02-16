/* eslint no-unused-expressions: "off" */

const { expect } = require('chai');
const { attendeeToOih } = require('../lib/transformations/attendeeToOih');

describe('transformations', () => {
  it('should transform from attendee to person', async () => {
    const attendee = {
      id: '12345',
      created: '2018-05-12T02:00:00Z',
      changed: '2018-05-12T02:00:00Z',
      ticket_class_id: '12345',
      ticket_class_name: 'General Admission',
      profile: {
        name: 'John Smith',
        email: 'jhon.smith@example.com',
        first_name: 'John',
        last_name: 'Smith',
        prefix: 'Mr.',
        suffix: 'Sr',
        age: 33,
        job_title: 'Software Enginner',
        company: 'Eventbrite',
        website: 'https://mysite.com',
        blog: 'https://mysite.com',
        gender: 'male',
        birth_date: '1984-12-06',
        cell_phone: '555 555-1234',
        work_phone: '555 555-1234',
        addresses: {
          home: {
            address_1: 'Somestreet',
            address_2: '15',
            city: 'Somecity',
            region: 'Someregion',
            postal_code: '54321',
            country: 'Somecountry',
            latitude: null,
            longitude: null,
            localized_address_display: '',
            localized_area_display: '',
            localized_multi_line_address_display: [],
          },
          ship: {
            address_1: null,
            address_2: null,
            city: null,
            region: null,
            postal_code: null,
            country: null,
            latitude: null,
            longitude: null,
            localized_address_display: '',
            localized_area_display: '',
            localized_multi_line_address_display: [],
          },
        },
      },
    };

    const expected = {
      data: {
        firstName: 'John',
        lastName: 'Smith',
        birthday: '1984-12-06',
        jobTitle: 'Software Enginner',
        gender: 'male',
        contactData: [
          {
            type: 'phone',
            value: '555 555-1234',
          },
          {
            type: 'mobile',
            value: '555 555-1234',
          },
          {
            type: 'website',
            value: 'https://mysite.com',
          },
          {
            type: 'email',
            value: 'jhon.smith@example.com',
          },
        ],
        addresses: [
          {
            street: 'Somestreet',
            streetNumber: '15',
            city: 'Somecity',
            zipcode: '54321',
            region: 'Someregion',
            country: 'Somecountry',
          },
        ],
      },
      metadata: {
        recordUid: '12345',
      },
    };

    const transformed = attendeeToOih(attendee);
    expect(expected).to.deep.equal(transformed);
  });
});
