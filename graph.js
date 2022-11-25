const fs = require('fs');
const readline = require('readline');
const prompt = require("prompt-sync")({ sigint: true });


function getFriends(data, userId, mainUserId) {
    let key = []
    let control = null
    data.forEach((friendship) => {
        var splited = friendship.split('\t')
        const index = splited.findIndex(key => key == userId)
        if (index != -1) {
            control = true
            if (mainUserId != userId){
                if (splited[1-index] != mainUserId && !Graph.get(mainUserId).includes(splited[1-index]))
                    key.push(splited[1-index])
            }
            else
                key.push(splited[1-index])   
        }   
    })
    if (!control)  
        return -1
    if (!key) 
        return 0
    Graph.set(userId,key)
    return key
}


function main(file_name,userId) {
    var file = `./${file_name}`;
    var r = readline.createInterface({
        input : fs.createReadStream(file)
    });
    var data = fs.readFileSync(file_name, 'utf8').split('\n');
    let frequency = {}
    //Inputun arkadasliklari
    let friends = getFriends(data,userId, userId)

    if (friends == 0) {
        console.log("There is no friend to suggest")
        return 
    }
    if (friends == -1) {
        console.log("There is no such user")
        return 
    }
        

    Graph.get(userId).forEach((friend) => {
        let friends = getFriends(data,friend,userId)
        friends.forEach((friend) => {
            if(frequency[friend])
                frequency[friend] += 1
            else
                frequency[friend] = 1    
        })
    })

    if (Object.keys(frequency).length === 0) {
        console.log("There is no friend to suggest")
        return 0
    }
    let sortable = [];
    for (var suggestion in frequency) {
        sortable.push([suggestion, frequency[suggestion]]);
    }

    sortable.sort((key, value) => {
        return value[1] - key[1];
    });

    var keys = sortable.map((e) => {
            return e[0] 
    });
    
    console.log(keys.join(', '));
    return keys;

}

var Graph = new Map()
const userId = prompt('Enter a user id to suggest some friends: ');
main("exam 3_friendship_test.txt",userId);



