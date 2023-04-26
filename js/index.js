if (window.File && window.FileReader && window.FileList) {
	//función para cargar el fichero
	function handleFileSelect(evt) {

		let file = evt.target.files[0];
		if (!file.type.match('video.*')) {
			return alert("El archivo introducido no tiene el formato video");;
		}
		let reader = new FileReader();
		reader.onload = (function (File) {
			return function (e) {
				let videoDiv = document.getElementsByClassName('video-container');
				if (videoDiv[0] != null) {
					videoDiv[0].parentNode.removeChild(videoDiv[0]);
				}
				//creo el div donde se ejecutará el video
				let div = document.createElement('div');
				div.id = "div-video";
				div.className = "video-container";
				div.innerHTML = '<video controls id="video" class="thumbnail" src="' + e.target.result + '" title="' + escape(File.name) + '"/>';
				document.getElementById('video-output').insertBefore(div, null);

				//pongo visible el gif de carga
				document.getElementById('carga-div').style.visibility = "visible";
	
				//adjunto los eventos onclick
				document.getElementById('play').addEventListener('click', () => {
					document.getElementById('video').play();
				});
				document.getElementById('pause').addEventListener('click', () => {
					document.getElementById('video').pause();
				})
				document.getElementById('up').addEventListener('click', () => {
					document.getElementById('video').volume += 0.2;
				})
				document.getElementById('down').addEventListener('click', () => {
					document.getElementById('video').volume -= 0.2;
				})

				//ya esta cargado el video
				document.getElementById('video').addEventListener('canplay', () => {
				document.getElementById('principal-div').style.display = "none";
				document.getElementById('carga-div').style.display = "none";	
				document.getElementById('video').style.visibility = "visible";
				document.getElementById('play').style.visibility = "visible";
				document.getElementById('pause').style.visibility = "visible";
				document.getElementById('up').style.visibility = "visible";
				document.getElementById('down').style.visibility = "visible";
				});
			}
		})(file);
		reader.readAsDataURL(file);
	}
	document.getElementById('file').addEventListener('change', handleFileSelect, false);
} else {
	alert('El navegador no soporta la carga de archivos')
}