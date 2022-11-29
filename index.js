// mengambil argument dari command line

const yargs = require("yargs");
const {
  simpanContact,
  listContact,
  detailContact,
  deleteContact,
} = require("./contacts");

yargs
  .command({
    command: "add",
    describe: "Menambahkan contact baru",
    builder: {
      nama: {
        describe: "Nama Lengkap",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "Email Address",
        demandOption: false,
        type: "string",
      },
      noHp: {
        describe: "No Hp",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      simpanContact(argv.nama, argv.email, argv.noHp);
    },
  })
  .demandCommand();

yargs.command({
  command: "list",
  describe: "Menampilkan semua contact",
  handler() {
    listContact();
  },
});

// menampilkan detail contact
yargs.command({
  command: "detail",
  describe: "Menampilkan detail contact",
  builder: {
    nama: {
      describe: "Nama Lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    detailContact(argv.nama);
  },
});

yargs.command({
  command: "delete",
  describe: "Delete Contact Berdasarkan Nama",
  builder: {
    nama: {
      describe: "Nama Lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    deleteContact(argv.nama);
  },
});

yargs.parse();

// const { question, simpanContact } = require("./contacts");

// const main = async () => {
//   const nama = await question("Masukan Nama Anda : ");
//   const email = await question("Masukan email Anda: ");
//   const noHp = await question("Masukan No Hp Anda: ");

//   simpanContact(nama, email, noHp);
// };

// main();
