let form = document.querySelector('#contact')
let button = form.querySelector('button[type=submit]')
let buttonText = button.textContent

form.addEventListener('submit', async function (e) {
  button.disabled = true
  button.textContent = 'Chargement...'
  e.preventDefault()
  let data = new FormData(form)
  try {
    let response = await fetch(form.getAttribute('action'), {
      method: 'POST',
      headers: {
        'X-Requested-With': 'xmlhttprequest'
      },
      body: data
    })
    let responseData = await response.json()
    // La réponse n'est pas bonne (pas 200), on affiche les erreurs
    if (response.ok === false) {
      let errors = responseData
      let errorsKey = Object.keys(errors)
      for (let i = 0; i < errorsKey.length; i++) {
        let key = errorsKey[i]
        let error = errors[key]
        let input = document.querySelector('[name=' + key + ']')
        let span = document.createElement('span')
        span.className = 'help-block'
        span.innerHTML = error
        input.parentNode.appendChild(span)
      }
    // La réponse est ok, on vide le formulaire
    } else {
      let inputs = form.querySelectorAll('input, textarea')
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = ''
      }
      alert('Merci pour votre message')
    }
  } catch (e) {
    alert(e)
  }
  // Dans tous les cas on permet la soumission du formulaire à nouveau
  button.disabled = false
  button.textContent = buttonText
})