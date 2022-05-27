## Examples
**Random word**
```
fetch('/api/word', {
     headers: {
        'Authorization': 'Bearer ' + token
    }
}).then(res => res.text()).then(res => console.log(res))
```
**POST translation**
```
fetch('/api/word', {
    method:'POST',
    headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({
        englishword: 'title',
        hebrewword: 'כותרת'
    })
}).then(res => res.text()).then(res => console.log(res))
```

**Login**
```
fetch('/api/auth/login', {
    method:'POST',
    headers: {
        'Content-type': 'application/json'
    },
    body: JSON.stringify({
        username: 'yaakov',
        password: ''
    })
}).then(res => res.text()).then(res => console.log(res))
```

**stats**
```
fetch('/api/stats', {
    headers: {
        'Authorization': 'Bearer ' + token
    }
}).then(res => res.text()).then(res => console.log(res))
```