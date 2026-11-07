// =============================================================================
// ESTADO GLOBAL COMPLETO COM PERSISTÊNCIA DIRETA NA BASE DE DADOS (SUPABASE & .NET)
// =============================================================================

window.RestauranteApp = {
    // 1. ESTABELECIMENTOS
    estabelecimentos: [
        {
            id: "1",
            nome: "Restaurante Sabor & Brasa",
            slogan: "O melhor churrasco e comida tradicional de Maputo",
            nuit: "4001928310",
            moeda: "MZN",
            cor_primaria: "#DC2626",
            cor_secundaria: "#1E293B",
            logotipo_url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=150&auto=format&fit=crop&q=80",
            telefone: "+258 84 000 0000",
            email: "contacto@saborbrasa.co.mz",
            endereco: "Av. Julius Nyerere, Maputo",
            cidade: "Maputo",
            horario_abertura: "10:00 - 23:00",
            dias_funcionamento: "Segunda a Domingo",
            whatsapp: "+258840000000",
            facebook: "https://facebook.com/saborbrasa",
            instagram: "https://instagram.com/saborbrasa",
            website: "https://saborbrasa.co.mz",
            descricao_rodape: "O autêntico sabor das melhores carnes e iguarias moçambicanas no coração de Maputo.",
            tem_piscina: true,
            ativo: true
        },
        {
            id: "2",
            nome: "Mariscos & Petiscos da Costa",
            slogan: "Frutos do mar frescos com a brisa do Oceano Índico",
            nuit: "4002839120",
            moeda: "MZN",
            cor_primaria: "#0284C7",
            cor_secundaria: "#0F172A",
            logotipo_url: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=150&auto=format&fit=crop&q=80",
            telefone: "+258 82 555 1234",
            email: "costa@mariscos.co.mz",
            endereco: "Av. Marginal, Praia da Costa do Sol, Maputo",
            cidade: "Maputo",
            horario_abertura: "11:00 - 00:00",
            dias_funcionamento: "Terça a Domingo",
            whatsapp: "+258825551234",
            facebook: "https://facebook.com/mariscosdacosta",
            instagram: "https://instagram.com/mariscosdacosta",
            website: "https://mariscosdacosta.co.mz",
            descricao_rodape: "Frutos do mar frescos pescados diariamente com a brisa do Oceano Índico.",
            tem_piscina: false,
            ativo: true
        }
    ],

    // 2. SALAS / ÁREAS DO RESTAURANTE
    salas: [
        { id: "1", codigo: "SALA-01", nome: "Salão Principal Climatizado", descricao: "Área interna com ar condicionado", capacidade_mesas: 12 },
        { id: "2", codigo: "SALA-02", nome: "Esplanada & Jardim", descricao: "Ambiente aberto ao ar livre", capacidade_mesas: 8 },
        { id: "3", codigo: "SALA-03", nome: "Zona VIP / Reservados", descricao: "Espaço exclusivo para grupos e eventos", capacidade_mesas: 4 }
    ],

    // 3. MESAS COM QR CODE E RELACIONAMENTO COM SALAS
    mesas: [
        { id: "1", codigo: "MS-01", sala_id: "1", sala_nome: "Salão Principal Climatizado", numero_mesa: "Mesa 01", capacidade_lugares: 4, estado: "LIVRE", qrcode_token: "MESA-01-SB" },
        { id: "2", codigo: "MS-02", sala_id: "1", sala_nome: "Salão Principal Climatizado", numero_mesa: "Mesa 02", capacidade_lugares: 4, estado: "OCUPADA", qrcode_token: "MESA-02-SB" },
        { id: "3", codigo: "MS-03", sala_id: "1", sala_nome: "Salão Principal Climatizado", numero_mesa: "Mesa 03", capacidade_lugares: 6, estado: "LIVRE", qrcode_token: "MESA-03-SB" },
        { id: "4", codigo: "MS-04", sala_id: "1", sala_nome: "Salão Principal Climatizado", numero_mesa: "Mesa 04", capacidade_lugares: 2, estado: "LIVRE", qrcode_token: "MESA-04-SB" },
        { id: "5", codigo: "MS-05", sala_id: "2", sala_nome: "Esplanada & Jardim", numero_mesa: "Mesa 10 (Jardim)", capacidade_lugares: 4, estado: "LIVRE", qrcode_token: "MESA-10-SB" },
        { id: "6", codigo: "MS-06", sala_id: "2", sala_nome: "Esplanada & Jardim", numero_mesa: "Mesa 11 (Jardim)", capacidade_lugares: 4, estado: "RESERVADA", qrcode_token: "MESA-11-SB" },
        { id: "7", codigo: "MS-07", sala_id: "3", sala_nome: "Zona VIP / Reservados", numero_mesa: "Camarote VIP 01", capacidade_lugares: 8, estado: "LIVRE", qrcode_token: "VIP-01-SB" }
    ],

    // 4. POSTOS DE PREPARAÇÃO (Cozinha, Pastelaria, Bar)
    postos_preparacao: [
        { id: "1", codigo: "COZ-01", descricao: "Cozinha Principal / Fogão & Forno" },
        { id: "2", codigo: "PAS-01", descricao: "Pastelaria & Sobremesas" },
        { id: "3", codigo: "BAR-01", descricao: "Bar & Balcão de Bebidas" }
    ],

    // 5. TIPOS DE PEDIDOS (Balcão, Takeaway, Delivery, Mesa, Encomenda)
    tipos_pedidos: [
        { id: "1", codigo: "TP-BALCAO", descricao: "Balcão (Atendimento Rápido)" },
        { id: "2", codigo: "TP-MESA", descricao: "Mesa / Salão (Consumo Local)" },
        { id: "3", codigo: "TP-TAKEAWAY", descricao: "Takeaway (Para Levar)" },
        { id: "4", codigo: "TP-DELIVERY", descricao: "Delivery (Entrega ao Domicílio)" },
        { id: "5", codigo: "TP-ENCOMENDA", descricao: "Encomenda Prévia" }
    ],

    // 6. ACOMPANHAMENTOS: SELECTIVOS vs OPCIONAIS
    acompanhamentos: [
        { id: "1", nome: "Batata Frita Rústica", tipo: "selectivo", preco_adicional: 0.00, padrao: true, disponivel: true },
        { id: "2", nome: "Arroz de Alho & Coentros", tipo: "selectivo", preco_adicional: 0.00, padrao: true, disponivel: true },
        { id: "3", nome: "Salada Mista Fresca", tipo: "selectivo", preco_adicional: 0.00, padrao: false, disponivel: true },
        { id: "4", nome: "Molho de Pimenta da Casa (Extra)", tipo: "opcional", preco_adicional: 35.00, padrao: false, disponivel: true },
        { id: "5", nome: "Maionese de Alho Confitado (Extra)", tipo: "opcional", preco_adicional: 45.00, padrao: false, disponivel: true },
        { id: "6", nome: "Queijo Cheddar Fundido Extra", tipo: "opcional", preco_adicional: 60.00, padrao: false, disponivel: true }
    ],

    // 7. CATEGORIAS
    categorias: [
        { id: "1", codigo: "CAT-01", nome: "Carnes & Grelhados", emoji: "🥩", ordem: 1 },
        { id: "2", codigo: "CAT-02", nome: "Bebidas & Cocktails", emoji: "🍹", ordem: 2 },
        { id: "3", codigo: "CAT-03", nome: "Acompanhamentos", emoji: "🍟", ordem: 3 },
        { id: "4", codigo: "CAT-04", nome: "Sobremesas & Pastelaria", emoji: "🍰", ordem: 4 }
    ],

    // 8. PRODUTOS
    produtos: [
        {
            id: "1",
            codigo_produto: "PRD-001",
            nome: "Picanha Especial na Brasa",
            tipo: "comida",
            posto_id: "1",
            posto_nome: "Cozinha Principal",
            descricao: "Corte nobre com sal grosso, grelhado ao ponto desejado.",
            preco: 1250.00,
            estado: "disponivel",
            categoria_id: "1",
            categoria_nome: "Carnes & Grelhados",
            categoria_emoji: "🥩",
            imagem_url: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&auto=format&fit=crop&q=80",
            acompanhamentos_ids: ["1", "2", "3", "4", "5"],
            tem_promocao: true,
            preco_promocional: 990.00,
            hora_inicio_promo: "18:00",
            hora_fim_promo: "21:00",
            dias_semana_promo: "Seg a Sex",
            em_destaque: true,
            visivel_portal: true,
            total_comprados: 342,
            ficha_tecnica: [
                { stock_id: "1", stock_nome: "Picanha Bovina Maturada (kg)", quantidade: 0.35, unidade: "KG", custo_unitario: 750.00 },
                { stock_id: "2", stock_nome: "Arroz Basmati Premium (kg)", quantidade: 0.15, unidade: "KG", custo_unitario: 110.00 }
            ]
        },
        {
            id: "2",
            codigo_produto: "PRD-002",
            nome: "Hambúrguer Gourmet Artesanal",
            tipo: "comida",
            posto_id: "1",
            posto_nome: "Cozinha Principal",
            descricao: "Blend 200g, queijo cheddar fundido, cebola caramelizada e bacon crocante.",
            preco: 550.00,
            estado: "disponivel",
            categoria_id: "1",
            categoria_nome: "Carnes & Grelhados",
            categoria_emoji: "🥩",
            imagem_url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&auto=format&fit=crop&q=80",
            acompanhamentos_ids: ["1", "4", "6"],
            tem_promocao: false,
            preco_promocional: null,
            hora_inicio_promo: null,
            hora_fim_promo: null,
            dias_semana_promo: "Todos",
            em_destaque: true,
            visivel_portal: true,
            total_comprados: 512,
            ficha_tecnica: [
                { stock_id: "1", stock_nome: "Picanha Bovina Maturada (kg)", quantidade: 0.20, unidade: "KG", custo_unitario: 750.00 }
            ]
        }
    ],

    // 9. CLIENTES
    clientes: [
        {
            id: "1",
            codigo: "CLI-001",
            nome: "João Fernandes Silva",
            telefone: "+258 84 123 4567",
            email: "joao.silva@empresa.co.mz",
            nuit: "4001234567",
            nif: "4001234567",
            endereco: "Av. 24 de Julho, nº 1234, Maputo",
            morada: "Av. 24 de Julho, nº 1234, Maputo",
            obs: "Cliente VIP frequente aos almoços."
        },
        {
            id: "2",
            codigo: "CLI-002",
            nome: "Sociedade Comercial do Índico Lda",
            telefone: "+258 82 987 6543",
            email: "financeiro@indico.co.mz",
            nuit: "4008889991",
            nif: "4008889991",
            endereco: "Rua de Bagamoyo, Maputo",
            morada: "Rua de Bagamoyo, Maputo",
            obs: "Faturação mensal com NUIT."
        }
    ],

    // 10. FORNECEDORES
    fornecedores: [
        {
            id: "1",
            nome: "Talho & Carnes Nobres Maputo",
            nuit: "4001112223",
            nif: "4001112223",
            contacto: "Manuel Gonçalves",
            telefone: "+258 84 777 8888",
            email: "encomendas@carnesnobres.co.mz",
            morada: "Estrada Nacional nº 4, Matola"
        },
        {
            id: "2",
            nome: "Distribuidora Central de Bebidas Lda",
            nuit: "4003334445",
            nif: "4003334445",
            contacto: "Carla Tembe",
            telefone: "+258 82 333 4444",
            email: "vendas@distribuidorabebidas.co.mz",
            morada: "Av. das FPLM, Maputo"
        }
    ],

    // 11. STOCK
    stock: [
        { id: "1", nome: "Picanha Bovina Maturada (kg)", tipo: "comida", local: "armazem_principal", unidade: "KG", qtd: 45.0, minimo: 15.0, custo: 750.00 },
        { id: "2", nome: "Arroz Basmati Premium (kg)", tipo: "comida", local: "armazem_principal", unidade: "KG", qtd: 120.0, minimo: 30.0, custo: 110.00 },
        { id: "3", nome: "Cerveja 2M 330ml Garrafa", tipo: "bebida", local: "bar", unidade: "UN", qtd: 180.0, minimo: 48.0, custo: 55.00 }
    ],

    // 12. UTILIZADORES
    utilizadores: [
        {
            id: "1",
            codigo: "USR-001",
            nome: "Administrador Central",
            username: "admin",
            email: "admin@restaurante.com",
            perfil: "ADMIN_GERAL",
            restaurante_id: "1",
            estabelecimento_id: "1",
            ativo: true
        },
        {
            id: "2",
            codigo: "USR-002",
            nome: "Operador de Caixa 01",
            username: "caixa1",
            email: "caixa1@saborbrasa.com",
            perfil: "OPERADOR",
            restaurante_id: "1",
            estabelecimento_id: "1",
            ativo: true
        }
    ],

    // 13. PERFIS DE ACESSO
    perfis_acesso: [
        {
            id: "1",
            codigo: "PRF-001",
            nome: "ADMIN_GERAL",
            descricao: "Controle total da rede, configurações e finanças",
            cor: "purple",
            permissoes: ["dashboard", "pdv", "mesas", "vendas", "delivery", "piscina", "cozinha", "cardapio", "stock", "clientes", "utilizadores", "financeiro", "configuracoes"],
            ativo: true
        },
        {
            id: "2",
            codigo: "PRF-002",
            nome: "GESTOR",
            descricao: "Gestão do restaurante, cardápio, stock e clientes",
            cor: "blue",
            permissoes: ["dashboard", "pdv", "mesas", "vendas", "delivery", "piscina", "cozinha", "cardapio", "stock", "clientes", "financeiro"],
            ativo: true
        },
        {
            id: "3",
            codigo: "PRF-003",
            nome: "OPERADOR",
            descricao: "Operador de frente de caixa, PDV e atendimento a mesas",
            cor: "emerald",
            permissoes: ["pdv", "mesas", "vendas", "delivery"],
            ativo: true
        },
        {
            id: "4",
            codigo: "PRF-004",
            nome: "STOCK",
            descricao: "Gestão de compras, entradas e requisições de armazém",
            cor: "amber",
            permissoes: ["stock"],
            ativo: true
        },
        {
            id: "5",
            codigo: "PRF-005",
            nome: "RESPONSAVEL_PISCINA",
            descricao: "Gestão de bilheteira, acessos e parque aquático",
            cor: "sky",
            permissoes: ["piscina"],
            ativo: true
        }
    ],

    // 14. TABELAS DE APOIO
    unidades_medida: [
        { id: "1", codigo: "KG", nome: "Quilograma", permite_fracionamento: true },
        { id: "2", codigo: "G", nome: "Grama", permite_fracionamento: true },
        { id: "3", codigo: "LT", nome: "Litro", permite_fracionamento: true },
        { id: "4", codigo: "ML", nome: "Mililitro", permite_fracionamento: true },
        { id: "5", codigo: "UN", nome: "Unidade", permite_fracionamento: false }
    ],

    metodos_pagamento: [
        { id: "1", codigo: "NUMERARIO", nome: "Numerário / Dinheiro Físico", icone: "fa-solid fa-money-bill-wave", cor: "text-emerald-600", permite_troco: true, ativo: true },
        { id: "2", codigo: "POS", nome: "Cartão / POS Bancário", icone: "fa-solid fa-credit-card", cor: "text-blue-600", permite_troco: false, ativo: true },
        { id: "3", codigo: "MPESA", nome: "M-Pesa (Vodacom)", icone: "fa-solid fa-mobile-screen-button", cor: "text-red-600", permite_troco: false, ativo: true },
        { id: "4", codigo: "EMOLA", nome: "e-Mola (Movitel)", icone: "fa-solid fa-wallet", cor: "text-amber-500", permite_troco: false, ativo: true }
    ],

    taxas_iva: [
        { id: "1", codigo: "IVA-16", iva: 16.0, moeda: "MZN", descricao: "Taxa Normal de IVA Moçambique", ativo: true, padrao: true },
        { id: "2", codigo: "ISENTO", iva: 0.0, moeda: "MZN", descricao: "Isenção de IVA (Cesta Básica)", ativo: true, padrao: false }
    ],

    compras: [],
    guias: [],
    guias_entrada: [],
    requisicoes: [],
    movimentos_stock: [],
    pedidos_concluidos: [],
    tabela_precos_fornecedores: [],

    // 15. TABELAS ADICIONAIS GLOBAIS
    armazens: [
        { id: "1", codigo: "ARM-01", nome: "Armazém Geral Central", tipo: "GERAL", ativo: true },
        { id: "2", codigo: "ARM-02", nome: "Cozinha e Despensa de Insumos", tipo: "COZINHA", ativo: true },
        { id: "3", codigo: "ARM-03", nome: "Bar & Bebidas", tipo: "BAR", ativo: true }
    ],
    locais_armazenamento: [
        { id: "1", armazem_id: "1", codigo: "LOC-01", tipo_estrutura: "ESTANTE", descricao: "Estante Principal A1 - Secos & Enlatados", ativo: true },
        { id: "2", armazem_id: "2", codigo: "LOC-02", tipo_estrutura: "CAMARA_FRIA", descricao: "Câmara Frigorífica - Carnes & Mariscos", ativo: true },
        { id: "3", armazem_id: "3", codigo: "LOC-03", tipo_estrutura: "GELEIRA", descricao: "Geleira Expositora Bar - Refrigerantes & Cervejas", ativo: true }
    ],
    canais_pagamento: [
        { id: "1", codigo: "CP-01", codigo_operadora: "MPESA", descricao: "M-Pesa Restaurante Oficial", numero_associado: "+258 84 000 0000", titular_conta: "Rede Restaurante Lda", ativo: true },
        { id: "2", codigo: "CP-02", codigo_operadora: "EMOLA", descricao: "e-Mola Restaurante", numero_associado: "+258 86 000 0000", titular_conta: "Rede Restaurante Lda", ativo: true },
        { id: "3", codigo: "CP-03", codigo_operadora: "CONTA_MOVEL", descricao: "mKesh / BCI Conta Móvel", numero_associado: "+258 82 000 0000", titular_conta: "Rede Restaurante Lda", ativo: true }
    ],
    categorias_stock: [
        { id: "1", codigo: "CAT-STK-01", nome: "Carnes & Aves", descricao: "Cortes bovinos, suínos e aves frescas" },
        { id: "2", codigo: "CAT-STK-02", nome: "Mariscos & Peixes", descricao: "Camarão, lagosta e peixes da costa" },
        { id: "3", codigo: "CAT-STK-03", nome: "Bebidas & Refrigerantes", descricao: "Sumos, refrigerantes e água mineral" },
        { id: "4", codigo: "CAT-STK-04", nome: "Mercearia & Secos", descricao: "Arroz, farinha, especiarias e óleos" }
    ],
    caixas_sessoes: [
        { id: "1", codigo: "CXS-01", utilizador_id: "1", saldo_abertura: 1500.00, saldo_fecho: null, estado: "ABERTO", aberto_em: new Date().toISOString() }
    ],
    turnos_caixa: [],
    itens_compra: [],
    itens_guia_entrada: [],
    pedidos_vendas: [],
    itens_pedidos_vendas: [],
    pedidos_online: []
};

