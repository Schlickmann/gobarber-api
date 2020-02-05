module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'provider_schedule',
      [
        {
          provider_id: 4,
          time_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          provider_id: 4,
          time_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          provider_id: 4,
          time_id: 5,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          provider_id: 4,
          time_id: 6,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          provider_id: 4,
          time_id: 7,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          provider_id: 4,
          time_id: 8,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          provider_id: 4,
          time_id: 9,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          provider_id: 4,
          time_id: 10,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          provider_id: 4,
          time_id: 11,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
