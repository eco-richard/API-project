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
   await queryInterface.bulkInsert('Spots', [
    {
      ownerId: 3,
      address: "51 Open Sea Drive",
      city: "Nantucket",
      state: "Massachusetts",
      country: "United States",
      lat: 123.1467,
      lng: 321.5124,
      name: "Pequod Dock",
      description: "Dock your whaling ship 'ere!",
      price: 15.00
    },
    {
      ownerId: 2,
      address: "10 Old Mill Road",
      city: "Salem",
      state: "Massachusetts",
      country: "United States",
      lat: 100.1467,
      lng: 321.5124,
      name: "House of the Seven Gables",
      description: "Old not mysterious and strange house",
      price: 40.00
    },
    {
      ownerId: 1,
      address: "1 Santo Road",
      city: "Montilla",
      state: "Cordoba",
      country: "Spain",
      lat: -123.1467,
      lng: 40.5124,
      name: "Prison Castle",
      description: "Interesting location to spend eternity",
      price: 100.00
    }
   ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Spots', null, {});
  }
};
