// create language array

const codingLanguages = ["HTML", "CSS", "JavaScript"];
const length = codingLanguages.length;
console.log(length)

//generate sentence
let sentence = "This page was built using ";

let i = 1
for (item of codingLanguages) {
    if (i == length) {
        console.log(i);
        sentence += ` ${item}.`
    } else if (i == length-1) {
        sentence += `${item} and`
    } else if (i <= length) {
        sentence += `${item}, `
    }
    i++;

}

// set HTML content to sentence
document.getElementById("language-array-sentence").innerHTML = sentence