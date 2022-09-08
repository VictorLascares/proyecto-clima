import { contenedor } from './selectores.js';

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



export { buscarClima };
