const fs = require("fs");
const Chance = require("chance");
const chance = new Chance();

const fileName = "user_data.json";
const filePath = `./${fileName}`;
const dataRange = 1000;
const data = [];

function generateId(index) {
  const prefix = "U-A";
  const idIndex = (index + 1).toString().padStart(4, "0");
  const id = `${prefix}${idIndex}`;
  return id;
}

function generateGuid() {
  const guid = chance.guid();
  return guid;
}

function generateGender() {
  const gender = chance.gender();
  return gender;
}

function generateName(gender) {
  const name = chance.name({ gender });
  return name;
}

function generateAge() {
  const age = chance.age();
  return age;
}

// const cities = [
//   "Mumbai",
//   "Delhi",
//   "Bangalore",
//   "Kolkata",
//   "Chennai",
//   "Hyderabad",
//   "Ahmedabad",
//   "Pune",
//   "Surat",
//   "Jaipur",
//   "Lucknow",
//   "Kanpur",
//   "Nagpur",
//   "Indore",
//   "Patna",
// ];

// function generateCity() {
//   const randomIndex = Math.floor(Math.random() * cities.length);
//   return cities[randomIndex];
// }

const cities = [
  { city: "Mumbai", priority: 10, state: "Maharashtra" },
  { city: "Delhi", priority: 10, state: "Delhi" }, // Delhi is both a city and a state
  { city: "Kolkata", priority: 10, state: "West Bengal" },
  { city: "Bangalore", priority: 9, state: "Karnataka" },
  { city: "Chennai", priority: 8, state: "Tamil Nadu" },
  { city: "Hyderabad", priority: 7, state: "Telangana" },
  { city: "Ahmedabad", priority: 7, state: "Gujarat" },
  { city: "Pune", priority: 6, state: "Maharashtra" },
  { city: "Surat", priority: 6, state: "Gujarat" },
  { city: "Jaipur", priority: 5, state: "Rajasthan" },
  { city: "Lucknow", priority: 5, state: "Uttar Pradesh" },
  { city: "Kanpur", priority: 4, state: "Uttar Pradesh" },
  { city: "Nagpur", priority: 4, state: "Maharashtra" },
  { city: "Indore", priority: 4, state: "Madhya Pradesh" },
  { city: "Patna", priority: 3, state: "Bihar" },
  { city: "Unknown", priority: 2, state: "Unknown" },
];

function generatCityState(weightMultiplier = 2) {
  // Calculate total weighted priority
  const totalWeightedPriority = cities.reduce(
    (acc, city) => acc + city.priority * weightMultiplier,
    0
  );
  // Generate a random weight between 0 and total weighted priority
  const randomWeight = Math.random() * totalWeightedPriority;
  // Loop through cities and accumulate weighted priority
  let accumulatedWeightedPriority = 0;
  for (const city of cities) {
    accumulatedWeightedPriority += city.priority * weightMultiplier;
    if (accumulatedWeightedPriority >= randomWeight) {
      return city;
    }
  }
  // If loop completes (unlikely), return the last city (lowest priority)
  return cities[cities.length - 1];
}
const occupationStatusList = [
  "Student",
  "Dropout",
  "Working",
  "Jobless",
  "Retired",
];

function generatOccupationStatus(age) {
  const randomChance = Math.random() * 10;
  let occupationStatus = "";
  let type = "";
  if (age <= 23) {
    if (randomChance < 1) {
      occupationStatus = "Dropout";
      type = "A-1";
    } else {
      occupationStatus = "Student";
      type = "A-2";
    }
  } else if (age >= 60) {
    if (randomChance < 2) {
      occupationStatus = "Dropout";
      type = "B-1";
    }
    if (randomChance >= 2 && randomChance <= 4) {
      occupationStatus = "Jobless";
      type = "B-2";
    } else {
      occupationStatus = "Retired";
      type = "B-3";
    }
  } else if (age >= 23 && age <= 25) {
    if (randomChance < 2) {
      occupationStatus = "Jobless";
      type = "D-1";
    }
    if (randomChance >= 2 && randomChance <= 4) {
      occupationStatus = "Student";
      type = "D-2";
    } else {
      occupationStatus = "Working";
      type = "D-3";
    }
  } else {
    if (randomChance < 2) {
      occupationStatus = "Jobless";
      type = "E-1";
    } else {
      occupationStatus = "Working";
      type = "E-2";
    }
  }
  //   console.log(chance, age, type, occupationStatus);
  return occupationStatus;
}

function generateOccupation(age, occupationStatus) {
  const randomChance = Math.random() * 10;
  let occupation = "";
  if (occupationStatus === "Student") {
    if (age < 19) {
      occupation = "School Student";
    } else if (age >= 19) {
      occupation = "College Student";
    }
  } else if (occupationStatus === "Dropout") {
    if (randomChance > 8) {
      occupation = "Farmer";
    } else {
      occupation = "NA";
    }
  } else if (occupationStatus === "Jobless") {
    if (randomChance > 3) {
      occupation = "Farmer";
    } else {
      occupation = "NA";
    }
  } else {
    occupation = chance.profession();
  }
  //   console.log(occupationStatus, occupation, age)
  return occupation;
}

for (let i = 0; i < dataRange; i++) {
  const id = generateId(i);
  const guid = generateGuid();
  const gender = generateGender();
  const name = generateName(gender);
  const age = generateAge();
  const generatedCityState = generatCityState();
  const city = generatedCityState.city;
  const state = generatedCityState.state;
  const country = "India";
  const occupationStatus = generatOccupationStatus(age);
  const occupation = generateOccupation(age, occupationStatus);
  data.push({
    id,
    guid,
    name,
    gender,
    age,
    city,
    state,
    country,
    occupationStatus,
    occupation,
  });
}

// console.log(data);

const jsonData = JSON.stringify(data, null, 4);

fs.writeFile(filePath, jsonData, (err) => {
  if (err) throw err;
  console.log("Data generated and saved to user_data.json");
});
