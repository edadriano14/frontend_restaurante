// =============================================================================
// ESTADO GLOBAL COMPLETO COM SALAS, MESAS, QR CODE E ACOMPANHAMENTOS SELECTIVOS
// =============================================================================

window.RestauranteApp = {
    // 1. ESTABELECIMENTOS
    estabelecimentos: [
        {
            id: "1",
            nome: "Restaurante Sabor & Brasa",
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
        { id: "1", nome: "Salão Principal Climatizado", descricao: "Área interna com ar condicionado", capacidade_mesas: 12 },
        { id: "2", nome: "Esplanada & Jardim", descricao: "Ambiente aberto ao ar livre", capacidade_mesas: 8 },
        { id: "3", nome: "Zona VIP / Reservados", descricao: "Espaço exclusivo para grupos e eventos", capacidade_mesas: 4 }
    ],

    // 3. MESAS COM QR CODE E RELACIONAMENTO COM SALAS
    mesas: [
        { id: "1", sala_id: "1", sala_nome: "Salão Principal Climatizado", numero_mesa: "Mesa 01", capacidade_lugares: 4, estado: "LIVRE", qrcode_token: "MESA-01-SB" },
        { id: "2", sala_id: "1", sala_nome: "Salão Principal Climatizado", numero_mesa: "Mesa 02", capacidade_lugares: 4, estado: "OCUPADA", qrcode_token: "MESA-02-SB" },
        { id: "3", sala_id: "1", sala_nome: "Salão Principal Climatizado", numero_mesa: "Mesa 03", capacidade_lugares: 6, estado: "LIVRE", qrcode_token: "MESA-03-SB" },
        { id: "4", sala_id: "1", sala_nome: "Salão Principal Climatizado", numero_mesa: "Mesa 04", capacidade_lugares: 2, estado: "LIVRE", qrcode_token: "MESA-04-SB" },
        { id: "5", sala_id: "2", sala_nome: "Esplanada & Jardim", numero_mesa: "Mesa 10 (Jardim)", capacidade_lugares: 4, estado: "LIVRE", qrcode_token: "MESA-10-SB" },
        { id: "6", sala_id: "2", sala_nome: "Esplanada & Jardim", numero_mesa: "Mesa 11 (Jardim)", capacidade_lugares: 4, estado: "RESERVADA", qrcode_token: "MESA-11-SB" },
        { id: "7", sala_id: "3", sala_nome: "Zona VIP / Reservados", numero_mesa: "Camarote VIP 01", capacidade_lugares: 8, estado: "LIVRE", qrcode_token: "VIP-01-SB" }
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

    // 6. ACOMPANHAMENTOS: SELECTIVOS (Saem por defeito no prato) vs OPCIONAIS (Pagos)
    acompanhamentos: [
        // Selectivos: saem por defeito, cliente escolhe ou substitui sem acréscimo
        { id: "1", nome: "Batata Frita Rústica", tipo: "selectivo", preco_adicional: 0.00, padrao: true, disponivel: true },
        { id: "2", nome: "Arroz de Alho & Coentros", tipo: "selectivo", preco_adicional: 0.00, padrao: true, disponivel: true },
        { id: "3", nome: "Salada Mista Fresca", tipo: "selectivo", preco_adicional: 0.00, padrao: false, disponivel: true },
        // Opcionais: adicionais extras pagos
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

    // 8. PRODUTOS (Com Tipo, Posto, Galeria e Acompanhamentos)
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
        },
        {
            id: "3",
            codigo_produto: "PRD-003",
            nome: "Mojito Clássico Cubano",
            tipo: "bebida",
            posto_id: "3",
            posto_nome: "Bar & Balcão de Bebidas",
            descricao: "Rum branco, hortelã fresca, sumo de lima, açúcar e água com gás.",
            preco: 320.00,
            estado: "disponivel",
            categoria_id: "2",
            categoria_nome: "Bebidas & Cocktails",
            categoria_emoji: "🍹",
            imagem_url: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&auto=format&fit=crop&q=80",
            acompanhamentos_ids: [],
            tem_promocao: true,
            preco_promocional: 250.00,
            hora_inicio_promo: "17:00",
            hora_fim_promo: "19:30",
            dias_semana_promo: "Qui, Sex, Sáb",
            em_destaque: false,
            visivel_portal: true,
            total_comprados: 188,
            ficha_tecnica: [
                { stock_id: "3", stock_nome: "Vodka Premium 750ml", quantidade: 0.05, unidade: "UN", custo_unitario: 1100.00 }
            ]
        },
        {
            id: "4",
            codigo_produto: "PRD-004",
            nome: "Cheesecake de Frutos Vermelhos",
            tipo: "sobremesa",
            posto_id: "2",
            posto_nome: "Pastelaria & Sobremesas",
            descricao: "Base de bolacha crocante com creme aveludado e coulis de frutos vermelhos.",
            preco: 380.00,
            estado: "disponivel",
            categoria_id: "4",
            categoria_nome: "Sobremesas & Pastelaria",
            categoria_emoji: "🍰",
            imagem_url: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&auto=format&fit=crop&q=80",
            acompanhamentos_ids: [],
            tem_promocao: false,
            preco_promocional: null,
            hora_inicio_promo: null,
            hora_fim_promo: null,
            dias_semana_promo: "Todos",
            em_destaque: true,
            visivel_portal: true,
            total_comprados: 215,
            ficha_tecnica: []
        },
        {
            id: "5",
            codigo_produto: "PRD-005",
            nome: "Cerveja 2M Especial 330ml",
            tipo: "bebida",
            posto_id: "3",
            posto_nome: "Bar & Balcão de Bebidas",
            descricao: "Cerveja moçambicana gelada de alta qualidade.",
            preco: 70.00,
            estado: "disponivel",
            categoria_id: "2",
            categoria_nome: "Bebidas & Cocktails",
            categoria_emoji: "🍹",
            imagem_url: "https://images.unsplash.com/photo-1608270199042-999335eb10fe?w=400&auto=format&fit=crop&q=80",
            acompanhamentos_ids: [],
            tem_promocao: false,
            preco_promocional: null,
            hora_inicio_promo: null,
            hora_fim_promo: null,
            dias_semana_promo: "Todos",
            em_destaque: true,
            visivel_portal: true,
            total_comprados: 420,
            ficha_tecnica: [
                { stock_id: "7", stock_nome: "Cerveja 2M Especial 330ml", quantidade: 1, unidade: "UN", custo_unitario: 40.00 }
            ]
        },
        {
            id: "6",
            codigo_produto: "PRD-006",
            nome: "Cerveja Laurentina",
            tipo: "bebida",
            posto_id: "3",
            posto_nome: "Bar & Balcão de Bebidas",
            descricao: "A cerveja preta e clara de Moçambique com sabor tradicional.",
            preco: 100.00,
            estado: "disponivel",
            categoria_id: "2",
            categoria_nome: "Bebidas & Cocktails",
            categoria_emoji: "🍹",
            imagem_url: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=400&auto=format&fit=crop&q=80",
            acompanhamentos_ids: [],
            tem_promocao: false,
            preco_promocional: null,
            hora_inicio_promo: null,
            hora_fim_promo: null,
            dias_semana_promo: "Todos",
            em_destaque: false,
            visivel_portal: true,
            total_comprados: 310,
            ficha_tecnica: [
                { stock_id: "6", stock_nome: "Cerveja Laurentina", quantidade: 1, unidade: "UN", custo_unitario: 60.00 }
            ]
        },
        {
            id: "7",
            codigo_produto: "PRD-007",
            nome: "Refrigerante Coca-Cola",
            tipo: "bebida",
            posto_id: "3",
            posto_nome: "Bar & Balcão de Bebidas",
            descricao: "Lata 330ml servida bem fresca com gelo e limão.",
            preco: 50.00,
            estado: "disponivel",
            categoria_id: "2",
            categoria_nome: "Bebidas & Cocktails",
            categoria_emoji: "🍹",
            imagem_url: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&auto=format&fit=crop&q=80",
            acompanhamentos_ids: [],
            tem_promocao: false,
            preco_promocional: null,
            hora_inicio_promo: null,
            hora_fim_promo: null,
            dias_semana_promo: "Todos",
            em_destaque: true,
            visivel_portal: true,
            total_comprados: 580,
            ficha_tecnica: [
                { stock_id: "8", stock_nome: "Refrigerante Coca-Cola", quantidade: 1, unidade: "UN", custo_unitario: 19.17 }
            ]
        },
        {
            id: "8",
            codigo_produto: "PRD-008",
            nome: "Água Mineral",
            tipo: "bebida",
            posto_id: "3",
            posto_nome: "Bar & Balcão de Bebidas",
            descricao: "Garrafa de água mineral natural 500ml bem fresca.",
            preco: 25.00,
            estado: "disponivel",
            categoria_id: "2",
            categoria_nome: "Bebidas & Cocktails",
            categoria_emoji: "🍹",
            imagem_url: "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=400&auto=format&fit=crop&q=80",
            acompanhamentos_ids: [],
            tem_promocao: false,
            preco_promocional: null,
            hora_inicio_promo: null,
            hora_fim_promo: null,
            dias_semana_promo: "Todos",
            em_destaque: false,
            visivel_portal: true,
            total_comprados: 690,
            ficha_tecnica: [
                { stock_id: "9", stock_nome: "Água Mineral", quantidade: 1, unidade: "UN", custo_unitario: 15.00 }
            ]
        }
    ],

    // 9. STOCK ORGANIZADO POR TIPO, ESTANTES, PRATELEIRAS, GELEIRAS/CONGELADORES
    stock: [
        {
            id: "1",
            nome: "Picanha Bovina Maturada (kg)",
            tipo: "comida",
            unidade: "KG",
            qtd: 45.5,
            minimo: 15.0,
            custo: 750.00,
            local: "armazem_principal",
            estante: "Estante A",
            prateleira: "Prateleira 02",
            refrigeracao: "Câmara Fria 01"
        },
        {
            id: "2",
            nome: "Arroz Basmati Premium (kg)",
            tipo: "comida",
            unidade: "KG",
            qtd: 80.0,
            minimo: 20.0,
            custo: 110.00,
            local: "armazem_principal",
            estante: "Estante C",
            prateleira: "Prateleira 01",
            refrigeracao: "Temperatura Ambiente"
        },
        {
            id: "3",
            nome: "Vodka Premium 750ml",
            tipo: "bebida",
            unidade: "UN",
            qtd: 28.0,
            minimo: 8.0,
            custo: 1100.00,
            local: "bar",
            estante: "Balcão Bar",
            prateleira: "Prateleira Superior",
            refrigeracao: "Geleira Bar 01"
        },
        {
            id: "4",
            nome: "Cerveja Especial 330ml",
            tipo: "bebida",
            unidade: "UN",
            qtd: 120.0,
            minimo: 36.0,
            custo: 65.00,
            local: "bar",
            estante: "Depósito Bar",
            prateleira: "Fila 01",
            refrigeracao: "Geleira Expositora 02"
        },
        {
            id: "5",
            nome: "Polpa de Morango Congelada (kg)",
            tipo: "sobremesa",
            unidade: "KG",
            qtd: 12.0,
            minimo: 5.0,
            custo: 350.00,
            local: "pastelaria",
            estante: "Pastelaria",
            prateleira: "Gaveta 03",
            refrigeracao: "Congelador Pastelaria"
        },
        {
            id: "6",
            nome: "Cerveja Laurentina",
            tipo: "bebida",
            unidade: "UN",
            qtd: 48.0,
            minimo: 12.0,
            custo: 60.00,
            local: "bar",
            estante: "Depósito Bar",
            prateleira: "Prateleira 01",
            refrigeracao: "Geleira Bar 01"
        },
        {
            id: "7",
            nome: "Cerveja 2M Especial 330ml",
            tipo: "bebida",
            unidade: "UN",
            qtd: 50.0,
            minimo: 15.0,
            custo: 40.00,
            local: "bar",
            estante: "Depósito Bar",
            prateleira: "Prateleira 02",
            refrigeracao: "Geleira Bar 01"
        },
        {
            id: "8",
            nome: "Refrigerante Coca-Cola",
            tipo: "bebida",
            unidade: "UN",
            qtd: 60.0,
            minimo: 20.0,
            custo: 19.17,
            local: "bar",
            estante: "Depósito Bar",
            prateleira: "Prateleira 03",
            refrigeracao: "Geleira Bar 02"
        },
        {
            id: "9",
            nome: "Água Mineral",
            tipo: "bebida",
            unidade: "UN",
            qtd: 80.0,
            minimo: 24.0,
            custo: 15.00,
            local: "bar",
            estante: "Depósito Bar",
            prateleira: "Prateleira 04",
            refrigeracao: "Geleira Bar 02"
        },
        {
            id: "10",
            nome: "Manica Cerveja",
            tipo: "bebida",
            unidade: "UN",
            qtd: 35.0,
            minimo: 12.0,
            custo: 50.00,
            local: "bar",
            estante: "Depósito Bar",
            prateleira: "Prateleira 02",
            refrigeracao: "Geleira Bar 01"
        }
    ],

    // 10. TRANSFERÊNCIAS DE STOCK (SAÍDAS DO ARMAZÉM PRINCIPAL)
    transferencias: [
        {
            id: "1",
            data: "20/10/2026 10:30",
            item: "Picanha Bovina Maturada (kg)",
            qtd: 15.0,
            origem: "Armazém Principal",
            destino: "Cozinha",
            responsavel: "Chefe João"
        },
        {
            id: "2",
            data: "20/10/2026 11:15",
            item: "Cerveja Especial 330ml",
            qtd: 48.0,
            origem: "Armazém Principal",
            destino: "Bar",
            responsavel: "Bartender Paulo"
        }
    ],

    // 11. GUIAS DE ENTRADA
    guias: [
        {
            id: "1",
            numero_guia: "GUI-2026-001",
            fornecedor_id: "1",
            fornecedor_nome: "Carnes do Sul Lda",
            data_emissao: "19/10/2026",
            total: 37500.00,
            status: "RECEBIDO_INTEGRAL",
            itens: [
                { item_nome: "Picanha Bovina Maturada (kg)", qtd: 50, preco_custo: 750.00 }
            ]
        }
    ],

    // 12. FORNECEDORES
    fornecedores: [
        { id: "1", nome: "Carnes do Sul Lda", nif: "400192831", telefone: "+258 84 111 2222", email: "pedidos@carnesdosul.co.mz" },
        { id: "2", nome: "Distribuidora de Bebidas Maputo", nif: "400876543", telefone: "+258 82 333 4444", email: "vendas@bebidasmaputo.co.mz" }
    ],

    // 13. CLIENTES
    clientes: [
        { id: "1", nome: "Carlos Mendonça", telefone: "+258 84 999 1111", email: "carlos.m@gmail.com", nif: "100234567" },
        { id: "2", nome: "Ana Sofia Macamo", telefone: "+258 87 222 3333", email: "ana.macamo@hotmail.com", nif: "100987654" }
    ],

    // 14. UTILIZADORES
    utilizadores: [
        { id: "1", codigo: "USR-001", nome: "Administrador Central", email: "admin@saborbrasa.com", restaurante_id: "1", perfil: "ADMIN_GERAL", perfil_id: "1", ativo: true },
        { id: "2", codigo: "USR-002", nome: "Operador de Caixa 01", email: "caixa1@saborbrasa.com", restaurante_id: "1", perfil: "OPERADOR", perfil_id: "3", ativo: true },
        { id: "3", codigo: "USR-003", nome: "Gestor Mariscos Costa", email: "gestor@mariscos.co.mz", restaurante_id: "2", perfil: "GESTOR", perfil_id: "2", ativo: true }
    ],

    // 14.1 PERFIS DE ACESSO & PERMISSÕES
    perfis_acesso: [
        {
            id: "1",
            codigo: "PRF-ADM",
            nome: "ADMIN_GERAL",
            descricao: "Acesso irrestrito a todos os módulos, configurações da rede, relatórios e permissões.",
            cor: "purple",
            permissoes: ["dashboard", "pdv", "mesas", "vendas", "delivery", "piscina", "cozinha", "cardapio", "stock", "clientes", "utilizadores", "financeiro", "configuracoes"],
            ativo: true
        },
        {
            id: "2",
            codigo: "PRF-GES",
            nome: "GESTOR",
            descricao: "Gestão operacional do restaurante, acompanhamento de vendas, mesas, stock e fechos.",
            cor: "blue",
            permissoes: ["dashboard", "pdv", "mesas", "vendas", "delivery", "piscina", "cozinha", "cardapio", "stock", "clientes", "financeiro"],
            ativo: true
        },
        {
            id: "3",
            codigo: "PRF-OPE",
            nome: "OPERADOR",
            descricao: "Operação diária de caixa, vendas balcão, registo de mesas e pedidos no PDV.",
            cor: "emerald",
            permissoes: ["pdv", "mesas", "vendas", "delivery"],
            ativo: true
        },
        {
            id: "4",
            codigo: "PRF-STK",
            nome: "STOCK",
            descricao: "Controlo de inventário, guias de entrada, transferências de armazém e fornecedores.",
            cor: "amber",
            permissoes: ["stock"],
            ativo: true
        },
        {
            id: "5",
            codigo: "PRF-PSC",
            nome: "RESPONSAVEL_PISCINA",
            descricao: "Emissão de bilhetes, controlo de acessos, aluguer de espreguiçadeiras e análises da água.",
            cor: "sky",
            permissoes: ["piscina"],
            ativo: true
        }
    ],

    // 15. CANAIS DE PAGAMENTO MÓVEL / CARTEIRAS ELETRÓNICAS
    canais_pagamento: [
        {
            id: "1",
            codigo_operadora: "MPESA",
            descricao: "M-Pesa (Vodacom)",
            numero_associado: "840000000",
            titular_conta: "Restaurante Sabor & Brasa Lda",
            instrucoes: "Envie o valor exato para o número e guarde a mensagem de confirmação para validação do pedido.",
            ativo: true
        },
        {
            id: "2",
            codigo_operadora: "EMOLA",
            descricao: "e-Mola (Movitel)",
            numero_associado: "860000000",
            titular_conta: "Restaurante Sabor & Brasa Lda",
            instrucoes: "Transfira via e-Mola usando o código do restaurante ou número indicado.",
            ativo: true
        },
        {
            id: "3",
            codigo_operadora: "CONTA_MOVEL",
            descricao: "Conta Móvel (Tmcel)",
            numero_associado: "820000000",
            titular_conta: "Restaurante Sabor & Brasa Lda",
            instrucoes: "Pagamento direto via telemóvel Tmcel.",
            ativo: true
        },
        {
            id: "4",
            codigo_operadora: "POS",
            descricao: "TPA / Cartão Débito & Crédito",
            numero_associado: "Terminal POS Balcão",
            titular_conta: "Restaurante Sabor & Brasa Lda",
            instrucoes: "Pagamento presencial no ato de entrega ou na recolha ao balcão.",
            ativo: true
        }
    ],

    // 16. PEDIDOS ONLINE (CLIENTES WEB / QR CODE)
    pedidos_online: [
        {
            id: "1",
            numero_pedido: "PED-ONL-101",
            cliente_nome: "Armando Nhaca",
            cliente_telefone: "+258 84 987 6543",
            tipo_entrega: "MESA",
            mesa_id: "1",
            numero_mesa: "Mesa 01",
            endereco_entrega: "Salão Principal - Mesa 01",
            operadora_pagamento: "MPESA",
            referencia_pagamento: "TXN-849204829",
            itens: [
                { produto_id: "1", produto_nome: "Picanha na Brasa com Mandioca e Feijão Tropeiro", qtd: 2, preco: 950.00, subtotal: 1900.00, stock_id: "1" },
                { produto_id: "3", produto_nome: "Cerveja 2M Especial Gelada 330ml", qtd: 3, preco: 120.00, subtotal: 360.00, stock_id: "3" }
            ],
            subtotal: 2260.00,
            taxa_entrega: 0.00,
            total: 2260.00,
            estado: "PENDENTE_VALIDACAO",
            stock_deduzido: false,
            data_pedido: "21/10/2026 05:20"
        },
        {
            id: "2",
            numero_pedido: "PED-ONL-102",
            cliente_nome: "Beatriz Langa",
            cliente_telefone: "+258 82 444 8888",
            tipo_entrega: "DELIVERY",
            mesa_id: null,
            numero_mesa: "-",
            endereco_entrega: "Bairro Polana Cimento, Rua de Kassuende nº 45, 2º Andar",
            operadora_pagamento: "EMOLA",
            referencia_pagamento: "EM-5519280",
            itens: [
                { produto_id: "2", produto_nome: "Arroz de Camarão da Costa do Sol", qtd: 1, preco: 850.00, subtotal: 850.00, stock_id: "2" },
                { produto_id: "4", produto_nome: "Tarte Quente de Maçã e Canela", qtd: 2, preco: 250.00, subtotal: 500.00, stock_id: "4" }
            ],
            subtotal: 1350.00,
            taxa_entrega: 150.00,
            total: 1500.00,
            estado: "VALIDADO",
            stock_deduzido: true,
            data_pedido: "21/10/2026 05:10"
        }
    ],

    // 17. MÉTODOS DE PAGAMENTO (DISPONÍVEIS NO PDV E BALCÃO)
    metodos_pagamento: [
        { id: "1", codigo: "DIN", nome: "Dinheiro (Numerário)", icone: "fa-solid fa-money-bill-wave", cor: "text-green-600", permite_troco: true, ativo: true },
        { id: "2", codigo: "CARTAO", nome: "Cartão / Terminal POS", icone: "fa-solid fa-credit-card", cor: "text-blue-600", permite_troco: false, ativo: true },
        { id: "3", codigo: "MPESA", nome: "M-Pesa (Vodacom)", icone: "fa-solid fa-mobile-screen", cor: "text-red-600", permite_troco: false, ativo: true },
        { id: "4", codigo: "EMOLA", nome: "e-Mola (Movitel)", icone: "fa-solid fa-mobile-screen-button", cor: "text-yellow-600", permite_troco: false, ativo: true },
        { id: "5", codigo: "CONTA_MOVEL", nome: "Conta Móvel (Tmcel)", icone: "fa-solid fa-phone-volume", cor: "text-orange-600", permite_troco: false, ativo: true }
    ],

    // 18. TAXAS DE IVA (IMPOSTO SOBRE VALOR ACRESCENTADO)
    taxas_iva: [
        { id: "1", codigo: "IVA-16", iva: 16.00, moeda: "MZN", descricao: "Taxa Normal de IVA (16%)", ativo: true, padrao: true },
        { id: "2", codigo: "IVA-0", iva: 0.00, moeda: "MZN", descricao: "Taxa Isenta de IVA (0%) - Cesta Básica", ativo: true, padrao: false },
        { id: "3", codigo: "IVA-5", iva: 5.00, moeda: "MZN", descricao: "Taxa Reduzida (5%)", ativo: true, padrao: false }
    ],

    // 19. UNIDADES DE MEDIDA
    unidades_medida: [
        { id: "1", codigo: "KG", nome: "Quilograma", permite_decimal: true },
        { id: "2", codigo: "G", nome: "Gramas", permite_decimal: true },
        { id: "3", codigo: "LT", nome: "Litro", permite_decimal: true },
        { id: "4", codigo: "ML", nome: "Mililitros", permite_decimal: true },
        { id: "5", codigo: "UN", nome: "Unidade", permite_decimal: false },
        { id: "6", codigo: "CX", nome: "Caixa", permite_decimal: false },
        { id: "7", codigo: "DOSE", nome: "Dose / Garrafa", permite_decimal: false }
    ],

    // 20. ARMAZÉNS
    armazens: [
        { id: "1", codigo: "ARM-PRI", nome: "Armazém Principal Central", tipo: "Logística Geral", localizacao: "Piso Inferior" },
        { id: "2", codigo: "ARM-BAR", nome: "Depósito de Bar & Garrafeira", tipo: "Bebidas", localizacao: "Atrás do Balcão" },
        { id: "3", codigo: "ARM-COZ", nome: "Despensa da Cozinha", tipo: "Alimentos Secos", localizacao: "Anexo à Cozinha" }
    ],

    // 21. LOCAIS DE ARMAZENAMENTO FÍSICOS
    locais_armazenamento: [
        { id: "1", codigo: "CF-01", armazem_nome: "Armazém Principal Central", descricao: "Câmara Fria 01 (Carnes)", tipo: "CAMARA_FRIA" },
        { id: "2", codigo: "EST-A", armazem_nome: "Armazém Principal Central", descricao: "Estante A - Prateleira 02", tipo: "ESTANTE" },
        { id: "3", codigo: "EST-C", armazem_nome: "Armazém Principal Central", descricao: "Estante C - Prateleira 01", tipo: "ESTANTE" },
        { id: "4", codigo: "GEL-01", armazem_nome: "Depósito de Bar & Garrafeira", descricao: "Geleira Expositora Bar 01", tipo: "GELEIRA" },
        { id: "5", codigo: "CONG-01", armazem_nome: "Despensa da Cozinha", descricao: "Congelador de Sobremesas", tipo: "CONGELADOR" }
    ],

    // 22. HISTÓRICO DE VENDAS
    vendas: [
        {
            id: "1",
            numero: "VND-1048",
            data_hora: "21/10/2026 13:45",
            tipo_pedido: "Mesa",
            mesa_local: "Salão Principal • Mesa 03",
            metodo_pagamento: "M-Pesa (Vodacom)",
            total: 1890.00,
            estado: "PAGO",
            itens: [
                { id: "1", nome: "Picanha Especial na Brasa", qtd: 1, preco: 1250.00, opcoes: "Mandioca Frita" },
                { id: "3", nome: "Mojito Clássico Cubano", qtd: 2, preco: 320.00, opcoes: "" }
            ]
        },
        {
            id: "2",
            numero: "VND-1047",
            data_hora: "21/10/2026 13:10",
            tipo_pedido: "Takeaway",
            mesa_local: "Balcão",
            metodo_pagamento: "Cartão / Terminal POS",
            total: 930.00,
            estado: "PAGO",
            itens: [
                { id: "2", nome: "Hambúrguer Gourmet Artesanal", qtd: 1, preco: 550.00, opcoes: "Batata Frita Rústica" },
                { id: "4", nome: "Cheesecake de Frutos Vermelhos", qtd: 1, preco: 380.00, opcoes: "" }
            ]
        },
        {
            id: "3",
            numero: "VND-1046",
            data_hora: "21/10/2026 12:30",
            tipo_pedido: "Delivery",
            mesa_local: "Polana Cimento, Rua Kassuende nº 45",
            metodo_pagamento: "e-Mola (Movitel)",
            total: 1400.00,
            estado: "PAGO",
            itens: [
                { id: "1", nome: "Picanha Especial na Brasa", qtd: 1, preco: 1250.00, opcoes: "Arroz Branco" }
            ]
        }
    ],

    // 23. MOVIMENTOS DE STOCK (ENTRADAS, SAÍDAS, TRANSFERÊNCIAS, BAIXAS)
    movimentos_stock: [
        {
            id: "1",
            data_hora: "21/10/2026 13:45",
            tipo: "SAIDA_VENDA",
            item_nome: "Picanha Bovina Maturada (kg)",
            quantidade: 1,
            motivo: "Venda VND-1048 (Mesa)",
            responsavel: "Operador de Caixa 01"
        },
        {
            id: "2",
            data_hora: "21/10/2026 12:15",
            tipo: "SAIDA_PRODUCAO",
            item_nome: "Arroz Basmati Premium (kg)",
            quantidade: 5,
            motivo: "Envio para Cozinha (Produção Almoço)",
            responsavel: "Chefe de Cozinha"
        },
        {
            id: "3",
            data_hora: "21/10/2026 10:00",
            tipo: "ENTRADA_GUIA",
            item_nome: "Picanha Bovina Maturada (kg)",
            quantidade: 50,
            motivo: "Recepção com Guia GE-2026/0441 (Carnes do Sul Lda)",
            responsavel: "Gestor Mariscos Costa"
        },
        {
            id: "4",
            data_hora: "20/10/2026 17:30",
            tipo: "TRANSFERENCIA",
            item_nome: "Vodka Premium 750ml",
            quantidade: 6,
            motivo: "Transferência Armazém Principal -> Bar",
            responsavel: "Operador Bar"
        }
    ],

    // 24. PEDIDOS DA COZINHA (KDS - KITCHEN DISPLAY SYSTEM)
    pedidos_cozinha: [
        {
            id: "1",
            numero: "CZ-108",
            origem: "PDV",
            tipo: "Mesa",
            localizacao: "Salão Principal • Mesa 02",
            hora: "13:50",
            estado: "EM_PREPARACAO", // PENDENTE, EM_PREPARACAO, PRONTO, ENTREGUE
            itens: [
                { nome: "Picanha Especial na Brasa", qtd: 2, opcoes: "1x Bem Passada, 1x Ao Ponto", posto: "Cozinha Principal" },
                { nome: "Hambúrguer Gourmet Artesanal", qtd: 1, opcoes: "Sem Cebola Caramelizada", posto: "Grelha & Churrasqueira" }
            ]
        },
        {
            id: "2",
            numero: "CZ-109",
            origem: "Portal Online",
            tipo: "Delivery",
            localizacao: "Av. Julius Nyerere, Edifício Jat V",
            hora: "13:55",
            estado: "PENDENTE",
            itens: [
                { nome: "Picanha Especial na Brasa", qtd: 1, opcoes: "Mandioca Frita | Ponto Médio", posto: "Cozinha Principal" },
                { nome: "Cheesecake de Frutos Vermelhos", qtd: 2, opcoes: "", posto: "Pastelaria & Sobremesas" }
            ]
        },
        {
            id: "3",
            numero: "CZ-107",
            origem: "PDV",
            tipo: "Mesa",
            localizacao: "Esplanada • Mesa 08",
            hora: "13:30",
            estado: "PRONTO",
            itens: [
                { nome: "Cerveja 2M Especial Gelada 330ml", qtd: 4, opcoes: "", posto: "Bar & Balcão de Bebidas" }
            ]
        }
    ],

    // 25. REQUISIÇÕES DE COMPRA (AGUARDANDO RECEBIMENTO)
    requisicoes: [
        {
            id: "1",
            numero_requisicao: "REQ-2026/089",
            fornecedor: "Carnes do Sul Lda",
            data_pedido: "21/10/2026",
            total_estimado: 15000.00,
            status: "AGUARDANDO_RECEBIMENTO",
            itens: [
                { item_id: "1", nome: "Picanha Bovina Maturada (kg)", qtd_solicitada: 20 }
            ]
        },
        {
            id: "2",
            numero_requisicao: "REQ-2026/090",
            fornecedor: "Distribuidora de Bebidas Maputo",
            data_pedido: "21/10/2026",
            total_estimado: 8800.00,
            status: "AGUARDANDO_RECEBIMENTO",
            itens: [
                { item_id: "3", nome: "Vodka Premium 750ml", qtd_solicitada: 8 }
            ]
        }
    ],

    // 26. TABELA DE PREÇOS DE FORNECEDORES (BEBIDAS, ÁGUAS, VINHOS, CARNES) - 4ª IMAGEM
    tabela_precos_fornecedores: [
        { id: "1", produto_id: "8", produto_nome: "Água Mineral", fornecedor_id: "2", fornecedor_nome: "Distribuidora de Bebidas Maputo", custo_atual: 15.00, custo_atual_stock: 15.00, preco_caixa: 360.00, unidades_caixa: 24, unidades_por_caixa: 24, custo_unitario: 15.00, custo_unitario_calculado: 15.00, preco_venda_sugerido: 25.00 },
        { id: "2", produto_id: "7", produto_nome: "Refrigerante Coca-Cola", fornecedor_id: "2", fornecedor_nome: "Distribuidora de Bebidas Maputo", custo_atual: 40.00, custo_atual_stock: 40.00, preco_caixa: 460.00, unidades_caixa: 24, unidades_por_caixa: 24, custo_unitario: 19.17, custo_unitario_calculado: 19.17, preco_venda_sugerido: 50.00 },
        { id: "3", produto_id: "6", produto_nome: "Cerveja Laurentina", fornecedor_id: "2", fornecedor_nome: "Distribuidora de Bebidas Maputo", custo_atual: 60.00, custo_atual_stock: 60.00, preco_caixa: 720.00, unidades_caixa: 12, unidades_por_caixa: 12, custo_unitario: 60.00, custo_unitario_calculado: 60.00, preco_venda_sugerido: 100.00 },
        { id: "4", produto_id: "5", produto_nome: "Cerveja 2M Especial 330ml", fornecedor_id: "2", fornecedor_nome: "Distribuidora de Bebidas Maputo", custo_atual: 45.00, custo_atual_stock: 45.00, preco_caixa: 960.00, unidades_caixa: 24, unidades_por_caixa: 24, custo_unitario: 40.00, custo_unitario_calculado: 40.00, preco_venda_sugerido: 70.00 },
        { id: "5", produto_id: "prd-manica", produto_nome: "Manica Cerveja", fornecedor_id: "2", fornecedor_nome: "Distribuidora de Bebidas Maputo", custo_atual: 35.00, custo_atual_stock: 35.00, preco_caixa: 1200.00, unidades_caixa: 24, unidades_por_caixa: 24, custo_unitario: 50.00, custo_unitario_calculado: 50.00, preco_venda_sugerido: 80.00 },
        { id: "6", produto_id: "prd-peixe", produto_nome: "Peixe Pedra", fornecedor_id: "1", fornecedor_nome: "Carnes do Sul Lda", custo_atual: 90.00, custo_atual_stock: 90.00, preco_caixa: 900.00, unidades_caixa: 10, unidades_por_caixa: 10, custo_unitario: 90.00, custo_unitario_calculado: 90.00, preco_venda_sugerido: 180.00 },
        { id: "7", produto_id: "prd-frango", produto_nome: "Frango Grelhado (kg)", fornecedor_id: "1", fornecedor_nome: "Carnes do Sul Lda", custo_atual: 30.00, custo_atual_stock: 30.00, preco_caixa: 300.00, unidades_caixa: 10, unidades_por_caixa: 10, custo_unitario: 30.00, custo_unitario_calculado: 30.00, preco_venda_sugerido: 70.00 },
        { id: "8", produto_id: "prd-pao", produto_nome: "Pão de Hambúrguer", fornecedor_id: "1", fornecedor_nome: "Carnes do Sul Lda", custo_atual: 7.20, custo_atual_stock: 7.20, preco_caixa: 144.00, unidades_caixa: 20, unidades_por_caixa: 20, custo_unitario: 7.20, custo_unitario_calculado: 7.20, preco_venda_sugerido: 15.00 }
    ],

    // 27. TIPOS DE VEÍCULOS DELIVERY
    tipos_veiculos: [
        { id: "1", codigo: "TP-MOTO", tipo: "Motociclo / Mota", capacidade_carga_kg: 35, autonomia_km: 250, caracteristicas: "Mochila térmica acoplada, rápida no trânsito urbano" },
        { id: "2", codigo: "TP-CARRO", tipo: "Automóvel Ligeiro", capacidade_carga_kg: 200, autonomia_km: 500, caracteristicas: "Caixa isotérmica traseira, transporte de grandes encomendas" },
        { id: "3", codigo: "TP-SCOOTER", tipo: "Scooter Eléctrica", capacidade_carga_kg: 20, autonomia_km: 70, caracteristicas: "Ecológica para entregas de curta distância no centro" }
    ],

    // 28. VEÍCULOS DE ENTREGA (FROTAS)
    veiculos_delivery: [
        {
            id: "1",
            codigo: "VEI-01",
            tipo_id: "1",
            tipo_nome: "Motociclo / Mota",
            matricula: "AFM-492-MC",
            marca_modelo: "Honda Ace 125 CC",
            ano: 2024,
            cor: "Vermelho & Branco",
            imagem_url: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=300&auto=format&fit=crop&q=80",
            motorista_id: "1",
            motorista_nome: "Ernesto Cossa",
            estado: "DISPONIVEL", // DISPONIVEL, EM_ENTREGA, MANUTENCAO
            quilometragem: 14200
        },
        {
            id: "2",
            codigo: "VEI-02",
            tipo_id: "1",
            tipo_nome: "Motociclo / Mota",
            matricula: "AHK-103-MP",
            marca_modelo: "Yamaha YBR 125",
            ano: 2023,
            cor: "Preto",
            imagem_url: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=300&auto=format&fit=crop&q=80",
            motorista_id: "2",
            motorista_nome: "Mateus Sitoe",
            estado: "EM_ENTREGA",
            quilometragem: 23150
        },
        {
            id: "3",
            codigo: "VEI-03",
            tipo_id: "2",
            tipo_nome: "Automóvel Ligeiro",
            matricula: "AEB-882-MC",
            marca_modelo: "Toyota Vitz Cargo",
            ano: 2022,
            cor: "Branco",
            imagem_url: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=300&auto=format&fit=crop&q=80",
            motorista_id: "",
            motorista_nome: "Sem motorista",
            estado: "DISPONIVEL",
            quilometragem: 48900
        }
    ],

    // 29. MOTORISTAS / ESTAFETAS DE DELIVERY
    motoristas_delivery: [
        {
            id: "1",
            codigo: "MOT-01",
            nome: "Ernesto Cossa",
            telemovel: "+258 84 333 9988",
            bilhete_identidade: "110293847291B",
            carta_conducao: "MC-882910-A",
            veiculo_associado_id: "1",
            veiculo_matricula: "AFM-492-MC",
            total_entregas: 148,
            estado: "DISPONIVEL"
        },
        {
            id: "2",
            codigo: "MOT-02",
            nome: "Mateus Sitoe",
            telemovel: "+258 82 777 4411",
            bilhete_identidade: "100384729182A",
            carta_conducao: "MC-773912-B",
            veiculo_associado_id: "2",
            veiculo_matricula: "AHK-103-MP",
            total_entregas: 215,
            estado: "EM_ROTA"
        }
    ],

    // 30. GESTÃO DE CAIXA (SESSÕES, TURNOS, FECHOS, RASTREABILIDADE) - 2ª IMAGEM
    turnos_caixa: [
        {
            id: "1",
            numero_turno: "TRN-2026-001",
            caixa_terminal: "Caixa Balcão 01",
            operador: "Operador de Caixa 01",
            data_abertura: "21/10/2026 08:00",
            data_fecho: null,
            saldo_inicial: 5000.00,
            total_entradas_vendas: 18450.00,
            total_saidas_sangrias: 1000.00,
            saldo_esperado: 22450.00,
            saldo_contado: null,
            diferenca: null,
            estado: "ABERTO" // ABERTO, FECHADO
        },
        {
            id: "2",
            numero_turno: "TRN-2026-000",
            caixa_terminal: "Caixa Balcão 01",
            operador: "Operador de Caixa 01",
            data_abertura: "20/10/2026 08:00",
            data_fecho: "20/10/2026 23:30",
            saldo_inicial: 5000.00,
            total_entradas_vendas: 34200.00,
            total_saidas_sangrias: 2500.00,
            saldo_esperado: 36700.00,
            saldo_contado: 36700.00,
            diferenca: 0.00,
            estado: "FECHADO"
        }
    ],

    caixas_terminais: [
        { id: "1", codigo: "CX-01", nome: "Caixa Balcão 01", tipo: "Físico", impressora: "Térmica 80mm", gaveta_automatica: true, ativo: true },
        { id: "2", codigo: "CX-02", nome: "Terminal Bar Esplanada", tipo: "Tablet Móvel", impressora: "Bluetooth 58mm", gaveta_automatica: false, ativo: true },
        { id: "3", codigo: "CX-03", nome: "Terminal Takeaway", tipo: "POS Integrado", impressora: "Térmica 80mm", gaveta_automatica: true, ativo: true }
    ],

    movimentos_caixa: [
        { id: "1", turno_id: "1", data_hora: "21/10/2026 08:00", tipo: "ABERTURA", descricao: "Fundo de Caixa Inicial", valor: 5000.00, operador: "Operador de Caixa 01" },
        { id: "2", turno_id: "1", data_hora: "21/10/2026 11:30", tipo: "SANGRIA", descricao: "Sangria para Cofre Central", valor: -1000.00, operador: "Operador de Caixa 01" },
        { id: "3", turno_id: "1", data_hora: "21/10/2026 13:45", tipo: "VENDA", descricao: "Recebimento Venda VND-1048", valor: 1890.00, operador: "Operador de Caixa 01" }
    ],

    // 31. VENDAS & PEDIDOS SUSPENSOS NO PDV
    vendas_suspensas: [
        {
            id: "1",
            codigo: "SUSP-101",
            data_hora: "23/10/2026 09:15",
            identificador: "Mesa 02 (Aguardando Sobremesa)",
            tipo_pedido: "Mesa / Salão",
            localizacao: "Salão Principal • Mesa 02",
            sala_id: "1",
            mesa_id: "2",
            total: 1250.00,
            itens: [
                { id: "1", nome: "Picanha Especial na Brasa", qtd: 1, preco: 1250.00, opcoes: "Ao Ponto" }
            ],
            estado: "SUSPENSO"
        }
    ],

    // =========================================================================
    // 32. MÓDULO GESTÃO DE PISCINA & RESORT
    // =========================================================================
    piscinas: [
        {
            id: "1",
            nome: "Piscina Principal Resort & Lazer",
            tipo: "Semi-Olímpica e Lazer",
            capacidade_maxima: 100,
            lotacao_atual: 42,
            horario_funcionamento: "08:00 - 19:00",
            temperatura: "26°C",
            estado: "ABERTA",
            regras: "Uso obrigatório de fato de banho e duche prévio. Proibido vidro junto à borda."
        },
        {
            id: "2",
            nome: "Piscina Infantil / Kids Splash",
            tipo: "Infantil / Rasa (0.40m)",
            capacidade_maxima: 30,
            lotacao_atual: 12,
            horario_funcionamento: "09:00 - 18:00",
            temperatura: "28°C",
            estado: "ABERTA",
            regras: "Supervisão obrigatória de adultos acompanhantes."
        }
    ],

    tarifas_piscina: [
        { id: "1", categoria: "Adulto", periodo: "Dia Inteiro", preco: 500.00, descricao: "Acesso total à piscina dia completo", ativo: true },
        { id: "2", categoria: "Criança (4-12 anos)", periodo: "Dia Inteiro", preco: 250.00, descricao: "Acesso total à piscina infantil e principal", ativo: true },
        { id: "3", categoria: "Adulto", periodo: "Meio Período (Tarde)", preco: 350.00, descricao: "Entrada a partir das 14:00", ativo: true },
        { id: "4", categoria: "Criança (4-12 anos)", periodo: "Meio Período (Tarde)", preco: 180.00, descricao: "Entrada a partir das 14:00", ativo: true },
        { id: "5", categoria: "Grupo / Família (4 Pessoas)", periodo: "Dia Inteiro", preco: 1350.00, descricao: "Pacote 2 Adultos + 2 Crianças", ativo: true },
        { id: "6", categoria: "Bebé (0-3 anos)", periodo: "Livre", preco: 0.00, descricao: "Gratuito com adulto pagante", ativo: true },
        { id: "7", categoria: "Hóspede / VIP Autorizado", periodo: "Livre", preco: 0.00, descricao: "Acesso autorizado cortesia do hotel", ativo: true }
    ],

    bilhetes_piscina: [
        {
            id: "1",
            codigo_bilhete: "BIL-PSC-1001",
            data: "23/10/2026",
            hora_emissao: "08:45",
            cliente_nome: "Carlos Mabote",
            cliente_telefone: "+258 84 123 4567",
            tipo_ingresso: "PAGO", // PAGO, GRATUITO, AUTORIZADO
            categoria: "Adulto",
            periodo: "Dia Inteiro",
            quantidade_adultos: 2,
            quantidade_criancas: 1,
            valor_total: 1250.00,
            metodo_pagamento: "M-Pesa",
            estado: "VALIDADO", // EMITIDO, VALIDADO, UTILIZADO, CANCELADO
            checkin_hora: "09:00",
            checkout_hora: ""
        },
        {
            id: "2",
            codigo_bilhete: "BIL-PSC-1002",
            data: "23/10/2026",
            hora_emissao: "09:30",
            cliente_nome: "Helena Sitoe",
            cliente_telefone: "+258 82 999 8888",
            tipo_ingresso: "PAGO",
            categoria: "Adulto",
            periodo: "Dia Inteiro",
            quantidade_adultos: 1,
            quantidade_criancas: 2,
            valor_total: 1000.00,
            metodo_pagamento: "Cartão POS",
            estado: "VALIDADO",
            checkin_hora: "09:40",
            checkout_hora: ""
        },
        {
            id: "3",
            codigo_bilhete: "BIL-PSC-1003",
            data: "23/10/2026",
            hora_emissao: "10:15",
            cliente_nome: "Família Mondlane",
            cliente_telefone: "+258 84 555 4321",
            tipo_ingresso: "AUTORIZADO",
            categoria: "Hóspede / VIP Autorizado",
            periodo: "Livre",
            quantidade_adultos: 2,
            quantidade_criancas: 0,
            valor_total: 0.00,
            metodo_pagamento: "Autorizado / Cortesia",
            estado: "VALIDADO",
            checkin_hora: "10:20",
            checkout_hora: ""
        }
    ],

    entradas_piscina: [
        {
            id: "1",
            bilhete_id: "1",
            codigo_bilhete: "BIL-PSC-1001",
            visitante_nome: "Carlos Mabote (+2 convidados)",
            piscina_id: "1",
            hora_entrada: "09:00",
            hora_saida: "",
            status: "DENTRO" // DENTRO, FINALIZADO
        },
        {
            id: "2",
            bilhete_id: "2",
            codigo_bilhete: "BIL-PSC-1002",
            visitante_nome: "Helena Sitoe (+2 crianças)",
            piscina_id: "1",
            hora_entrada: "09:40",
            hora_saida: "",
            status: "DENTRO"
        },
        {
            id: "3",
            bilhete_id: "3",
            codigo_bilhete: "BIL-PSC-1003",
            visitante_nome: "Família Mondlane",
            piscina_id: "1",
            hora_entrada: "10:20",
            hora_saida: "",
            status: "DENTRO"
        }
    ],

    espacos_piscina: [
        { id: "1", codigo: "ESP-01", tipo: "Espreguiçadeira", localizacao: "Deck Sol Poente", preco_aluguer: 150.00, estado: "OCUPADO", ocupante: "Carlos Mabote (BIL-PSC-1001)" },
        { id: "2", codigo: "ESP-02", tipo: "Espreguiçadeira", localizacao: "Deck Sol Poente", preco_aluguer: 150.00, estado: "OCUPADO", ocupante: "Carlos Mabote (BIL-PSC-1001)" },
        { id: "3", codigo: "ESP-03", tipo: "Espreguiçadeira", localizacao: "Deck Sol Nascente", preco_aluguer: 150.00, estado: "LIVRE", ocupante: "" },
        { id: "4", codigo: "ESP-04", tipo: "Espreguiçadeira", localizacao: "Deck Sol Nascente", preco_aluguer: 150.00, estado: "LIVRE", ocupante: "" },
        { id: "5", codigo: "MES-P01", tipo: "Mesa com Guarda-Sol", localizacao: "Pérgula Bar Piscina", preco_aluguer: 300.00, estado: "OCUPADO", ocupante: "Helena Sitoe" },
        { id: "6", codigo: "MES-P02", tipo: "Mesa com Guarda-Sol", localizacao: "Pérgula Bar Piscina", preco_aluguer: 300.00, estado: "RESERVADO", ocupante: "Dr. Fernando (13:00)" },
        { id: "7", codigo: "MES-P03", tipo: "Mesa com Guarda-Sol", localizacao: "Relvado / Jardim", preco_aluguer: 300.00, estado: "LIVRE", ocupante: "" },
        { id: "8", codigo: "CAB-VIP1", tipo: "Cabana / Cama Balinesa VIP", localizacao: "Zona VIP Reservada", preco_aluguer: 1500.00, estado: "LIVRE", ocupante: "" },
        { id: "9", codigo: "GUA-01", tipo: "Guarda-Sol Extra", localizacao: "Zona Solarium", preco_aluguer: 100.00, estado: "MANUTENCAO", ocupante: "Vara com folga técnica" }
    ],

    reservas_piscina: [
        {
            id: "1",
            codigo_reserva: "RES-PSC-501",
            data_reserva: "23/10/2026",
            hora_inicio: "13:00",
            hora_fim: "18:00",
            cliente_nome: "Dr. Fernando Nhaca",
            cliente_telefone: "+258 84 777 2211",
            espaco_id: "6",
            espaco_codigo: "MES-P02",
            num_pessoas: 6,
            valor: 600.00,
            sinal_pago: 300.00,
            estado: "CONFIRMADA",
            observacoes: "Almoço em família com petiscos do bar da piscina."
        }
    ],

    alugueres_piscina: [
        {
            id: "1",
            data_hora: "23/10/2026 09:10",
            bilhete_ou_cliente: "BIL-PSC-1001 (Carlos Mabote)",
            item_equipamento: "2x Toalhas de Praia + 1x Boia Infantil",
            valor_aluguer: 250.00,
            caucao: 500.00,
            estado: "EM_USO", // EM_USO, DEVOLVIDO
            devolvido_hora: ""
        },
        {
            id: "2",
            data_hora: "23/10/2026 10:00",
            bilhete_ou_cliente: "BIL-PSC-1002 (Helena Sitoe)",
            item_equipamento: "2x Braçadeiras Infantis",
            valor_aluguer: 100.00,
            caucao: 200.00,
            estado: "EM_USO",
            devolvido_hora: ""
        }
    ],

    registos_manutencao_piscina: [
        {
            id: "1",
            data: "23/10/2026",
            hora: "06:30",
            piscina_id: "1",
            piscina_nome: "Piscina Principal Resort",
            tecnico_responsavel: "Técnico Amadeu",
            nivel_ph: 7.3, // Ideal: 7.2 - 7.6
            nivel_cloro: 1.8, // Ideal: 1.0 - 3.0 ppm
            limpeza_filtro: "SIM",
            aspiracao_fundo: "SIM",
            observacao_ocorrencia: "Água cristalina, parâmetros 100% equilibrados para uso.",
            status: "CONFORME"
        },
        {
            id: "2",
            data: "23/10/2026",
            hora: "06:45",
            piscina_id: "2",
            piscina_nome: "Piscina Infantil / Kids Splash",
            tecnico_responsavel: "Técnico Amadeu",
            nivel_ph: 7.4,
            nivel_cloro: 2.0,
            limpeza_filtro: "SIM",
            aspiracao_fundo: "SIM",
            observacao_ocorrencia: "Tratamento preventivo aplicado, condições excelentes.",
            status: "CONFORME"
        },
        {
            id: "3",
            data: "22/10/2026",
            hora: "17:30",
            piscina_id: "1",
            piscina_nome: "Piscina Principal Resort",
            tecnico_responsavel: "Técnico Bernardo",
            nivel_ph: 7.5,
            nivel_cloro: 1.5,
            limpeza_filtro: "SIM",
            aspiracao_fundo: "NAO",
            observacao_ocorrencia: "Substituição do manípulo do ralo de superfície (skimmer 2).",
            status: "MANUTENCAO_CONCLUIDA"
        }
    ]
};

// =============================================================================
// PERSISTÊNCIA EM LOCALSTORAGE PARA NAVEGAÇÃO ENTRE PÁGINAS
// =============================================================================
(function() {
    var STORAGE_KEY = 'REDE_RESTAURANTE_APP_DATA_V2';
    try {
        var salvo = localStorage.getItem(STORAGE_KEY);
        if (salvo) {
            var dados = JSON.parse(salvo);
            // Mesclar dados salvos mantendo a estrutura
            for (var k in dados) {
                if (dados.hasOwnProperty(k) && Array.isArray(dados[k])) {
                    window.RestauranteApp[k] = dados[k];
                }
            }
        }
    } catch (e) {
        console.warn('Erro ao carregar dados do localStorage:', e);
    }

    window.RestauranteApp.salvarEstado = function() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(window.RestauranteApp));
        } catch (e) {
            console.warn('Erro ao gravar dados no localStorage:', e);
        }
    };
})();

