// this page js is for testing 

const button = document.querySelector("checkout-btn")
button.addEventListener("click", () => {
    fetch('https://dagobah-depot-34081fe1df5e.herokuapp.com/checkout-session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            items:[
                { id: 1, quantity: 3 },
                { id: 2, quantity: 1 }
            ]
        })
    }).then(res => {
        if (res.ok) return res.json()
        return res.json().then(json => Promise.reject(json))
    }).then(({ url }) => {
        console.log(url)
        window.location = url; // Redirects the user to the stripe checkout page 
    }).catch(e => {
        console.error(e.error)
    })
})


