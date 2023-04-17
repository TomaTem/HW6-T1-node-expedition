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
  let result;
  for (key in crewObj) {
    if (
      crewObj[key]["Должность"] == "Капитан" &&
      Number(crewObj[key]["Стаж"]) > experience
    ) {
      experience = Number(crewObj[key]["Стаж"]);
      result =
        crewObj[key]["Имя"] +
        ", " +
        crewObj[key]["пол (м/ж)"] +
        ", " +
        crewObj[key]["Должность"] +
        ", " +
        crewObj[key]["Стаж"];
    }
  }
  return result;
}

//позволяет выбрать самого опытного врача среди женщин
function getRightDoc() {
  let experience = 0;
  let result;
  for (key in crewObj) {
    if (
      crewObj[key]["Должность"] == "Врач" &&
      crewObj[key]["пол (м/ж)"] == "ж" &&
      Number(crewObj[key]["Стаж"]) > experience
    ) {
      experience = Number(crewObj[key]["Стаж"]);
      result =
        crewObj[key]["Имя"] +
        ", " +
        crewObj[key]["пол (м/ж)"] +
        ", " +
        crewObj[key]["Должность"] +
        ", " +
        crewObj[key]["Стаж"];
    }
  }
  return result;
}

//позволяет выбрать всех бортмехаников
function getAllEngineer() {
  let result = [];
  for (key in crewObj) {
    if (crewObj[key]["Должность"] == "Бортмеханик") {
      result.push(
        crewObj[key]["Имя"] +
          ", " +
          crewObj[key]["пол (м/ж)"] +
          ", " +
          crewObj[key]["Должность"] +
          ", " +
          crewObj[key]["Стаж"]
      );
    }
  }
  return result;
}

//Позволяет отобрать все марсоходы
function getAllRover() {
  let result = [];
  for (key in equipmentObj) {
    if (equipmentObj[key]["Тип оборудования"] == "марсоход") {
      result.push(
        equipmentObj[key]["Название оборудования"] +
          ", " +
          equipmentObj[key]["Тип оборудования"] +
          ", " +
          equipmentObj[key]["Предполагаемый срок службы (в годах)"]
      );
    }
  }
  return result;
}

//позволяет выбрать только те марсоходы, которые смогут прослужить больше 3 лет
function getRightRovers() {
  let result = [];
  for (key in equipmentObj) {
    if (
      equipmentObj[key]["Тип оборудования"] == "марсоход" &&
      Number(equipmentObj[key]["Предполагаемый срок службы (в годах)"]) > 3
    ) {
      result.push(
        equipmentObj[key]["Название оборудования"] +
          ", " +
          equipmentObj[key]["Тип оборудования"] +
          ", " +
          equipmentObj[key]["Предполагаемый срок службы (в годах)"]
      );
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
      result =
        rocketsObj[key]["Название ракеты"] +
        ", " +
        rocketsObj[key]["тип ракеты"] +
        ", " +
        rocketsObj[key]["дальность полета (тыс. км.)"];
    }
  }
  return result;
}

module.exports = {
  getRightCaptain,
  getAllEngineer,
  getRightDoc,
  getAllRover,
  getRightRovers,
  getRightRocket,
};
