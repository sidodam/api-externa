const yargs = require("yargs");
const { ReservationsManager } = require("./reservationManager");

const manager = new ReservationsManager();

yargs.command({
  command: "add <name> <date>",
  aliases: "a",
  describe: "add new reservation",
  handler: (argv) => {
    manager.addReservation(argv.name, argv.date);
  },
});

yargs.parse();
