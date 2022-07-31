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
