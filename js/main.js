const grid = new Muuri('.grid',{
	layout: {
		rounding:false
	}
});

window.addEventListener('load',() => {
	grid.refreshItems().layout();
	document.getElementById('grid').classList.add('imagenes-cargadas');

	const enlaces = document.querySelectorAll('#categorias a');
	
	//Agragamos los listener de los enlaces para filtar por categoria
	enlaces.forEach((elemento) => {
		elemento.addEventListener('click',(evento) => {
			evento.preventDefault();
			enlaces.forEach((enlace)=> enlace.classList.remove('active'))
			evento.target.classList.add('active');

			const categoria = evento.target.innerHTML.toLowerCase();
			categoria === "todos" ? grid.filter('[data-category]') : grid.filter(`[data-category=${categoria}`);
		});
	});

	//Agregamos los listener para la barra de busqueda

	document.querySelector("#barra-busqueda").addEventListener('input',(evento) => {
		const busqueda = evento.target.value;

		grid.filter( (item) => item.getElement().dataset.tags.includes(busqueda) );

	});

	//Agregamos listener a las imagenes
	const overlay = document.getElementById('overlay');
	
	document.querySelectorAll('.grid .item img').forEach( (elemento) => {		
		elemento.addEventListener('click', () => {
			const ruta = elemento.getAttribute('src');
			const descripcion = elemento.parentNode.parentNode.dataset.description;
			
			overlay.classList.add('activo');
			document.querySelector('#overlay img').src = ruta;
			document.querySelector('#overlay .descripcion').innerHTML = descripcion;
		
		});
	});

	//Boton dec cerrar
	document.querySelector('#btn-cerrar-popup').addEventListener('click',()=>{
		overlay.classList.remove('activo');
	});

	//Evento del overlay
	overlay.addEventListener('click',(evento)=>{
		evento.target.id === 'overlay' ? overlay.classList.remove('activo') : '';
	});
});

