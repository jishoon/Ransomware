var fs = require("fs");
var path = require("path");
var encryptor = require("file-encryptor");

var key = "My Super Secret Key";
var folderPath = "./Cars"; 

fs.readdir(folderPath, function (err, files) {
  if (err) {
    console.error("Error reading folder:", err);
    return;
  }

  
  files.forEach(function (file) {
    var filePath = path.join(folderPath, file);

    
    encryptor.encryptFile(
      filePath,
      filePath + ".encrypted",
      key,
      function (err) {
        if (err) {
          console.error("Encryption error for file:", filePath, err);
        } else {
          console.log("Encryption complete for file:", filePath);
          
          fs.unlink(filePath, function (err) {
            if (err) {
              console.error("Error deleting file:", err);
            } else {
              console.log("Original file deleted:", filePath);
            }
          });
        }
      }
    );
  });
});
