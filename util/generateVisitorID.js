function generateVisitorId() {
  const id = Math.floor(Math.random() * 1000);
  console.log(id);
  return id;
}

module.exports = generateVisitorId;
