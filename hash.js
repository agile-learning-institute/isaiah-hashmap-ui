class HashMap {
      constructor(loadFactor = 0.75, initialCapacity = 16) {
        this.loadFactor = loadFactor;
        this.capacity = initialCapacity;
        this.size = 0;
        this.buckets = Array.from({ length: this.capacity }, () => []);
      }
      _hash(key) {
        let hash = 0, prime = 31;
        for (let i = 0; i < key.length; i++) {
          hash = (prime * hash + key.charCodeAt(i)) % this.capacity;
        }
        return hash;
      }
      set(key, value) {
        if ((this.size + 1) / this.capacity > this.loadFactor) this._resize();
        const index = this._hash(key);
        if (index < 0 || index >= this.buckets.length) throw new Error("Trying to access index out of bounds");
        const bucket = this.buckets[index];
        for (let item of bucket) {
          if (item[0] === key) {
            item[1] = value;
            return;
          }
        }
        bucket.push([key, value]);
        this.size++;
      }
      get(key) {
        const index = this._hash(key);
        if (index < 0 || index >= this.buckets.length) throw new Error("Trying to access index out of bounds");
        for (let item of this.buckets[index]) {
          if (item[0] === key) return item[1];
        }
        return null;
      }
      has(key) {
        return this.get(key) !== null;
      }
      remove(key) {
        const index = this._hash(key);
        const bucket = this.buckets[index];
        const i = bucket.findIndex(([k]) => k === key);
        if (i !== -1) {
          bucket.splice(i, 1);
          this.size--;
          return true;
        }
        return false;
      }
      length() { return this.size; }
      clear() {
        this.buckets = Array.from({ length: this.capacity }, () => []);
        this.size = 0;
      }
      keys() {
        return this.buckets.flat().map(([k]) => k);
      }
      values() {
        return this.buckets.flat().map(([, v]) => v);
      }
      entries() {
        return this.buckets.flat();
      }
      _resize() {
        const oldBuckets = this.buckets;
        this.capacity *= 2;
        this.buckets = Array.from({ length: this.capacity }, () => []);
        this.size = 0;
        for (let bucket of oldBuckets) {
          for (let [k, v] of bucket) {
            this.set(k, v);
          }
        }
      }
    }

    class HashSet {
      constructor() {
        this.map = new HashMap();
      }
      add(key) { this.map.set(key, true); }
      remove(key) { return this.map.remove(key); }
      has(key) { return this.map.has(key); }
      clear() { this.map.clear(); }
      keys() { return this.map.keys(); }
      length() { return this.map.length(); }
    }

    const map = new HashMap();
    const set = new HashSet();

    function mapSet() { map.set(get('mapKey'), get('mapValue')); output('mapOutput', `Set '${get('mapKey')}'`); }
    function mapGet() { const val = map.get(get('mapKey')); output('mapOutput', val !== null ? `Value: ${val}` : 'Key not found'); }
    function mapRemove() { output('mapOutput', map.remove(get('mapKey')) ? 'Removed' : 'Not found'); }
    function mapClear() { map.clear(); output('mapOutput', 'HashMap cleared'); }
    function mapShowAll() { output('mapOutput', JSON.stringify(map.entries(), null, 2)); }

    function setAdd() { set.add(get('setKey')); output('setOutput', `Added '${get('setKey')}'`); }
    function setRemove() { output('setOutput', set.remove(get('setKey')) ? 'Removed' : 'Not found'); }
    function setHas() { output('setOutput', set.has(get('setKey')) ? 'Exists' : 'Does not exist'); }
    function setClear() { set.clear(); output('setOutput', 'HashSet cleared'); }
    function setShowAll() { output('setOutput', JSON.stringify(set.keys(), null, 2)); }

    function get(id) { return document.getElementById(id).value.trim(); }
    function output(id, text) { document.getElementById(id).textContent = text; }

    function runTests() {
      let results = [];
      let testMap = new HashMap();
      testMap.set("a", "apple");
      results.push(assert(testMap.get("a") === "apple", "HashMap set/get"));
      results.push(assert(testMap.has("a") === true, "HashMap has true"));
      results.push(assert(testMap.remove("a") === true, "HashMap remove"));
      results.push(assert(testMap.get("a") === null, "HashMap get null"));
      results.push(assert(testMap.length() === 0, "HashMap length 0"));

      let testSet = new HashSet();
      testSet.add("alpha");
      results.push(assert(testSet.has("alpha") === true, "HashSet add/has"));
      testSet.remove("alpha");
      results.push(assert(testSet.has("alpha") === false, "HashSet remove"));
      results.push(assert(testSet.length() === 0, "HashSet length 0"));

      document.getElementById("testOutput").innerHTML = results.join("\n");
    }

    function assert(condition, name) {
      return `<div class='test-result${!condition ? ' fail' : ''}'>${condition ? '✔' : '✘'} ${name}</div>`;
    }