const form = document.getElementById('formcontact');
const statusmsg = document.getElementById('statusmsg');
form.addEventListener('submit', function(event){
  event.preventDefault();

  const formattedFormData = new FormData(form);
  postData(formattedFormData);
});

async function postData(formattedFormData){

  const response = await fetch('https://github.com/nnnn8888/ndup/blob/3cd1454268c866adbd41740a36ca2f318923b524/contact.php',{
      method: 'POST',
      body: formattedFormData
  });
  
  const data = await response.text();
  console.log(data);
  if(data =='success'){
    statusmsg.textContent = "Votre message a bien été envoyé";
    form.reset();
  } else {
    statusmsg.textContent = "Une erreur s'est produite";
  }
}