const fs = require("fs");
//получаем массив из файла
const getArrFromFile = (url) =>
  fs
    .readFileSync(url, "utf8")
    .split("\n")
    .map((str) => str.split(",").map((str) => str.trim()));

//получаем объект из массивва
function getObject(arr) {
  let mainObj = {};
  for (let i = 1; i < arr.length; i++) {
    arr[i].reduce((target, key, j) => {
      target[arr[0][j]] = key;
      return (mainObj[i] = target);
    }, {});
  }
  return mainObj;
}

const crew = getArrFromFile("src/crew.txt");
const crewObj = getObject(crew);
const equipment = getArrFromFile("src/equipment.txt");
const equipmentObj = getObject(equipment);
const rockets = getArrFromFile("src/rockets.txt");
const rocketsObj = getObject(rockets);

//позволяет выбрать самого опытного капитана
function getRightCaptain() {
  let experience = 0;
  let result = {};
  for (key in crewObj) {
    if (
      crewObj[key]["Должность"] == "Капитан" &&
      Number(crewObj[key]["Стаж"]) > experience
    ) {
      experience = Number(crewObj[key]["Стаж"]);
      result = crewObj[key];
    }
  }
  return result;
}

//позволяет выбрать самого опытного бортмеханика среди женщин
function getRightEngineer() {
  let experience = 0;
  let result = {};
  for (key in crewObj) {
    if (
      crewObj[key]["Должность"] == "Бортмеханик" &&
      crewObj[key]["пол (м/ж)"] == "ж" &&
      Number(crewObj[key]["Стаж"]) > experience
    ) {
      experience = Number(crewObj[key]["Стаж"]);
      result = crewObj[key];
    }
  }
  return result;
}

//позволяет выбрать всех врачей с опытом работы больше 5 лет
function getRightDoc() {
  let result = [];
  for (key in crewObj) {
    if (
      crewObj[key]["Должность"] == "Врач" &&
      Number(crewObj[key]["Стаж"]) > 5
    ) {
      result.push(crewObj[key]);
    }
  }
  return result;
}

//Позволяет отобрать все луноходы
function getAllRover() {
  let result = [];
  for (key in equipmentObj) {
    if (equipmentObj[key]["Тип оборудования"] == "луноход") {
      result.push(equipmentObj[key]);
    }
  }
  return result;
}

//позволяет выбрать только те луноходы, которые смогут прослужить больше 7 лет
function getRightRovers() {
  let result = [];
  for (key in equipmentObj) {
    if (
      equipmentObj[key]["Тип оборудования"] == "луноход" &&
      Number(equipmentObj[key]["Предполагаемый срок службы (в годах)"]) > 7
    ) {
      result.push(equipmentObj[key]);
    }
  }
  return result;
}

// позволяет отобрать все межзвездные ракеты
function getInterstellarRockets() {
  let result = [];
  for (key in rocketsObj) {
    if (rocketsObj[key]["тип ракеты"] == "межзвездная") {
      result.push(rocketsObj[key]);
    }
  }
  return result;
}

//позволяет выбрать ракету с максимальной дальностью полёта
function getRightRocket() {
  let range = 0;
  let result;
  for (key in rocketsObj) {
    if (Number(rocketsObj[key]["дальность полета (тыс. км.)"]) > range) {
      range = Number(rocketsObj[key]["дальность полета (тыс. км.)"]);
      result = rocketsObj[key];
    }
  }
  return result;
}

module.exports = {
  getRightCaptain,
  getRightEngineer,
  getRightDoc,
  getAllRover,
  getRightRovers,
  getInterstellarRockets,
  getRightRocket,
};
