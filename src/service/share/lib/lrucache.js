//lru-cache
function setOptions() {
    const options = {
        max: 500,
        // for use with tracking overall storage size
        maxSize: 5000,
        sizeCalculation: (value, key) => {
          return 1
        },
        // for use when you need to clean up something when objects
        // are evicted from the cache
        dispose: (value, key) => {
          freeFromMemoryOrWhatever(value)
        },
        // how long to live in ms
        ttl: 1000 * 60 * 5,
        // return stale items before removing from cache?
        allowStale: false,
        updateAgeOnGet: false,
        updateAgeOnHas: false,
        // async method to use for cache.fetch(), for
        // stale-while-revalidate type of behavior
        fetchMethod: async (key, staleValue, { options, signal }) => {}
    }
    return options;
}
  
exports.setCache = async (key,data) => {
    cache.set(key, data);
};

exports.getCache = async (key) => {
    return cache.get(key);
};

exports.clearCache = async (key) => {
    cache.clear();
};



