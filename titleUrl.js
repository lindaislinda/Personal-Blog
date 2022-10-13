<<<<<<< HEAD
exports.getTitleUrl = function(title){
  let titleUrl = "/"
  for (const character of title) {
    if (character === " ") {
      titleUrl += "%20"
    } else {
      titleUrl += character
    }
  }
  return titleUrl
}
=======
exports.getTitleUrl = function(title){
  let titleUrl = "/"
  for (const character of title) {
    if (character === " ") {
      titleUrl += "%20"
    } else {
      titleUrl += character
    }
  }
  console.log(titleUrl)
  return titleUrl
}
>>>>>>> 376deb532d363fedfd90605523facb5ce00f57a8
