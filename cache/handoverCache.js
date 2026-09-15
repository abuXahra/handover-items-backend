const { caching } = require("../config/config");
const { getUserHandoversKey } = require("./keys");
const { setJson, getJson } = require("./query");
const cache = require("./");

// Save user handovers to cache
async function saveUserHandovers(userId, handOvers) {
  const key = getUserHandoversKey(userId);

  return setJson(
    key,
    { data: handOvers },
    Number(caching.contentCacheDuration),
  );
}

// Fetch user handovers from cache
async function fetchUserHandovers(userId) {
  const key = getUserHandoversKey(userId);

  return getJson(key);
}

// Invalidate user handovers cache
async function invalidateUserHandovers(userId) {
  const key = getUserHandoversKey(userId);

  await cache.del(key);
}

module.exports = {
  saveUserHandovers,
  fetchUserHandovers,
  invalidateUserHandovers,
};

// TYPESCRIPT
// const { caching } = require("../config/config");
// const HandOver = require("../model/handover.model");
// const { getUserHandoversKey } = require("./keys");
// const { setJson, getJson } = require("./query");
// const cache = require("./")

// async function saverUserHandovers(userId: string, handOvers: HandOver[]){
//     const key = getUserHandoversKey(userId)
//     return setJson(key, {data:handOvers},  new Date(Date.now() + caching.contentCacheDuration))
// }

// async function fetchUserHandovers(userId: string){
//     const key = getUserHandoversKey(userId);
//     return getJson<HandOver[]>(key);
// }

// async function invalidateUserHandovers(userId: string){
//     const key =  getUserHandoversKey(userId);
//     await cache.del(key);
// }

// module.exports = {saverUserHandovers, fetchUserHandovers};
