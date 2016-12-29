# firebase-sync-node
Firebase synchronization without blocking the main thread (Node.js)


## Example

```javascript
var admin             = require("firebase-admin")
var FirebaseSyncNode  = require('firebase-sync-node')

var serviceAccount = require("./Draco.json");
var credentials = {
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://draco-puppy.firebaseio.com/",
    databaseAuthVariableOverride: {
        uid: "lalilulelo"
    }
}

admin.initializeApp(credentials)

var path = "groups"
var database = admin.database()

var fireSync = new FirebaseSyncNode(database, path)
this.queue = fireSync.getQueue()
fireSync.syncFromDatabase()
