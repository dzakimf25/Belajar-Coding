let passwordLength = document.getElementById("passwordLength"); // Input for length
let Password = document.getElementById("Password"); // Input to display generated password
let saveButton = document.getElementById ("saveButton")


// Function to generate a password of length `len`
const generatePassword = (len) => {
    const lowerAlphabet = "abcdefghijklmnopqrstuvwxyz";
    const upperAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Uppercase letters
    const numeric = "0123456789";
    const symbol = "!@#$%^&*()_+{}|:<.,?>";

    const data = lowerAlphabet + upperAlphabet + numeric + symbol;
    let generator = "";

    // Generate a random password based on the provided length
    for (let index = 0; index < len; index++) {
        generator += data[Math.floor(Math.random() * data.length)];
    }

    return generator;
}

// Function to handle password generation when the button is clicked
const getPassword = () => {
    const newPassword = generatePassword(passwordLength.value); // Use passwordLength.value to determine length
    Password.value = newPassword; // Set the generated password to the Password field
}

// Function to save password (you can implement your saving logic here)
const savePassword = () => {
    document.title = Password.value
    saveButton.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(`password saya: ${document.title}`))
    saveButton.setAttribute('download', 'MyPasswordGeneratorLOG.txt')
    setTimeout(() =>{
    alert ("berhasil disimpan")
   }, 1000)
}

