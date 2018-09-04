This is a simple JavaScript function which allows you to get and set deeply nested values from objects.

``` bash
npm install deepnested
```

# Usage

``` javascript
import nested from 'deepnested';
```

Now that nested has been imported in to your project you're able to start getting and settings deeply nested object values

## Get Values ##
``` javascript
var team = {
    tom: {
        name: 'Tom',
        age: 26,
        position: 'Developer',
        team: {
            title: 'Product Page',
            members: ['nick', 'tom', 'nicole'],
            employed: true
        }
    },

    nicole: {
        name: 'Nicole',
        age: 21,
        position: 'Tester'
    },

    nick: {
        name: 'Nick',
        age: 400,
        position: 'Colour-inner'
    }
};

var teamTitle = nested(team).get(['tom', 'team', 'title']); // Product Page
```

## Set Values ##

You can use nested to overwrite values in your object

``` javascript
nested(team).set(['tom', 'team', 'employed'], false);
var employed = nested(team).get(['tom', 'team', 'employed']); // Now equal to false
```
