document.getElementById('tarefaInputForm').addEventListener('submit', salvarTarefa);
document.getElementById('lista_abertos').addEventListener('click', buscarTarefas);
document.getElementById('lista_fechados').addEventListener('click', buscarTarefasFechadas);
document.getElementById('lista_todos').addEventListener('click', buscarTarefasAll);
document.getElementById('exportar_csv').addEventListener('click', exportarCSV);

buscarTarefas();

function adicionarEventos() {
	var deleteLinks = document.querySelectorAll('.deletarTarefa');
	for (var i = 0; i < deleteLinks.length; i++) {
	    deleteLinks[i].addEventListener('click', function (event) {
	        event.preventDefault();
	        var _id = event.target.dataset.id;
	        if (_id) {
	        	deletarTarefa(_id);
        	}
	    });
	}

	var fecharLinks = document.querySelectorAll('.setStatusFechado');
	for (var i = 0; i < fecharLinks.length; i++) {
	    fecharLinks[i].addEventListener('click', function (event) {
	        event.preventDefault();
	        var _id = event.target.dataset.id;
	        if (_id) {
	        	setStatusFechado(_id);
        	}
	    });
	}
}

function salvarTarefa(e){
	var dateNow = new Date();
	var data = dateNow.getDate() + '-' + ( dateNow.getMonth() + 1 ) + '-' + dateNow.getFullYear();
	var hora = dateNow.getHours() + ':' + dateNow.getMinutes() + ':' + dateNow.getSeconds();
	var created_at = data + ' ' + hora;

	var tarefaDescricaoInput = document.getElementById('tarefaDescricaoInput').value;
	var tarefaPrioridadeInput= document.getElementById('tarefaPrioridadeInput').value;
	var tarefaId = chance.guid();
	var tarefaStatus = 'Aberto';

	var tarefa = {
		tarefaId: tarefaId,
		descricao: tarefaDescricaoInput,
		prioridade: tarefaPrioridadeInput,
		status: tarefaStatus,
		created_at: created_at
	}

	if (localStorage.getItem('tarefas') == null) {
		var tarefas = [];
		tarefas.push(tarefa);
		localStorage.setItem('tarefas', JSON.stringify(tarefas));
	} else {
		var tarefas = JSON.parse(localStorage.getItem('tarefas'));
		tarefas.push(tarefa);
		localStorage.setItem('tarefas', JSON.stringify(tarefas));
	}

	document.getElementById('tarefaInputForm').reset();

	buscarTarefas();

	e.preventDefault();
}

function setStatusFechado(id){
	var dateNow = new Date();
	var data = dateNow.getDate() + '-' + ( dateNow.getMonth() + 1 ) + '-' + dateNow.getFullYear();
	var hora = dateNow.getHours() + ':' + dateNow.getMinutes() + ':' + dateNow.getSeconds();
	var updated_at = data + ' ' + hora;

	var tarefas = JSON.parse(localStorage.getItem('tarefas'));

	for (var i = 0; i < tarefas.length; i++) {
		if (tarefas[i].tarefaId == id) {
			tarefas[i].status = 'Fechado';
			tarefas[i].updated_at = updated_at;
		}
	}

	localStorage.setItem('tarefas', JSON.stringify(tarefas));

	buscarTarefas();
}

function deletarTarefa(id){

	var tarefas = JSON.parse(localStorage.getItem('tarefas'));

	for (var i = 0; i < tarefas.length; i++) {
		if (tarefas[i].tarefaId == id) {
			tarefas.splice(i, 1);
		}
	}

	localStorage.setItem('tarefas', JSON.stringify(tarefas));

	buscarTarefas();
}

function buscarTarefas() {
	var tarefas = JSON.parse(localStorage.getItem('tarefas'));
	var tarefasLista = document.getElementById('tarefasLista');

	tarefasLista.innerHTML = '';

	if (tarefas != null) {

		for (var i = 0; i < tarefas.length; i++) {
			var tarefaId = tarefas[i].tarefaId;
			var descricao = tarefas[i].descricao;
			var prioridade = tarefas[i].prioridade;
			var status = tarefas[i].status;
			var created_at = tarefas[i].created_at || '';
			var updated_at = tarefas[i].updated_at || '';

			if (status == 'Aberto') {
				tarefasLista.innerHTML += '<div class="well">' +
										'<h6>tarefa ID: ' + tarefaId + '</h6>' +
										'<p><span class="label label-info">' + status + '</span></p>' +
										'<h3>' + descricao + '</h3>' +
										'<p><span class="glyphicon glyphicon-time"></span> ' + prioridade + '</p>' +
										'<p><span class="glyphicon glyphicon-time"></span> Criado: ' + created_at + '</p>' +
										'<a href="#" data-id="'+tarefaId+'" class="btn btn-warning setStatusFechado">Fechar</a> ' +
										'<a href="#" data-id="'+tarefaId+'" class="btn btn-danger deletarTarefa">Deletar</a>' +
										'</div>';
			}
		}
		adicionarEventos();
		totais();
	}
}

