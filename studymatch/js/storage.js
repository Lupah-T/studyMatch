const Storage = {
  prefix:'studymatch_',
  get(key, fallback=[]){try{const v=localStorage.getItem(this.prefix+key);return v?JSON.parse(v):fallback}catch(e){console.error('Storage read failed',key,e);return fallback}},
  set(key,value){try{localStorage.setItem(this.prefix+key,JSON.stringify(value));return true}catch(e){console.error('Storage write failed',key,e);return false}},
  remove(key){localStorage.removeItem(this.prefix+key)},
  uid(prefix='id'){return prefix+'-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,8)},
  reset(){Object.keys(localStorage).filter(k=>k.startsWith(this.prefix)).forEach(k=>localStorage.removeItem(k));SeedData.initialize(true)}
};
