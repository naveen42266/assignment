
// problem 1

let arr = [1, 2, 5, 10, 20]
let total = 0
for (let i = 0; i <= arr.length - 1; i++) {
    total = total + arr[i]
}
console.log(total, "total")


// problem 2

let string = "Hello World";
let ans = string?.split("")
ans = ans.reverse()?.join('')
console.log(ans, "ans")

//problem 3

let people = [
    { name: 'Jone', age: 25 },
    { name: 'Avis', age: 27 },
    { name: 'Bala', age: 25 },
    { name: 'Abdul', age: 27 },
]
let num = 0
let data = people?.map((each) => each.age)

console.log(data, "datas")
console.log(people?.map((each) => each.age), "age>>")


for (let i = 0; i <= data?.length - 1; i++) {
    if (data[i] == data[i + 1]) {
        debugger
        data.splice(i+1,1)
    }
}


console.log(data, "datas")
console.log(people?.map((each) => each.age), "age>>")


for (let i = 0; i <= data?.length - 1; i++) {
  for (let j = 0; j <= data?.length - i; j++) {
    if (data[i] == data[j+1]) {
        data.splice(i+1,1)
    }
  }
}


// for(let i = 0 ; i<= people?.length-1 ; i++){
//     for(let j = 0 ; j<= people?.length - i ; j++){
//         if(people[i]<people[j+1]){

//         }
//     }
// }


// problem 4

let totalAr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]







