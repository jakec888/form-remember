/* Simple Hash Function */
const hash = (string, max) => {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash += string.charCodeAt(i);
  }
  return hash % max;
};

/* Hash Table */
class HashTable {
  constructor(bucketLimit) {
    this.bucketLimit = bucketLimit;
    this.storage = new Array(this.bucketLimit);
  }

  print() {
    console.log(this.storage);
    return this.storage;
  }

  insert(key, value) {
    let index = hash(key, this.bucketLimit);
    if (this.storage[index] === undefined) {
      this.storage[index] = [[key, value]];
    } else {
      let inserted = false;
      for (let i = 0; i < this.storage[index].length; i++) {
        if (this.storage[index][i][0] === key) {
          this.storage[index][i][1] = value;
          inserted = true;
        }
      }
      if (inserted === false) {
        this.storage[index].push([key, value]);
      }
    }
  }

  delete(key) {
    let index = hash(key, this.this.bucketLimit);
    if (this.storage[index].length === 1 && this.storage[index][0][0] === key) {
      delete this.storage[index];
    } else {
      for (let i = 0; i < this.storage[index].length; i++) {
        if (this.storage[index][i][0] === key) {
          delete this.storage[index][i];
        }
      }
    }
  }

  search(key) {
    let index = hash(key, this.bucketLimit);
    if (this.storage[index] === undefined) {
      return undefined;
    } else {
      for (let i = 0; i < this.storage[index].length; i++) {
        if (this.storage[index][i][0] === key) {
          return this.storage[index][i][1];
        }
      }
    }
  }
}

console.log(hash('jake', 24));

let ht = new HashTable(13);

ht.insert('jake', 'person');
ht.insert('fido', 'dog');
ht.insert('rex', 'dinosaur');
ht.insert('tux', 'penguin');

console.log(ht.search('tux'));

ht.print();
