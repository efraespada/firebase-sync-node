# firebase-sync-node
This node module works with [sync-node](https://github.com/VoidCanvas/sync-node) and allows you to instance your Firebase database as an associative array (synchronously).

### Information
Your database reference will be stored on `ref` var:
```javascript
    var fireSync = ...
    
    // database reference
    console.log(JSON.stringify(fireSync.ref))
```

Call `syncFromDatabase` method every time you want to sync data on Firebase database.

```javascript
    var fireSync = ...
    
    queue.pushJob(function() {
        fireSync.ref.name = "Draco"
    })

    // sync fireSync.ref variable
    fireSync.syncToDatabase()     
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

var path      = "puppies/draco"                         // path to reference
var database  = admin.database()                        // firebase database instance

var fireSync = new FirebaseSyncNode(database, path)     // firebase-sync-node
var queue = fireSync.getQueue()                         // database's queue
fireSync.syncFromDatabase()                             // initial synchronization to create the puppy reference

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

For more documentation about `queue` check out the original node module: [sync-node](https://github.com/VoidCanvas/sync-node)

(mmmm choooocolate :drooling_face:)
