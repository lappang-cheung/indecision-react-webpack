var nameVar = 'Andrew';
console.log('nameVar', nameVar);

let nameLet = 'Jen';
nameLet = 'Julie';
console.log('nameLet', nameLet);

const nameConst = 'Frank';
// nameConst = 'Leo';
console.log('nameConst', nameConst);

// function getPetName(){
//   const petName = 'Hal';
//   return petName;
// }

// const petName = getPetName();
// console.log(petName);

var fullName = 'Leo Cheung';

if (fullName){
  var firstName = fullName.split(' ')[0];
  console.log(firstName);
}