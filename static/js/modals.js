// =============================================================================
// FUNÇÕES GLOBAIS DE MODAIS & DIÁLOGOS AMIGÁVEIS CENTRALIZADOS COM CAMPO DE PESQUISA
// =============================================================================

window.abrirModal = function(id) {
    var modal = document.getElementById(id);
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');

        // Inicializa ou reseta a barra de pesquisa inteligente dentro do modal
        garantirBarraPesquisaNoModal(modal);
    }
};

window.fecharModal = function(id) {
    var modal = document.getElementById(id);
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');

        // Limpa o termo de pesquisa e restaura todos os campos
        var inputBusca = modal.querySelector('.input-pesquisa-modal');
        if (inputBusca && inputBusca.value) {
            inputBusca.value = '';
            filtrarConteudoDoModal(modal, '');
        }
    }
};

// Injeta dinamicamente a barra de pesquisa rápida no topo do modal
function garantirBarraPesquisaNoModal(modal) {
    // Ignora diálogos simples de confirmação/alerta/preview estrito de imagens
    if (modal.id === 'modalGaleriaImagens' || modal.id === 'modalCentralAlertasGlobal' || modal.id === 'modalQrCodeMesa') {
        return;
    }

    var card = modal.querySelector('.rounded-2xl, .rounded-3xl, .bg-white, .bg-\\[\\#111827\\]');
    if (!card) return;

    // Se já tiver a barra injetada, apenas foca se aplicável e limpa o valor
    var barraExistente = card.querySelector('.container-pesquisa-modal');
    if (barraExistente) {
        var inp = barraExistente.querySelector('input');
        if (inp) {
            inp.value = '';
            filtrarConteudoDoModal(modal, '');
        }
        return;
    }

    // Procura o cabeçalho do modal para inserir logo abaixo
    var header = card.querySelector('.border-b, header, .flex.items-center.justify-between');
    if (!header) return;

    var container = document.createElement('div');
    container.className = 'container-pesquisa-modal my-2 px-1 relative';
    container.innerHTML = [
        '<div class="relative flex items-center">',
        '  <i class="fa-solid fa-magnifying-glass absolute left-3 text-xs text-gray-400 pointer-events-none"></i>',
        '  <input type="text" placeholder="Pesquisar nos campos e opções deste modal..." ',
        '    class="input-pesquisa-modal w-full pl-8 pr-8 py-2 text-xs bg-gray-50 hover:bg-gray-100/80 focus:bg-white border border-gray-200 focus:border-red-500 rounded-xl outline-none font-medium transition shadow-inner">',
        '  <button type="button" class="btn-limpar-pesquisa-modal absolute right-2.5 text-gray-400 hover:text-gray-600 hidden text-xs cursor-pointer" title="Limpar pesquisa">&times;</button>',
        '</div>',
        '<div class="status-pesquisa-modal text-[10px] text-gray-400 px-1 mt-1 hidden"></div>'
    ].join('');

    // Insere logo após o cabeçalho
    header.insertAdjacentElement('afterend', container);

    var input = container.querySelector('.input-pesquisa-modal');
    var btnLimpar = container.querySelector('.btn-limpar-pesquisa-modal');
    var status = container.querySelector('.status-pesquisa-modal');

    input.addEventListener('input', function() {
        var termo = this.value.trim().toLowerCase();
        if (termo.length > 0) {
            btnLimpar.classList.remove('hidden');
        } else {
            btnLimpar.classList.add('hidden');
        }
        var totalEncontrados = filtrarConteudoDoModal(modal, termo);
        if (termo.length > 0) {
            status.classList.remove('hidden');
            status.innerText = totalEncontrados + ' item(ns) encontrado(s)';
        } else {
            status.classList.add('hidden');
        }
    });

    btnLimpar.addEventListener('click', function() {
        input.value = '';
        btnLimpar.classList.add('hidden');
        status.classList.add('hidden');
        filtrarConteudoDoModal(modal, '');
        input.focus();
    });
}

