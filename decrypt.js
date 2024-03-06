var fs = require("fs");
var path = require("path");
var encryptor = require("file-encryptor");
var readline = require("readline");

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

var superKey = "olaso";
var paymentAmount = 100; 

rl.question("Enter super key: ", function (inputKey) {
  if (inputKey !== superKey) {
    console.log("Invalid super key. Exiting...");
    rl.close();
    return;
  }

  rl.question("Enter payment amount (P100 required): ", function (payment) {
    if (parseInt(payment) !== paymentAmount) {
      console.log(
        "Incorrect payment amount. Payment required: P100. Exiting..."
      );
      rl.close();
      return;
    }

   
    var key = "My Super Secret Key";
    var folderPath = "./Cars"; 

   
    fs.readdir(folderPath, function (err, files) {
      if (err) {
        console.error("Error reading folder:", err);
        rl.close();
        return;
      }

     
      files.forEach(function (file) {
        var filePath = path.join(folderPath, file);
        var decryptedFilePath = filePath.replace(".encrypted", ""); 

       
        encryptor.decryptFile(filePath, decryptedFilePath, key, function (err) {
          if (err) {
            console.error("Decryption error for file:", filePath, err);
          } else {
            console.log("Decryption complete for file:", filePath);
           
            fs.unlink(filePath, function (err) {
              if (err) {
                console.error("Error deleting file:", err);
              } else {
                console.log("Encrypted file deleted:", filePath);
              }
            });
          }
        });
      });
      rl.close();
    });
  });
});
