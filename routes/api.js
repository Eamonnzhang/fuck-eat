var express = require('express');
var router = express.Router();
const fs = require('fs')
const mpxMenuFile = fs.readFileSync('data/mpx.json', 'utf8')
let mpxMenu = JSON.parse(mpxMenuFile);
var fuckeat = function (data, amount) {
    let typedData = {
        'size1': [],
        'size2': []
    }

    function random(a, b) {
        return Math.floor(Math.random() * (b - a)) + a
    }

    data.forEach(item => {
        if (item.price > 23) {
            typedData.size1.push(item)
        } else {
            typedData.size2.push(item)
        }
    });

    let size1 = [...typedData.size1]
    let size2 = [...typedData.size2]

    let result = []
    let i = random(0, typedData.size1.length - 1)

    result.push(size1[i])

    for (i = 0; i < amount - 1; i++) {
        let t = random(0, size2.length - 1)
        result.push(size2.splice(t, 1)[0])

    }

    return result
}
/* GET users listing. */
router.post('/fuckeat', function (req, res) {
    let num = req.body.amount;
    let result = fuckeat(mpxMenu, num);
    console.log(result);
    res.json(result);
});

module.exports = router;