// =============================================================================
// PERSISTÊNCIA EM BASE DE DADOS (SUPABASE & BACKEND .NET) & LOCALSTORAGE
// =============================================================================
(function() {
    var STORAGE_KEY = 'REDE_RESTAURANTE_APP_DATA_V2';

    // 1. Carrega primeiro do localStorage para renderização instantânea (sem flicker)
    try {
        var salvo = localStorage.getItem(STORAGE_KEY);
        if (salvo) {
            var dados = JSON.parse(salvo);
            for (var k in dados) {
                if (dados.hasOwnProperty(k) && Array.isArray(dados[k])) {
                    window.RestauranteApp[k] = dados[k];
                }
            }
        }
    } catch (e) {
        console.warn('Aviso: falha ao ler localStorage local:', e);
    }

    var debounceTimer = null;

    // 2. Função global salvarEstado(): Atualiza instantaneamente a UI em < 5ms e sincroniza em background
    window.RestauranteApp.salvarEstado = function() {
        // Grava no localStorage local imediatamente (< 2ms de latência para a UI)
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(window.RestauranteApp));
        } catch (e) {
            console.warn('Aviso: erro ao gravar no localStorage:', e);
        }

        // Executa a persistência na base de dados de forma quase imediata (10ms) sem travar a interface
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(function() {
            window.RestauranteApp.sincronizarComBaseDeDados();
        }, 10);
    };

    // 3. Sincroniza e grava no Banco de Dados (Supabase & Backend .NET)
    window.RestauranteApp.sincronizarComBaseDeDados = async function() {
        var payload = {
            estabelecimentos: window.RestauranteApp.estabelecimentos || [],
            fornecedores: window.RestauranteApp.fornecedores || [],
            clientes: window.RestauranteApp.clientes || [],
            categorias: window.RestauranteApp.categorias || [],
            produtos: window.RestauranteApp.produtos || [],
            salas: window.RestauranteApp.salas || [],
            mesas: window.RestauranteApp.mesas || [],
            stock: window.RestauranteApp.stock || [],
            acompanhamentos: window.RestauranteApp.acompanhamentos || [],
            postos_preparacao: window.RestauranteApp.postos_preparacao || [],
            tipos_pedidos: window.RestauranteApp.tipos_pedidos || [],
            metodos_pagamento: window.RestauranteApp.metodos_pagamento || [],
            taxas_iva: window.RestauranteApp.taxas_iva || [],
            utilizadores: window.RestauranteApp.utilizadores || [],
            unidades_medida: window.RestauranteApp.unidades_medida || [],
            armazens: window.RestauranteApp.armazens || [],
            locais_armazenamento: window.RestauranteApp.locais_armazenamento || [],
            canais_pagamento: window.RestauranteApp.canais_pagamento || [],
            categorias_stock: window.RestauranteApp.categorias_stock || [],
            caixas_sessoes: window.RestauranteApp.caixas_sessoes || [],
            turnos_caixa: window.RestauranteApp.turnos_caixa || [],
            compras: window.RestauranteApp.compras || [],
            itens_compra: window.RestauranteApp.itens_compra || [],
            guias_entrada: (window.RestauranteApp.guias_entrada && window.RestauranteApp.guias_entrada.length > 0) ? window.RestauranteApp.guias_entrada : (window.RestauranteApp.guias || []),
            itens_guia_entrada: window.RestauranteApp.itens_guia_entrada || [],
            pedidos_vendas: (window.RestauranteApp.pedidos_vendas && window.RestauranteApp.pedidos_vendas.length > 0) ? window.RestauranteApp.pedidos_vendas : (window.RestauranteApp.vendas || []),
            itens_pedidos_vendas: window.RestauranteApp.itens_pedidos_vendas || [],
            pedidos_online: window.RestauranteApp.pedidos_online || []
        };

        try {
            var resp = await fetch('/api/db/sync', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (resp.ok) {
                console.log('✓ Cadastros gravados com sucesso na base de dados (Supabase/PostgreSQL).');
            } else {
                console.warn('Aviso ao sincronizar na base de dados:', resp.status);
            }
        } catch (err) {
            console.warn('Aviso ao conectar com a base de dados (offline/fallback):', err);
        }
    };

    // 4. Carrega os dados atualizados da Base de Dados ao abrir a página em background (não bloqueia a renderização)
    window.RestauranteApp.carregarDaBaseDeDados = async function() {
        try {
            var resp = await fetch('/api/db/state');
            if (resp.ok) {
                var dadosDb = await resp.json();
                var alterou = false;
                var tabelasVaziasNoBanco = false;

                for (var key in dadosDb) {
                    if (dadosDb.hasOwnProperty(key) && Array.isArray(dadosDb[key])) {
                        // Se a base de dados tem registos, actualiza o estado local
                        if (dadosDb[key].length > 0) {
                            window.RestauranteApp[key] = dadosDb[key];
                            alterou = true;
                        } else if (window.RestauranteApp[key] && window.RestauranteApp[key].length > 0) {
                            // Se a base de dados ainda estiver vazia nesta tabela mas o frontend tem dados iniciais, marca para semear o banco
                            tabelasVaziasNoBanco = true;
                        }
                    }
                }

                if (alterou) {
                    try {
                        localStorage.setItem(STORAGE_KEY, JSON.stringify(window.RestauranteApp));
                    } catch (e) {}
                    // Despacha evento informando que os dados da base de dados foram carregados
                    window.dispatchEvent(new CustomEvent('RestauranteAppDbReady', { detail: dadosDb }));
                }

                // Se identificou tabelas com dados no frontend mas vazias na base de dados, sincroniza imediatamente para popular o Supabase
                if (tabelasVaziasNoBanco) {
                    console.log('Populando tabelas vazias da base de dados com as informações do frontend...');
                    window.RestauranteApp.sincronizarComBaseDeDados();
                }
            }
            }
        } catch (e) {
            console.warn('Aviso: base de dados não contactada no arranque, a usar dados locais:', e);
        }
    };

    // Executa em segundo plano via requestIdleCallback ou microtask para não atrasar o primeiro frame da UI
    if (typeof window.requestIdleCallback === 'function') {
        window.requestIdleCallback(function() {
            window.RestauranteApp.carregarDaBaseDeDados();
        }, { timeout: 1000 });
    } else {
        setTimeout(function() {
            window.RestauranteApp.carregarDaBaseDeDados();
        }, 50);
    }

    // =========================================================================
    // 5. CLIENTE CRUD UNIVERSAL (Direct API REST para todas as tabelas)
    // =========================================================================
    window.RestauranteApp.crud = {
        listar: async function(tabela) {
            try {
                var resp = await fetch('/api/crud/' + encodeURIComponent(tabela));
                if (!resp.ok) throw new Error('HTTP ' + resp.status);
                return await resp.json();
            } catch (err) {
                console.error('[CRUD] Erro ao listar ' + tabela + ':', err);
                return window.RestauranteApp[tabela] || [];
            }
        },
        obter: async function(tabela, id) {
            try {
                var resp = await fetch('/api/crud/' + encodeURIComponent(tabela) + '/' + encodeURIComponent(id));
                if (!resp.ok) throw new Error('HTTP ' + resp.status);
                return await resp.json();
            } catch (err) {
                console.error('[CRUD] Erro ao obter ' + tabela + ' #' + id + ':', err);
                return null;
            }
        },
        criar: async function(tabela, dados) {
            try {
                var resp = await fetch('/api/crud/' + encodeURIComponent(tabela), {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dados)
                });
                var res = await resp.json();
                if (resp.ok) {
                    if (!window.RestauranteApp[tabela]) window.RestauranteApp[tabela] = [];
                    window.RestauranteApp[tabela].push(res.item || dados);
                    window.RestauranteApp.salvarEstado();
                }
                return res;
            } catch (err) {
                console.error('[CRUD] Erro ao criar em ' + tabela + ':', err);
                return { erro: err.message };
            }
        },
        atualizar: async function(tabela, id, dados) {
            try {
                var resp = await fetch('/api/crud/' + encodeURIComponent(tabela) + '/' + encodeURIComponent(id), {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dados)
                });
                var res = await resp.json();
                if (resp.ok) {
                    var lista = window.RestauranteApp[tabela];
                    if (Array.isArray(lista)) {
                        var idx = lista.findIndex(function(it) { return String(it.id) === String(id); });
                        if (idx !== -1) {
                            lista[idx] = Object.assign({}, lista[idx], res.item || dados);
                            window.RestauranteApp.salvarEstado();
                        }
                    }
                }
                return res;
            } catch (err) {
                console.error('[CRUD] Erro ao atualizar em ' + tabela + ' #' + id + ':', err);
                return { erro: err.message };
            }
        },
        eliminar: async function(tabela, id) {
            try {
                var resp = await fetch('/api/crud/' + encodeURIComponent(tabela) + '/' + encodeURIComponent(id), {
                    method: 'DELETE'
                });
                var res = await resp.json();
                if (resp.ok) {
                    var lista = window.RestauranteApp[tabela];
                    if (Array.isArray(lista)) {
                        window.RestauranteApp[tabela] = lista.filter(function(it) { return String(it.id) !== String(id); });
                        window.RestauranteApp.salvarEstado();
                    }
                }
                return res;
            } catch (err) {
                console.error('[CRUD] Erro ao eliminar de ' + tabela + ' #' + id + ':', err);
                return { erro: err.message };
            }
        }
    };
})();
