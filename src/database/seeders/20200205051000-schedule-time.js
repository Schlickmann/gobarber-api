module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'schedule',
      [
        {
          time: '08:00',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          time: '09:00',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          time: '10:00',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          time: '11:00',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          time: '12:00',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          time: '13:00',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          time: '14:00',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          time: '15:00',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          time: '16:00',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          time: '17:00',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          time: '18:00',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          time: '19:00',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          time: '20:00',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
