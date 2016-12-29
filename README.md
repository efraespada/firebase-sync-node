# firebase-sync-node
This node module works with [sync-node](https://github.com/VoidCanvas/sync-node) and allows you to instance your Firebase database as an associative array (synchronously).

```
$ npm install firebase-sync-node
```

### Information
Quick setup:
```javascript
var path      = "some/path/to/reference"                // path to reference
var database  = admin.database()                        // firebase database instance

var fireSync = new FirebaseSyncNode(database, path)     // firebase-sync-node
var queue = fireSync.getQueue()                         // database's queue 
fireSync.syncFromDatabase()                             // initial synchronization to create the reference
```
Once you have set it up, your database reference will be stored on `ref` var:
```javascript
// print database reference
queue.pushJob(function() {
    console.log(JSON.stringify(fireSync.ref))
})
```
Of course you can modify that reference:
```javascript
queue.pushJob(function() {
    fireSync.ref["some_random_prop"] = "2b or not 2b"
})
```

Call `syncToDatabase` method every time you want to sync data on Firebase.

```javascript
queue.pushJob(function() {
    fireSync.ref.name = "Draco"
})

// sync fireSync.ref variable
fireSync.syncToDatabase()     
```
Maybe you'll need some fresh data from database, so call the initial method `syncFromDatabase` to stay up to date from Firebase db:

```javascript
queue.pushJob(function() {
    fireSync.ref.name = "Draco"
})

fireSync.syncFromDatabase()

queue.pushJob(function() {
    console.log("name: " + fireSync.ref.name)   // name: John
})
```
## Example

```javascript
var admin             = require("firebase-admin")
var FirebaseSyncNode  = require('firebase-sync-node')

// firebase (SDK 3.x)
var serviceAccount = require("./some_firebase_credentials.json");
var credentials = {
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://some_random_db.firebaseio.com/",
    databaseAuthVariableOverride: {
        uid: "lalilulelo"
    }
}

admin.initializeApp(credentials)

// let's instance a puppy from database

var path        = "puppies/draco"                         // path to reference
var database    = admin.database()                        // firebase database instance

var fireSync    = new FirebaseSyncNode(database, path)     // firebase-sync-node
var queue       = fireSync.getQueue()                      // database's queue

fireSync.syncFromDatabase()                                // initial synchronization to create the puppy reference

// add some properties to database
queue.pushJob(function() {
    fireSync.ref.color = "chocolate"
})

// let's save new data
fireSync.syncToDatabase()                               // draco is chocolate

queue.pushJob(function() {
    fireSync.ref.color = "white"
})

// let's save data again
fireSync.syncToDatabase()                               // now draco is white!
```

For more documentation about `queue` check out the original node module by [@metalshan](https://github.com/metalshan): [sync-node](https://github.com/VoidCanvas/sync-node)

(mmmm choooocolate :drooling_face:)
