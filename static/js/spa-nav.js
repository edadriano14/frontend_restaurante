// =============================================================================
// NAVEGAÇÃO SPA INSTANTÂNEA EM TEMPO REAL (< 10ms)
// Substitui a navegação pesada do browser por transições fluidas e pré-busca
// =============================================================================

(function() {
    if (typeof window === 'undefined') return;

    // Cache em memória de páginas HTML para transição imediata (0ms)
    var pageHtmlCache = new Map();
    var isNavigating = false;

    // Função para buscar e cachear a página antecipadamente
    function prefetchUrl(url) {
        if (!url || url.startsWith('javascript:') || url.startsWith('#') || url.includes('/logout')) return;
        try {
            var parsed = new URL(url, window.location.origin);
            if (parsed.origin !== window.location.origin) return;
            var path = parsed.pathname;
            if (path.startsWith('/api/') || path.startsWith('/auth/')) return;

            if (!pageHtmlCache.has(path)) {
                fetch(path, { headers: { 'X-Requested-With': 'SPA-Navigation' }, priority: 'low' })
                    .then(function(res) {
                        if (res.ok && res.headers.get('content-type') && res.headers.get('content-type').includes('text/html')) {
                            return res.text();
                        }
                    })
                    .then(function(html) {
                        if (html) pageHtmlCache.set(path, html);
                    })
                    .catch(function() {});
            }
        } catch(e) {}
    }

    // Pré-carrega páginas ao passar o mouse ou focar no menu (instant loading)
    document.addEventListener('mouseover', function(e) {
        var link = e.target.closest('a');
        if (link && link.href) prefetchUrl(link.href);
    }, { passive: true });

    document.addEventListener('touchstart', function(e) {
        var link = e.target.closest('a');
        if (link && link.href) prefetchUrl(link.href);
    }, { passive: true });

    // Intercepta cliques de links internos para troca instantânea de conteúdo
    document.addEventListener('click', function(e) {
        var link = e.target.closest('a');
        if (!link || !link.href) return;
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        if (link.getAttribute('target') === '_blank' || link.getAttribute('download')) return;

        var url = link.href;
        var parsed = new URL(url, window.location.origin);
        if (parsed.origin !== window.location.origin) return;

        var path = parsed.pathname;
        if (path === window.location.pathname && !parsed.hash) {
            e.preventDefault();
            return;
        }

        // Links que devem carregar normalmente (logout, download, externas)
        if (path.startsWith('/logout') || path.startsWith('/api/') || path.startsWith('/auth/')) {
            return;
        }

        e.preventDefault();
        carregarPaginaInstantanea(url, true);
    });

    // Lida com botão Voltar / Avançar do navegador
    window.addEventListener('popstate', function() {
        carregarPaginaInstantanea(window.location.href, false);
    });

    // Executa a transição rápida da página
    function carregarPaginaInstantanea(url, pushState) {
        if (isNavigating) return;
        var parsed = new URL(url, window.location.origin);
        var path = parsed.pathname;

        // Se tivermos em cache de memória, a resposta é de ~1ms a 5ms
        if (pageHtmlCache.has(path)) {
            aplicarNovoHtml(pageHtmlCache.get(path), url, pushState);
            // Revalida em background
            fetch(url)
                .then(function(r) { return r.ok ? r.text() : null; })
                .then(function(html) { if (html) pageHtmlCache.set(path, html); })
                .catch(function() {});
            return;
        }

        // Caso contrário, busca na rede imediatamente
        isNavigating = true;
        document.body.classList.add('cursor-wait');

        fetch(url)
            .then(function(res) {
                if (!res.ok) throw new Error('HTTP ' + res.status);
                return res.text();
            })
            .then(function(html) {
                pageHtmlCache.set(path, html);
                aplicarNovoHtml(html, url, pushState);
            })
            .catch(function(err) {
                console.warn('[SPA] Fallback para navegação tradicional:', err);
                window.location.href = url;
            })
            .finally(function() {
                isNavigating = false;
                document.body.classList.remove('cursor-wait');
            });
    }

    // Aplica o novo conteúdo HTML ao container principal sem recarregar scripts pesados nem fazer a tela piscar
    function aplicarNovoHtml(html, url, pushState) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, 'text/html');

        var novoMain = doc.querySelector('main');
        var velhoMain = document.querySelector('main');

        if (!novoMain || !velhoMain) {
            // Se a estrutura não tiver <main>, recarrega tradicionalmente
            window.location.href = url;
            return;
        }

        // Atualiza o Título da Página
        if (doc.title) {
            document.title = doc.title;
        }

        // Atualiza a URL na barra de endereços
        if (pushState) {
            window.history.pushState({}, doc.title, url);
        }

        // Atualiza o menu lateral (itens ativos)
        var novoSidebar = doc.querySelector('#mainSidebar');
        var velhoSidebar = document.querySelector('#mainSidebar');
        if (novoSidebar && velhoSidebar) {
            var novosLinks = novoSidebar.querySelectorAll('nav a');
            var velhosLinks = velhoSidebar.querySelectorAll('nav a');
            novosLinks.forEach(function(nLink, i) {
                if (velhosLinks[i]) {
                    velhosLinks[i].className = nLink.className;
                }
            });
        }

        // Transição suave de conteúdo
        velhoMain.style.opacity = '0';
        velhoMain.style.transition = 'opacity 50ms ease';

        setTimeout(function() {
            velhoMain.innerHTML = novoMain.innerHTML;
            velhoMain.style.opacity = '1';

            // Executa scripts embutidos da nova página
            var scripts = doc.querySelectorAll('main script, script:not([src])');
            scripts.forEach(function(sc) {
                // Não re-executa scripts de inicialização globais
                if (sc.innerText && (sc.innerText.includes('RestauranteApp =') || sc.innerText.includes('ENV_CONFIG'))) return;
                try {
                    var novoScript = document.createElement('script');
                    novoScript.textContent = sc.textContent;
                    document.body.appendChild(novoScript);
                    setTimeout(function() { novoScript.remove(); }, 10);
                } catch(e) {}
            });

            // Dispara evento DOMContentLoaded e RestauranteAppDbReady para que os módulos renderizem seus dados instantaneamente
            window.dispatchEvent(new Event('DOMContentLoaded'));
            window.dispatchEvent(new CustomEvent('RestauranteAppDbReady', { detail: window.RestauranteApp || {} }));
            window.dispatchEvent(new CustomEvent('page:loaded', { detail: { url: url } }));

            // Fecha sidebar móvel se estiver aberta
            var sidebar = document.getElementById('mainSidebar');
            var overlay = document.getElementById('sidebarOverlay');
            if (sidebar && !sidebar.classList.contains('-translate-x-full') && window.innerWidth < 768) {
                sidebar.classList.add('-translate-x-full');
                if (overlay) overlay.classList.add('hidden');
            }

            // Scroll suave ao topo
            velhoMain.scrollTop = 0;
        }, 30);
    }

    // Pré-carrega automaticamente todas as rotas do menu lateral após a carga inicial
    window.addEventListener('load', function() {
        setTimeout(function() {
            var links = document.querySelectorAll('#mainSidebar nav a[href]');
            links.forEach(function(l) {
                prefetchUrl(l.href);
            });
        }, 1200);
    });

    window.RestauranteAppSPA = {
        prefetch: prefetchUrl,
        carregar: carregarPaginaInstantanea
    };
})();

