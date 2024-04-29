// api.js

const events = [
    {
      "id": 571,
      "eventId": 6710134004,
      "eventType": "LEAVE",
      "eventName": "EMERGENCY_LEAVE_COUNT"
    },
    {
      "id": 580,
      "eventId": 6710135001,
      "eventType": "ROLE",
      "eventName": "ROLE_CHANGE_REQUESTED"
    },
    {
      "id": 579,
      "eventId": 6710135003,
      "eventType": "ROLE",
      "eventName": "ROLE_EXPIRED"
    },
    {
      "id": 573,
      "eventId": 6710134001,
      "eventType": "LEAVE",
      "eventName": "LEAVE_COUNT"
    },
    {
      "id": 572,
      "eventId": 6710134002,
      "eventType": "LEAVE",
      "eventName": "LEAVE_REQUESTED"
    },
    {
      "id": 570,
      "eventId": 6710133004,
      "eventType": "HOLIDAY",
      "eventName": "HOLIDAY_COVERAGE_REQUESTED"
    },
    {
      "id": 564,
      "eventId": 6710132002,
      "eventType": "TICKET",
      "eventName": "TICKET_CREATED"
    },
    {
      "id": 565,
      "eventId": 6710132004,
      "eventType": "TICKET",
      "eventName": "TICKET_REPOPENED"
    },
    {
      "id": 563,
      "eventId": 6710132003,
      "eventType": "TICKET",
      "eventName": "TICKET_ESCALATED"
    },
    {
      "id": 568,
      "eventId": 6710133002,
      "eventType": "HOLIDAY",
      "eventName": "HOLIDAY_REQUESTED"
    },
    {
      "id": 569,
      "eventId": 6710133001,
      "eventType": "HOLIDAY",
      "eventName": "HOLIDAY_ANNOUNCED"
    },
    {
      "id": 567,
      "eventId": 6710133003,
      "eventType": "HOLIDAY",
      "eventName": "HOLIDAY_APPROACHED"
    },
    {
      "id": 566,
      "eventId": 6710132005,
      "eventType": "TICKET",
      "eventName": "TICKET_SLA_BREACHED"
    },
    {
      "id": 556,
      "eventId": 6710131001,
      "eventType": "USER",
      "eventName": "USER_CREATED"
    },
    {
      "id": 562,
      "eventId": 6710132001,
      "eventType": "TICKET",
      "eventName": "HIGH_PRIORITY_TICKET_CREATED"
    },
    {
      "id": 554,
      "eventId": 6710131003,
      "eventType": "USER",
      "eventName": "USER_SUBSCRIPTION_EXPIRED"
    },
    {
      "id": 585,
      "eventId": 6710136004,
      "eventType": "TEAM",
      "eventName": "TEAM_MEET_SCHEDULED"
    },
    {
      "id": 583,
      "eventId": 6710136005,
      "eventType": "TEAM",
      "eventName": "TEAM_MILESTONE_ACHIEVED"
    },
    {
      "id": 555,
      "eventId": 6710131002,
      "eventType": "USER",
      "eventName": "USER_PASSWORD_CHANGED"
    },
    {
      "id": 586,
      "eventId": 6710137001,
      "eventType": "METRIC",
      "eventName": "METRIC_VALUE_CREATED"
    },
    {
      "id": 584,
      "eventId": 6710136003,
      "eventType": "TEAM",
      "eventName": "TEAM_MEMBER_REMOVED"
    },
    {
      "id": 578,
      "eventId": 6710135002,
      "eventType": "ROLE",
      "eventName": "ROLE_CHANGED"
    },
    {
      "id": 553,
      "eventId": 6710131005,
      "eventType": "USER",
      "eventName": "USER_ACCOUNT_REACTIVITED"
    },
    {
      "id": 552,
      "eventId": 6710131004,
      "eventType": "USER",
      "eventName": "USER_SUBSCRIPTION_RENEWED"
    },
    {
      "id": 581,
      "eventId": 6710136001,
      "eventType": "TEAM",
      "eventName": "TEAM_CREATED"
    },
    {
      "id": 582,
      "eventId": 6710136002,
      "eventType": "TEAM",
      "eventName": "TEAM_MEMBER_ADDED"
    }
];

export const fetchEventTypes = async () => {
  // Simulate API call to fetch event types
  return new Promise((resolve) => {
    const types = [...new Set(events.map(event => event.eventType))];
    resolve(types);
  });
};

export const fetchEventNames = async (eventType) => {
  // Simulate API call to fetch event names based on event type
  return new Promise((resolve) => {
    const names = events
      .filter(event => event.eventType === eventType)
      .map(event => event.eventName);
    resolve(names);
  });
};
