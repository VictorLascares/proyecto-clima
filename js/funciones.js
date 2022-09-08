import { contenedor, resultado } from './selectores.js';

function buscarClima(e) {
   e.preventDefault();

   const ciudad = document.querySelector('#ciudad').value;
   const pais = document.querySelector('#pais').value;

   if (validarFormulario(ciudad, pais)) {
      consultarAPI(ciudad,pais);
   }
}

function validarFormulario(ciudad, pais) {
   if ( !ciudad || !pais ) {
      mostrarError('Todos los campos son obligatorios');
      return false;
   } else {
      const numeros = /\d/g;
      if (!ciudad.match(numeros)) {
         return true;
      } else {
         mostrarError('Ingresa una ciudad valida');
         return false;
      }
   }
}

function mostrarError(mensaje) {
   const existe = document.querySelector('.alerta');
   // Crear una alerta
   if (!existe) {
      const alerta = document.createElement('div');
      alerta.classList.add('bg-red-400','text-red-700','px-4','py-3','rounded','max-w-md','mx-auto','mt-6','text-center','alerta');
      alerta.textContent = mensaje;
      contenedor.appendChild(alerta); 

      setTimeout(() => {
         alerta.remove();
      },3000)
   }
}

function consultarAPI(ciudad, pais) {
   const appId = 'b7b2f47452e54d8d2476dc2f56f9eb72';
   const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

   // Mostrar Spinner
   spinner();

   fetch(url)
      .then(respuesta => respuesta.json())
      .then(datos => {
         limpiarHTML();
       
         if(datos.cod === "404") {
            mostrarError('Ciudad no encontrada');
            return;
         }


         // Imprime la respuesta en el HTML
         mostrarClima(datos);
      })

}

function mostrarClima(datos) {
   const { name, main: { temp, temp_max, temp_min } } = datos;
   const tempActual = kelvinACelsius(temp);
   const tempMaxima = kelvinACelsius(temp_max);
   const tempMinima = kelvinACelsius(temp_min);


   const actual = document.createElement('p');
   actual.innerHTML = `${tempActual} &#8451;`;
   actual.classList.add('font-bold','text-6xl');

   const maxima = document.createElement('p');
   maxima.innerHTML = `Max ${tempMaxima} &#8451;`;
   maxima.classList.add('text-xl');

   const minima = document.createElement('p');
   minima.innerHTML = `Min ${tempMinima} &#8451;`;
   minima.classList.add('text-xl');

   const nombreCiudad = document.createElement('p');
   nombreCiudad.textContent = name;

   const contMaxMin = document.createElement('div');
   contMaxMin.classList.add('flex','justify-center','gap-4');
   contMaxMin.appendChild(maxima);
   contMaxMin.appendChild(minima);

   const resultadoDiv = document.createElement('div');
   resultadoDiv.classList.add('text-center','text-white');
   resultadoDiv.appendChild(actual);
   resultadoDiv.appendChild(contMaxMin);
   resultadoDiv.appendChild(nombreCiudad);


   resultado.appendChild(resultadoDiv);
}

const kelvinACelsius = (grados) => Math.round(grados - 273.15);

function limpiarHTML() {
   while(resultado.firstChild) {
      resultado.removeChild(resultado.firstChild);
   }
}

function spinner() {
   limpiarHTML();
   const divSpinner = document.createElement('div');
   divSpinner.classList.add('sk-fading-circle');

   divSpinner.innerHTML = `
      <div class="sk-circle1 sk-circle"></div>
      <div class="sk-circle2 sk-circle"></div>
      <div class="sk-circle3 sk-circle"></div>
      <div class="sk-circle4 sk-circle"></div>
      <div class="sk-circle5 sk-circle"></div>
      <div class="sk-circle6 sk-circle"></div>
      <div class="sk-circle7 sk-circle"></div>
      <div class="sk-circle8 sk-circle"></div>
      <div class="sk-circle9 sk-circle"></div>
      <div class="sk-circle10 sk-circle"></div>
      <div class="sk-circle11 sk-circle"></div>
      <div class="sk-circle12 sk-circle"></div>
   ` 
   resultado.appendChild(divSpinner);
}
export { buscarClima };
