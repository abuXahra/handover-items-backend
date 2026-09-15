const cache = require("./index");

async function setJson(key, value, ttlMillis = null) {
  const json = JSON.stringify(value);

  if (ttlMillis !== null) {
    const ttl = Number(ttlMillis);

    if (!Number.isInteger(ttl) || ttl <= 0) {
      throw new Error("Invalid Redis cache TTL");
    }

    return cache.set(key, json, {
      PX: ttl,
    });
  }

  return cache.set(key, json);
}

async function getJson(key) {
  const type = await cache.type(key);

  if (type !== "string") {
    return null;
  }

  const json = await cache.get(key);

  if (json) {
    return JSON.parse(json);
  }

  return null;
}

module.exports = {
  setJson,
  getJson,
};

// const cache = require("./index");

// async function setJson(key, value, expireAt = null) {
//   const json = JSON.stringify(value);

//   if (expireAt) {
//     const ttlMillis = expireAt.getTime() - Date.now();

//     return cache.set(key, json, {
//       PX: ttlMillis,
//     });
//   }

//   return cache.set(key, json);
// }

// async function getJson(key) {
//   const type = await cache.type(key);

//   if (type !== "string") {
//     return null;
//   }

//   const json = await cache.get(key);

//   if (json) {
//     return JSON.parse(json);
//   }

//   return null;
// }

// module.exports = {
//   setJson,
//   getJson,
// };

// TYPE SCRIPT VERSION

// const cache = require("./index");

// async function setJson(key: string, value: Record<string, unknown>, expireAt: Date | null = null){
//   const json = JSON.stringify(value);
//   if (expireAt) {
//     const ttlMillis = expireAt?.getTime() - Date.now();
//     return cache.set(key, json, { PX: ttlMillis });
//   } else {
//     return cache.set(key, json);
//   }
// }

// async function getJson<T>(key: string) {
//     const type = await cache.type(key);
//     if(type !== 'string') return null;

//     const json = await cache.get(key)
//     if(json) return JSON.parse(json) as T;

//     return null
// }

// module.exports = {
//   setJson,
//   getJson,
// };

// // for typescript"
// // async function setJson(key: string, value: Record<string, unknown>, expireAt: Date | null = null) {}