// Filtra dinamicamente linhas de tabela, grupos de campos, opções de selects e blocos dentro do modal
function filtrarConteudoDoModal(modal, termo) {
    var totalVisiveis = 0;

    // 1. Filtrar linhas de tabelas dentro do modal (ex: compras, requisições, guias de entrada)
    var linhasTabela = modal.querySelectorAll('tbody tr');
    if (linhasTabela.length > 0) {
        linhasTabela.forEach(function(tr) {
            if (!termo) {
                tr.style.display = '';
                totalVisiveis++;
                return;
            }
            var textoTr = (tr.textContent || tr.innerText || '').toLowerCase();
            if (textoTr.indexOf(termo) !== -1) {
                tr.style.display = '';
                totalVisiveis++;
            } else {
                tr.style.display = 'none';
            }
        });
    }

    // 2. Filtrar opções (<option>) em selects presentes no modal
    var selects = modal.querySelectorAll('select');
    selects.forEach(function(sel) {
        var options = sel.querySelectorAll('option');
        var primeiroVisivel = null;
        options.forEach(function(opt) {
            if (!termo) {
                opt.style.display = '';
                return;
            }
            var textoOpt = (opt.textContent || opt.innerText || '').toLowerCase();
            if (textoOpt.indexOf(termo) !== -1) {
                opt.style.display = '';
                if (!primeiroVisivel) primeiroVisivel = opt;
            } else {
                opt.style.display = 'none';
            }
        });
        if (termo && primeiroVisivel && sel.value !== primeiroVisivel.value) {
            // Seleciona a primeira opção correspondente
            sel.value = primeiroVisivel.value;
            sel.dispatchEvent(new Event('change'));
        }
    });

    // 3. Filtrar blocos de campos (divs de formulários)
    var camposForm = modal.querySelectorAll('.space-y-3 > div, .space-y-4 > div, .grid > div');
    camposForm.forEach(function(bloco) {
        if (bloco.classList.contains('container-pesquisa-modal') || bloco.querySelector('.container-pesquisa-modal')) return;
        if (bloco.querySelector('button[type="submit"]') || bloco.querySelector('button[onclick*="salvar"]')) return;

        if (!termo) {
            bloco.style.display = '';
            totalVisiveis++;
            return;
        }

        var textoBloco = (bloco.textContent || bloco.innerText || '').toLowerCase();
        // Também procura no placeholder ou valor de inputs
        var inputsInternos = bloco.querySelectorAll('input, select, textarea');
        var textoInputs = '';
        inputsInternos.forEach(function(inp) {
            textoInputs += ' ' + (inp.value || '') + ' ' + (inp.placeholder || '');
        });
        textoBloco += ' ' + textoInputs.toLowerCase();

        if (textoBloco.indexOf(termo) !== -1) {
            bloco.style.display = '';
            totalVisiveis++;
        } else {
            bloco.style.display = 'none';
        }
    });

    return totalVisiveis;
}

// =============================================================================
// MENSAGENS AMIGÁVEIS E DIÁLOGOS CENTRALIZADOS
// =============================================================================

