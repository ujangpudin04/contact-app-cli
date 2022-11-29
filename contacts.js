const fs = require("fs");
const dirPath = "./data";
const chalk = require("chalk");
const validator = require("validator");

if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

const loadContact = () => {
  const fileBuffer = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(fileBuffer);
  return contacts;
};

const simpanContact = (nama, email, noHp) => {
  const contact = { nama, email, noHp };
  // const fileBuffer = fs.readFileSync("data/contacts.json", "utf-8");
  // const contacts = JSON.parse(fileBuffer);

  const contacts = loadContact();

  // cek duplikat
  const duplikat = contacts.find((contact) => contact.nama === nama);

  if (duplikat) {
    console.log(
      chalk.red.inverse.bold("Contact Sudah Terdaftar Gunakan Nama Lain")
    );
    return false;
  }

  // cek email
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(chalk.red.inverse.bold("Format Email Salah"));
      return false;
    }
  }

  if (!validator.isMobilePhone(noHp, "id-ID")) {
    console.log(chalk.red.inverse.bold("Format Hp Salah"));
    return false;
  }

  contacts.push(contact);

  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));

  console.log(chalk.green.inverse.bold("Terimakasih sudah memasukan data"));
};

const listContact = () => {
  const contacts = loadContact();
  console.log(chalk.inverse.greenBright("Daftar Kontak"));
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}.${contact.nama}-${contact.noHp}`);
  });
};

const detailContact = (nama) => {
  const contacts = loadContact();
  const contact = contacts.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  );

  if (!contact) {
    console.log(chalk.inverse.red.bold(`${nama} Tidak Ditemukan`));
    return false;
  }

  console.log(chalk.inverse.cyanBright.bold(contact.nama));
  console.log(chalk.inverse.cyanBright.bold(contact.noHp));
  if (contact.email) {
    console.log(chalk.inverse.cyanBright.bold(contact.email));
  }
};

const deleteContact = (nama) => {
  const contacts = loadContact();
  contacts.splice;
};

module.exports = { simpanContact, listContact, detailContact, deleteContact };
