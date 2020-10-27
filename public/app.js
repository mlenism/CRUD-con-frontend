//Create
var formulario = document.getElementById('contact');

formulario.addEventListener('submit', function (e) {
  e.preventDefault();
  let datos = new FormData(formulario);
  let nombrepaciente = datos.get('nombre');
  let apellidopaciente = datos.get('apellido');
  let idpaciente = datos.get('identificacion');

  let myHeaders = new Headers();

  const options = {
    method: 'POST',
    headers: myHeaders,
    body: new URLSearchParams({
      'nombre': nombrepaciente,
      'apellido': apellidopaciente,
      'numid': idpaciente
    }),
  }

  fetch('/basedatos/create', options)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
  }
);

//Read
var formRead = document.querySelector('#tablacontenido');

function get(){
  fetch('/basedatos/read')
  .then(res => res.json())
  .then(datos => {
    tabla(datos)
  })
}

function tabla(datos){
  formRead.innerHTML=''
  for(let valor of datos){
    formRead.innerHTML +=`
    <tr>
      <td>${valor.id}</td>
      <td>${valor.nombre}</td>
      <td>${valor.apellido}</td>
      <td>${valor.numid}</td>
    </tr>
    `
  }
}

//Update
var formUpdate = document.getElementById('contact-update');

formUpdate.addEventListener('submit', function (e) {
  e.preventDefault();

  let datos = new FormData(formUpdate);
  let llavePaciente = datos.get('idpaciente')  
  let nombrepaciente = datos.get('nombre');
  let apellidopaciente = datos.get('apellido');
  let idpaciente = datos.get('identificacion');

  let myHeaders = new Headers();

  const optionsUpdate = {
    method: 'PUT',
    headers: myHeaders,
    body: new URLSearchParams({
      'id': llavePaciente,
      'nombre': nombrepaciente,
      'apellido': apellidopaciente,
      'numid': idpaciente
    }),
  }
  fetch('/basedatos/update', optionsUpdate)
  .then(res => res.json())
  .then(data => {
    console.log(data);
  })

});

var formDelete = document.getElementById('contact-delete');

formDelete.addEventListener('submit', function(e){
  e.preventDefault();

  let datos = new FormData(formDelete);
  let llavePaciente = datos.get('idpaciente');
  let myHeaders = new Headers();

  const optionsDelete = {
    method: 'DELETE',
    headers: myHeaders,
    body: new URLSearchParams({
      'id': llavePaciente
    }),
  }

  fetch('/basedatos/delete', optionsDelete)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  })

})