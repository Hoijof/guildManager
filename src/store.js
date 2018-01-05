const store = {};

store.data = {};

store.persist = function() {
  localStorage.setItem('gm', JSON.stringify(store.data));
};

store.load = function(defaultData) {
  const res = JSON.parse(localStorage.getItem('gm'));

  if (res == null) {
      store.data = defaultData;
      store.persist();
  } else {
      store.data = res;
  }
};

store.export = function() {
  console.log(btoa(JSON.stringify(store.data)));
};

store.import = function(data) {
    store.data = JSON.parse(atob(data));

    store.persist();
};

export default store;