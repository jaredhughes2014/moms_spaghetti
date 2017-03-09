tree = [
    {
        text:'You come to a fork in the road. A troll invites you to a fighting festival down the right path. He\'s betting on last year\'s champion - Right Hook Steve. Which path do you take?',
        retext:'Right for fighting festival, left to continue past',
        opts: {
            left:1,
            right:2
        }
    },
    {
        text:'You continue on, content with your life as it is. Congrats on being fulfilled. You win.',
        retext:null,
    },
    {
        text:'You enter the festival! What name do you give them?',
        retext:'I couldn\'t hear you. What\'s your name?',
        opts: {
            'name is [name]':3,
            'names [name]':3,
            'name\'s [name]':3,
	    'i\'m [name]':3,
	    'im [name]':3,
            '[name]':3
        }
    },
    {
        text:'You enter the festival and quickly progress to the finals! Your opponent Steve throws a punch - which way do you dodge?',
        retext:'Dodge right or left?',
        opts: {
            left:4,
            right:5
        }
    },
    {
        text:'You dodge to your left - Steve\'s right. His famous right hook hits you squarely in the jaw, and you\'re down for the count! You lose.',
        retext:null
    },
    {
        text:'You dodge to your right - Steve\'s left. You nimbly avoid his famous right hook, and swipe his legs! He goes down like a ton of bricks, and you get first place. Congratulations [name]! You win!',
        retext:null
    }
]

_regex_escape = /[-\/\\^$*+?.()|[\]{}]/g;
function regex_escape(str) {
    return str.replace(_regex_escape, '\\$&');
}

function tree_opt(key, value) {
    this.next_index = value;
    if (/\[[^\]]*(\[|$)/.test(key)) throw "Unclosed '[' symbol in key";
    if (/(\]|^)[^\[]*\]/.test(key)) throw "Unopened ']' symbol in key";
    parts = key.split(/[\[\]]/)
    regex = regex_escape(parts[0]);
    this.varsToSet = [];
    for (ix = 1; ix < parts.length; ix += 2) {
        this.varsToSet.push(parts[ix]);
        regex += '(.*)' + regex_escape(parts[ix+1]);
    }
    this.regex = new RegExp(regex);
}

tree_opt.prototype.test = function(body, attrs) {
    m = this.regex.exec(body);
    if (m == null) return false;
    for (ix = 0; ix < this.varsToSet.length; ix++) {
        attrs['_'+this.varsToSet[ix]] = m[ix+1];
    }
    return true;
}

for (node of tree) {
    nops = [];
    for (key in node.opts) {
        nops.push(new tree_opt(key, node.opts[key]));
    }
    node.opts = nops;
}

module.exports = tree;