function buscarTarefasFechadas() {
	var tarefas = JSON.parse(localStorage.getItem('tarefas'));
	var tarefasLista = document.getElementById('tarefasLista');

	tarefasLista.innerHTML = '';

	if (tarefas != null) {

		for (var i = 0; i < tarefas.length; i++) {
			var tarefaId = tarefas[i].tarefaId;
			var descricao = tarefas[i].descricao;
			var prioridade = tarefas[i].prioridade;
			var status = tarefas[i].status;
			var created_at = tarefas[i].created_at || '';
			var updated_at = tarefas[i].updated_at || '';

			if (status == 'Fechado') {
				tarefasLista.innerHTML += '<div class="well">' +
										'<h6>tarefa ID: ' + tarefaId + '</h6>' +
										'<p><span class="label label-info">' + status + '</span></p>' +
										'<h3>' + descricao + '</h3>' +
										'<p><span class="glyphicon glyphicon-time"></span> ' + prioridade + '</p>' +
										'<p><span class="glyphicon glyphicon-time"></span> Criado: ' + created_at + '</p>' +
										'<p><span class="glyphicon glyphicon-time"></span> Fechado: ' + updated_at + '</p>' +
										'<a href="#" data-id="'+tarefaId+'" class="btn btn-warning setStatusFechado">Fechar</a> ' +
										'<a href="#" data-id="'+tarefaId+'" class="btn btn-danger deletarTarefa">Deletar</a>' +
										'</div>';
			}
		}
		adicionarEventos();
		totais();
	}
}

function buscarTarefasAll() {
	var tarefas = JSON.parse(localStorage.getItem('tarefas'));
	var tarefasLista = document.getElementById('tarefasLista');

	tarefasLista.innerHTML = '';

	if (tarefas != null) {

		for (var i = 0; i < tarefas.length; i++) {
			var tarefaId = tarefas[i].tarefaId;
			var descricao = tarefas[i].descricao;
			var prioridade = tarefas[i].prioridade;
			var status = tarefas[i].status;
			var created_at = tarefas[i].created_at || '';
			var updated_at = tarefas[i].updated_at || '';

			tarefasLista.innerHTML += '<div class="well">' +
									'<h6>tarefa ID: ' + tarefaId + '</h6>' +
									'<p><span class="label label-info">' + status + '</span></p>' +
									'<h3>' + descricao + '</h3>' +
									'<p><span class="glyphicon glyphicon-time"></span> ' + prioridade + '</p>' +
									'<p><span class="glyphicon glyphicon-time"></span> Criado: ' + created_at + '</p>' +
										'<p><span class="glyphicon glyphicon-time"></span> Fechado: ' + updated_at + '</p>' +
									'<a href="#" data-id="'+tarefaId+'" class="btn btn-warning setStatusFechado">Fechar</a> ' +
									'<a href="#" data-id="'+tarefaId+'" class="btn btn-danger deletarTarefa">Deletar</a>' +
									'</div>';
		}
		adicionarEventos();
		totais();
	}
}

function totais() {
	var tarefas = JSON.parse(localStorage.getItem('tarefas'));
	
	var contadorTotal = 0;
	var contadorFechado = 0;
	var contadorAberto = 0;

	if (tarefas != null) {
		for (var i = 0; i < tarefas.length; i++) {
			var status = tarefas[i].status;
			contadorTotal = contadorTotal + 1;
			if (status == 'Aberto') {
				contadorAberto = contadorAberto + 1;
			}
			if (status == 'Fechado') {
				contadorFechado = contadorFechado + 1;
			}
		}
		adicionarEventos();
	}
	document.getElementById('tall').innerHTML = contadorTotal;
	document.getElementById('tfechado').innerHTML = contadorFechado;
	document.getElementById('taberto').innerHTML = contadorAberto;
}

function exportarCSV() {
	var tarefas = JSON.parse(localStorage.getItem('tarefas'));
	var strList = 'ID;DESCRICAO;PRIORIDADE;STATUS;DATA_CRIADO;DATA_ATUALIZADO\n';
	var elementHref = document.createElement('a');

	if (tarefas != null) {
		for (var i = 0; i < tarefas.length; i++) {
			let updated_at = typeof tarefas[i].updated_at === 'undefined' ? '' : tarefas[i].updated_at;
			strList += tarefas[i].tarefaId + ';';
			strList += tarefas[i].descricao + ';';
			strList += tarefas[i].prioridade + ';';
			strList += tarefas[i].status + ';';
			strList += tarefas[i].created_at + ';';
			strList += updated_at + ';';
			strList += '\n';
		}

		elementHref.href = 'data:text/csv;charset=utf-8,' + encodeURI(strList);
		elementHref.target = '_blank';
    	elementHref.download = 'tarefas.csv';
    	elementHref.click();
	}
}