(function() {
    function garantirContainerDialogo() {
        var el = document.getElementById('dialogoCentralizadoGlobal');
        if (el) return el;

        el = document.createElement('div');
        el.id = 'dialogoCentralizadoGlobal';
        el.className = 'fixed inset-0 bg-black/60 z-[99999] hidden items-center justify-center p-4 transition-opacity duration-75';
        el.innerHTML = [
            '<div class="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl text-center space-y-4 transform transition-transform duration-75 scale-95 border border-gray-100" id="dialogoCentralizadoCard">',
            '  <div id="dialogoIconeContainer" class="w-16 h-16 rounded-full flex items-center justify-center mx-auto text-3xl shadow-inner bg-emerald-100 text-emerald-600">',
            '    <i id="dialogoIcone" class="fa-solid fa-check"></i>',
            '  </div>',
            '  <div class="space-y-1.5">',
            '    <h3 id="dialogoTitulo" class="text-lg font-black text-gray-900 leading-snug">Operação Concluída</h3>',
            '    <div id="dialogoMensagem" class="text-xs text-gray-600 font-medium whitespace-pre-line leading-relaxed"></div>',
            '  </div>',
            '  <div id="dialogoBotoes" class="pt-2 flex items-center justify-center gap-2">',
            '    <button type="button" id="dialogoBtnOk" class="w-full py-2.5 bg-gray-900 hover:bg-black text-white font-bold rounded-xl text-xs shadow-md transition cursor-pointer">',
            '      OK, Fechar',
            '    </button>',
            '  </div>',
            '</div>'
        ].join('');

        document.body.appendChild(el);
        return el;
    }

    // Modal Amigável Centralizado (Fecha garantidamente no OK)
    window.mostrarMensagemAmigavel = function(mensagem, titulo, tipo, callback) {
        var container = garantirContainerDialogo();
        var card = document.getElementById('dialogoCentralizadoCard');
        var elIconeBox = document.getElementById('dialogoIconeContainer');
        var elIcone = document.getElementById('dialogoIcone');
        var elTitulo = document.getElementById('dialogoTitulo');
        var elMensagem = document.getElementById('dialogoMensagem');
        var botoesBox = document.getElementById('dialogoBotoes');

        var msgLower = (mensagem || '').toLowerCase();
        tipo = tipo || (
            msgLower.indexOf('erro') >= 0 ||
            msgLower.indexOf('deve conter') >= 0 ||
            msgLower.indexOf('inválid') >= 0 ||
            msgLower.indexOf('invalid') >= 0 ||
            msgLower.indexOf('obrigat') >= 0
                ? 'erro'
                : (msgLower.indexOf('atenc') >= 0 || msgLower.indexOf('atenç') >= 0 || msgLower.indexOf('informe') >= 0
                    ? 'aviso'
                    : 'sucesso')
        );

        if (tipo === 'erro') {
            elIconeBox.className = 'w-16 h-16 rounded-full flex items-center justify-center mx-auto text-3xl shadow-inner bg-red-100 text-red-600';
            elIcone.className = 'fa-solid fa-circle-xmark';
            elTitulo.innerText = titulo || 'Atenção';
        } else if (tipo === 'aviso') {
            elIconeBox.className = 'w-16 h-16 rounded-full flex items-center justify-center mx-auto text-3xl shadow-inner bg-amber-100 text-amber-600';
            elIcone.className = 'fa-solid fa-triangle-exclamation';
            elTitulo.innerText = titulo || 'Informação';
        } else {
            elIconeBox.className = 'w-16 h-16 rounded-full flex items-center justify-center mx-auto text-3xl shadow-inner bg-emerald-100 text-emerald-600';
            elIcone.className = 'fa-solid fa-circle-check';
            elTitulo.innerText = titulo || 'Sucesso!';
        }

        elMensagem.innerText = mensagem;
        botoesBox.innerHTML = '<button type="button" id="dialogoBtnOk" class="w-full py-2.5 bg-gray-900 hover:bg-black text-white font-bold rounded-xl text-xs shadow-md transition cursor-pointer">OK, Fechar</button>';

        container.classList.remove('hidden');
        container.classList.add('flex');
        if (card) card.classList.remove('scale-95');

        var btnOk = document.getElementById('dialogoBtnOk');
        if (btnOk) {
            btnOk.onclick = function() {
                container.classList.add('hidden');
                container.classList.remove('flex');
                if (typeof callback === 'function') {
                    try { callback(); } catch (err) { console.error('Callback error:', err); }
                }
            };
            btnOk.focus();
        }
    };

    // Confirm Amigável Centralizado
    window.confirmarAcaoAmigavel = function(mensagem, titulo, onConfirm, onCancel) {
        var container = garantirContainerDialogo();
        var card = document.getElementById('dialogoCentralizadoCard');
        var elIconeBox = document.getElementById('dialogoIconeContainer');
        var elIcone = document.getElementById('dialogoIcone');
        var elTitulo = document.getElementById('dialogoTitulo');
        var elMensagem = document.getElementById('dialogoMensagem');
        var botoesBox = document.getElementById('dialogoBotoes');

        elIconeBox.className = 'w-16 h-16 rounded-full flex items-center justify-center mx-auto text-3xl shadow-inner bg-blue-100 text-blue-600';
        elIcone.className = 'fa-solid fa-circle-question';
        elTitulo.innerText = titulo || 'Confirmar Ação';
        elMensagem.innerText = mensagem;

        botoesBox.innerHTML = [
            '<button type="button" id="dialogoBtnCancelar" class="w-1/2 py-2.5 border border-gray-300 hover:bg-gray-100 text-gray-700 font-bold rounded-xl text-xs transition cursor-pointer">Cancelar</button>',
            '<button type="button" id="dialogoBtnConfirmar" class="w-1/2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md transition cursor-pointer">Sim, Continuar</button>'
        ].join('');

        container.classList.remove('hidden');
        container.classList.add('flex');
        if (card) card.classList.remove('scale-95');

        document.getElementById('dialogoBtnCancelar').onclick = function() {
            container.classList.add('hidden');
            container.classList.remove('flex');
            if (onCancel) onCancel();
        };

        document.getElementById('dialogoBtnConfirmar').onclick = function() {
            container.classList.add('hidden');
            container.classList.remove('flex');
            if (onConfirm) onConfirm();
        };
    };

    // Não sobrescrever o window.alert se já existir para não criar loops
    var alertOriginal = window.alert;
    window.alert = function(msg) {
        if (document.body) {
            window.mostrarMensagemAmigavel(msg);
        } else if (alertOriginal) {
            alertOriginal(msg);
        }
    };
})();
