'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = "SpotImages";

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
   await queryInterface.bulkInsert(options, [
    {
      spotId: 1,
      url: "https://img.marinas.com/v2/736efe1b4c0ce7a2d939345ab20911ff03ad7237d569ae11cd72c605c7eaa0b9.jpg",
      preview: true
    },
    {
      spotId: 1,
      url: "https://live.staticflickr.com/2870/10001508933_21d057d397_b.jpg",
      preview: false
    },
    {
      spotId: 1,
      url: "https://live.staticflickr.com/2870/10001508933_21d057d397_b.jpg",
      preview: false
    },
    {
      spotId: 1,
      url: "https://live.staticflickr.com/2870/10001508933_21d057d397_b.jpg",
      preview: false
    },
    {
      spotId: 1,
      url: "https://live.staticflickr.com/2870/10001508933_21d057d397_b.jpg",
      preview: false
    },
    {
      spotId: 2,
      url: "https://imgs.search.brave.com/TBUtEPt2Q8dSHvqJtBWKyG1UXj_RSKA8vrJOY6enIsw/rs:fit:1200:1152:1/g:ce/aHR0cHM6Ly93d3cu/cHJpY2V5cGFkcy5j/b20vd3AtY29udGVu/dC91cGxvYWRzLzIw/MjAvMTEvSG91c2Vf/b2ZfdGhlX1NldmVu/X0dhYmxlc19mcm9u/dF9hbmdsZV8tX1Nh/bGVtX01hc3NhY2h1/c2V0dHMtMTUzNngx/MTUyLmpwZw",
      preview: true
    },
    {
      spotId: 3,
      url: "https://imgs.search.brave.com/OYnosvmaYk9toKF3d9ERkC6DWZvxvdm2fOstrrfW71w/rs:fit:1200:836:1/g:ce/aHR0cHM6Ly93d3cu/aG9tZXN0cmF0b3Nw/aGVyZS5jb20vd3At/Y29udGVudC91cGxv/YWRzLzIwMTgvMDcv/TWFuemFuYXJlcy1l/bC1SZWFsLUNhc3Rs/ZS5qcGc",
      preview: true
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(options, null, {});
  }
};
