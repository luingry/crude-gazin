
var main = {
	init: function() {

		//List all entrys
		const getAllEntrys = (page = 1) => {
			let qty = $('#qty').val();

			axios.get(`http://localhost:3000/developers?limit=${qty}&page=${page}`)
			.then((response)=>{
				let devs = response.data.data,
					tableRows = ``;

				generatePagination(response.data);

				$(devs).each(function(i){
					let dev = devs[i],
						d = new Date(dev.datanascimento),
						ye = new Intl.DateTimeFormat('pt', { year: 'numeric' }).format(d),
						mo = new Intl.DateTimeFormat('pt', { month: 'numeric' }).format(d),
						da = new Intl.DateTimeFormat('pt', { day: '2-digit' }).format(d),
						outputDate = `${da < 10 ? '0' + da : da}/${mo < 10 ? '0' + mo : mo }/${ye}`;
						rowTemplate = `
							<tr data-id="${dev.id}">
								<td class="nome">${dev.nome}</td>
								<td class="sexo">${dev.sexo}</td>
								<td class="idade">${dev.idade}</td>
								<td class="hobby">${dev.hobby}</td>
								<td class="nascimento" data-original-date="${dev.datanascimento}">${outputDate}</td>
								<td class="options">
									<a href="#form-editar" class="editar"><i class="fas fa-edit"></i></a>
									<a href="#form-remover" class="remover-dev"><i class="fas fa-trash"></i></a>
								</td>
							</tr>
						`;
					tableRows += rowTemplate;
				});
				$('.table-devs tbody').html(tableRows);
			})
		};
		getAllEntrys();

		//Register a entry
		const registerEntry = (data) => {
			axios.post('http://localhost:3000/developers', data)
			.then((response)=>{
				console.log(response);
				successOperation();
			}).catch((error)=>{
				console.error(error.response.data);
			})
		};

		//Remove entry
		const removeEntry = (id) => {
			axios.delete(`http://localhost:3000/developers/${id}`,)
			.then((response)=>{
				console.log(response);
				successOperation();
			}).catch((error)=>{
				console.error(error.response.data);
			})
		};

		//Update a entry
		const updateEntry = (data, id) => {
			axios.put(`http://localhost:3000/developers/${id}`, data)
			.then((response)=>{
				console.log(response);
				successOperation();
			}).catch((error)=>{
				console.error(error.response.data);
			});
		};

		const successOperation = () => {
			$.fancybox.close();
			$.fancybox.open({
				src: '#success'
			});
			getAllEntrys();
		}

		const generatePagination = (data) => {
			let pageList = ``,
				pageQty = data.pages,
				currentPage = data.currentPage;
			if (pageQty > 1) {
				for (let a = 0; a < pageQty; a++) {
					let isActive = currentPage == a+1 ? 'active' : '';
					let pageTemplate = `<li class="page-item ${isActive}"><a class="page-link" href="${a+1}">${a+1}</a></li>`;
					// if (currentPage == pageQty && a == 0 && currentPage > 1 && currentPage <= pageQty) pageList += `<li class="page-item"><a class="page-link prev" href="${a+1}"><</a></li>`;
					// if (currentPage < pageQty && a == pageQty) pageList += `<li class="page-item"><a class="page-link next" href="${a+1}">></a></li>`;
					pageList += pageTemplate;
				}
			}
			$('ul.pagination').html(pageList);
		}

		$(document).on('submit', '#form-editar, #form-cadastro', function(e){
			e.preventDefault();
			let these = $(this),
				nome = these.find('input#nome').val(),
				sexo = these.find('input[type="radio"][name="sexo"]:checked').val().toUpperCase(),
				idade = these.find('input#idade').val(),
				hobby = these.find('input#hobby').val(),
				datanascimento = these.find('input#nascimento').val(),
				data = {
					"nome" : nome,
					"sexo" : sexo,
					"idade" : idade,
					"hobby" : hobby,
					"datanascimento" : datanascimento
				};
			if ($(this).is('#form-editar')) return updateEntry(data, $(this).find('#entry-id').val());
			if ($(this).is('#form-cadastro')) return registerEntry(data);
		});

		$('body').on('click', '[reload]', function(e){
			e.preventDefault();
			getAllEntrys();
		});

		$('body').on('click', 'table a.editar', function(e){
			e.preventDefault();
			let these = $(this).closest('tr'),
				id = these.attr('data-id'),
				nome = these.find('.nome').html(),
				sexo = these.find('.sexo').html(),
				idade = these.find('.idade').html(),
				nascimento = these.find('.nascimento').attr('data-original-date'),
				hobby = these.find('.hobby').html(),
				formEditar = $('#form-editar');

			formEditar.find('#entry-id').val(id);
			formEditar.find('#nome').val(nome);
			formEditar.find(`input#sexo-${sexo.toLowerCase()}`).attr('checked', true);
			formEditar.find('#idade').val(idade);
			formEditar.find('#hobby').val(hobby);
			formEditar.find('#nascimento')[0].valueAsDate = new Date(Date.UTC(new Date(nascimento).getFullYear(), new Date(nascimento).getMonth(), new Date(nascimento).getDate()));
			$.fancybox.open({
				src: '#form-editar'
			});
		});

		$('body').on('click', '.remover-dev', function(e){
			e.preventDefault();
			let id = $(this).closest('tr').attr('data-id');
			$('#form-remover [data-remover]').attr('data-remover', id);
			$.fancybox.open({
				src: '#form-remover'
			});
		});

		$('body').on('click', '[data-remover]', function(e){
			e.preventDefault();
			let id = $(this).attr('data-remover');
			removeEntry(id);
			setTimeout(function(){
				successOperation();
			}, 10);
		});

		$('body').on('change', '#qty', function(e){
			getAllEntrys();
		})

		$('body').on('click', '.pagination a', function(e){
			e.preventDefault();
			let these = $(this);
			let targetPage = these.attr('href');
			getAllEntrys(targetPage);
			these.parent().addClass('active');
		})


	}
}


$(function() {
	main.init();
});