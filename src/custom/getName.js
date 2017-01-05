function getName(element) {
  return element.dict && element.dict.name || element.name && element.name();
}