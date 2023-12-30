class LocalStorage{
    set(key,data) {
        window.localStorage.setItem(key, data);
    }

    get(key) {
        return window.localStorage.getItem(key);
    }

    delete(key) {
        window.localStorage.removeItem(key);
    }
}

export default LocalStorage;