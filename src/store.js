const store = {};

store.data = {};

store.persist = function() {
  localStorage.setItem('gm', JSON.stringify(store.data));
};

store.load = function(defaultData) {
  const res = localStorage.getItem('gm');

  if (res == null || res === 'null') {
      store.data = defaultData;
      store.persist();

      return false;
  } else {
      store.data = JSON.parse(res);

      return true;
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