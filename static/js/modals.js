// =============================================================================
// FUNÇÕES GLOBAIS DE MODAIS & DIÁLOGOS AMIGÁVEIS CENTRALIZADOS
// =============================================================================

window.abrirModal = function(id) {
    var modal = document.getElementById(id);
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
};

window.fecharModal = function(id) {
    var modal = document.getElementById(id);
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
};

// =============================================================================
// MENSAGENS AMIGÁVEIS E DIÁLOGOS CENTRALIZADOS
// =============================================================================

(function() {
    function garantirContainerDialogo() {
        var el = document.getElementById('dialogoCentralizadoGlobal');
        if (el) return el;

        el = document.createElement('div');
        el.id = 'dialogoCentralizadoGlobal';
        el.className = 'fixed inset-0 bg-black/60 z-[99999] hidden items-center justify-center p-4 transition-opacity duration-200';
        el.innerHTML = [
            '<div class="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl text-center space-y-4 transform transition-transform duration-200 scale-95 border border-gray-100" id="dialogoCentralizadoCard">',
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
        setTimeout(function() {
            if (card) card.classList.remove('scale-95');
        }, 10);

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
        setTimeout(function() {
            if (card) card.classList.remove('scale-95');
        }, 10);

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
