import { formulario } from './selectores.js';
import { buscarClima } from './funciones.js';

window.onload = () => {
   formulario.addEventListener('submit', buscarClima); 
}
