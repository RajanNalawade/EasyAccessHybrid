window.onload = function () {
    // ready();
}

var db;

function validateMyProfileLoginForm() {
    if (myProfileLoginForm.checkValidity()) {
        createDBAndAddUser();
    }
}

function createDBAndAddUser() {
    //check for support
    if (!('indexedDB' in window)) {
        alert('This browser doesn\'t support IndexedDB');
        return;
    }

    var dbPromise = indexedDB.open('PreLoginProfileDB', 1)
    dbPromise.onupgradeneeded = function (e) {
        var db = e.target.result;
        if (!db.objectStoreNames.contains('PreLoginUsers')) {
            var storeOS = db.createObjectStore('PreLoginUsers', {
                keyPath: 'userName'
            });
        }
    };

    dbPromise.onsuccess = function (e) {
        db = e.target.result;
        savePreLoginUser();
    };
    dbPromise.onerror = function (e) {
        alert(e);
    };
}

function savePreLoginUser() {
    var tx = db.transaction(['PreLoginUsers'], 'readwrite');
    var preLoginUsersObjStore = tx.objectStore('PreLoginUsers');

    var item = {
        userName: getUserName(),
        password: getPassword()
    };

    var addUserRequest = preLoginUsersObjStore.add(item);
    addUserRequest.onerror = function (e) {
        alert('Error', e.target.error.name);
    };
    addUserRequest.onsuccess = function (e) {
        window.location.href = "../MyProfile/MyProfile.html";
    };
}

function getUserName() {
    return document.forms['myProfileLoginForm']['userName'].value;
}

function getPassword() {
    return document.forms['myProfileLoginForm']['password'].value;
}