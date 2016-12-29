
var SN = require('sync-node')

function FirebaseSyncNode(database, path) {
    var debug = false
    const TAG = "* FireSync "

    var object = this
    this.queue = SN.createQueue()

    this.reference = database.ref(path)

    this.ref = {}

    this.synchronizingToDatabase = false    // sync data towards firebase db
    this.synchronizingFromDatabase = false  // sync data  from   firabse db

    this.syncToDatabase = function() {
        this.queue.pushJob(function(){
            return new Promise(function (resolve, reject) {
                object.synchronizingToDatabase = true
                try {
                    object.reference.update(object.ref).then(function() {
                        object.synchronizingToDatabase = false
                        resolve()
                    })
                } catch(e) {
                    object.reference.set(object.ref).then(function() {
                        object.synchronizingToDatabase = false
                        resolve()
                    })
                }

                if (debug) console.info(TAG + " to: " + JSON.stringify(object.ref))
            })
        });
    }

    this.syncFromDatabase = function() {
        this.queue.pushJob(function(){
            return new Promise(function (resolve, reject) {
                object.synchronizingFromDatabase = true
                object.reference.once('value', function(snapshot) {
                    object.ref = snapshot.val()
                    object.synchronizingFromDatabase = false
                    if (debug) console.info(TAG + " from: " + JSON.stringify(object.ref))
                    resolve();
                })
            })
        });
    }

    this.getQueue = function() {
        return this.queue
    }

    this.isSynchonizing = function() {
        return this.synchronizingToDatabase || this.synchronizingFromDatabase
    }

    this.exist = function() {
        return !(this.ref == null || this.ref == undefined)
    }

}

module.exports = FirebaseSyncNode
