'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Bookings', [
    {
      spotId: 1,
      userId: 2,
      startDate: "1851-10-15",
      endDate: "1851-10-17"
    },
    {
      spotId: 2,
      userId: 3,
      startDate: "1850-11-15",
      endDate: "1850-11-17"
    },
    {
      spotId: 3,
      userId: 1,
      startDate: "1860-10-15",
      endDate: "1860-10-17"
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Bookings', null, {});
  }
};
