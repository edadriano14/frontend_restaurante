import os
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, RedirectResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app = FastAPI(title="Rede de Restaurantes - PWA")

@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    favicon_path = os.path.join(os.path.dirname(__file__), "static", "favicon.ico")
    if os.path.exists(favicon_path):
        return FileResponse(favicon_path, media_type="image/x-icon")
    return HTMLResponse(status_code=204)

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

ESTABELECIMENTOS_DB = [
    {
        "id": "1",
        "nome": "Restaurante Sabor & Brasa",
        "slug": "sabor-brasa",
        "logotipo_url": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=150&auto=format&fit=crop&q=80",
        "cor_primaria": "#DC2626",
        "cor_secundaria": "#1E293B",
        "telefone": "+258 84 000 0000",
        "email": "contacto@saborbrasa.co.mz",
        "endereco": "Av. Julius Nyerere, Maputo",
        "cidade": "Maputo",
        "moeda": "MZN",
        "horario_abertura": "10:00 - 23:00",
        "dias_funcionamento": "Segunda a Domingo",
        "whatsapp": "+258840000000",
        "facebook": "https://facebook.com/saborbrasa",
        "instagram": "https://instagram.com/saborbrasa",
        "website": "https://saborbrasa.co.mz",
        "descricao_rodape": "O autêntico sabor das melhores carnes e iguarias moçambicanas no coração de Maputo.",
        "tem_piscina": True,
        "ativo": True
    },
    {
        "id": "2",
        "nome": "Mariscos & Petiscos da Costa",
        "slug": "mariscos-costa",
        "logotipo_url": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=150&auto=format&fit=crop&q=80",
        "cor_primaria": "#0284C7",
        "cor_secundaria": "#0F172A",
        "telefone": "+258 82 555 1234",
        "email": "costa@mariscos.co.mz",
        "endereco": "Av. Marginal, Praia da Costa do Sol, Maputo",
        "cidade": "Maputo",
        "moeda": "MZN",
        "horario_abertura": "11:00 - 00:00",
        "dias_funcionamento": "Terça a Domingo",
        "whatsapp": "+258825551234",
        "facebook": "https://facebook.com/mariscosdacosta",
        "instagram": "https://instagram.com/mariscosdacosta",
        "website": "https://mariscosdacosta.co.mz",
        "descricao_rodape": "Frutos do mar frescos pescados diariamente com a brisa do Oceano Índico.",
        "tem_piscina": False,
        "ativo": True
    }
]

ESTABELECIMENTO_ATIVO_ID = "1"

def get_ativo():
    for e in ESTABELECIMENTOS_DB:
        if e["id"] == ESTABELECIMENTO_ATIVO_ID:
            return e
    return ESTABELECIMENTOS_DB[0]

@app.get("/", response_class=HTMLResponse)
async def dashboard(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="dashboard.html",
        context={"active_page": "dashboard", "estabelecimento": get_ativo(), "estabelecimentos": ESTABELECIMENTOS_DB}
    )

@app.get("/pdv", response_class=HTMLResponse)
async def pdv_page(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="pdv.html",
        context={"active_page": "pdv", "estabelecimento": get_ativo(), "estabelecimentos": ESTABELECIMENTOS_DB}
    )

@app.get("/produtos", response_class=HTMLResponse)
async def produtos_page(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="produtos.html",
        context={"active_page": "produtos", "estabelecimento": get_ativo(), "estabelecimentos": ESTABELECIMENTOS_DB}
    )

@app.get("/acompanhamentos", response_class=HTMLResponse)
async def acompanhamentos_page(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="acompanhamentos.html",
        context={"active_page": "acompanhamentos", "estabelecimento": get_ativo(), "estabelecimentos": ESTABELECIMENTOS_DB}
    )

@app.get("/postos-preparacao")
async def postos_page(request: Request):
    from fastapi.responses import RedirectResponse
    return RedirectResponse(url="/estabelecimento#postos-preparacao")

@app.get("/tipos-pedidos")
async def tipos_pedidos_page(request: Request):
    from fastapi.responses import RedirectResponse
    return RedirectResponse(url="/estabelecimento#tipos-pedidos")

@app.get("/tabelas-apoio")
async def tabelas_apoio_page(request: Request):
    from fastapi.responses import RedirectResponse
    return RedirectResponse(url="/estabelecimento")

@app.get("/mesas", response_class=HTMLResponse)
async def mesas_page(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="mesas.html",
        context={"active_page": "mesas", "estabelecimento": get_ativo(), "estabelecimentos": ESTABELECIMENTOS_DB}
    )

@app.get("/categorias", response_class=HTMLResponse)
async def categorias_page(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="categorias.html",
        context={"active_page": "categorias", "estabelecimento": get_ativo(), "estabelecimentos": ESTABELECIMENTOS_DB}
    )

@app.get("/stock", response_class=HTMLResponse)
async def stock_page(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="stock.html",
        context={"active_page": "stock", "estabelecimento": get_ativo(), "estabelecimentos": ESTABELECIMENTOS_DB}
    )

@app.get("/transferencias-stock", response_class=HTMLResponse)
async def transferencias_page(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="transferencias_stock.html",
        context={"active_page": "transferencias-stock", "estabelecimento": get_ativo(), "estabelecimentos": ESTABELECIMENTOS_DB}
    )

@app.get("/historico-vendas", response_class=HTMLResponse)
async def historico_vendas_page(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="historico_vendas.html",
        context={"active_page": "historico-vendas", "estabelecimento": get_ativo(), "estabelecimentos": ESTABELECIMENTOS_DB}
    )

@app.get("/cozinha", response_class=HTMLResponse)
async def cozinha_page(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="cozinha.html",
        context={"active_page": "cozinha", "estabelecimento": get_ativo(), "estabelecimentos": ESTABELECIMENTOS_DB}
    )

@app.get("/movimentos-stock", response_class=HTMLResponse)
async def movimentos_stock_page(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="movimentos_stock.html",
        context={"active_page": "movimentos-stock", "estabelecimento": get_ativo(), "estabelecimentos": ESTABELECIMENTOS_DB}
    )

@app.get("/guias-entrada", response_class=HTMLResponse)
async def guias_entrada_page(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="guias_entrada.html",
        context={"active_page": "guias-entrada", "estabelecimento": get_ativo(), "estabelecimentos": ESTABELECIMENTOS_DB}
    )

@app.get("/compras", response_class=HTMLResponse)
async def compras_page(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="compras.html",
        context={"active_page": "compras", "estabelecimento": get_ativo(), "estabelecimentos": ESTABELECIMENTOS_DB}
    )

@app.get("/fornecedores", response_class=HTMLResponse)
async def fornecedores_page(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="fornecedores.html",
        context={"active_page": "fornecedores", "estabelecimento": get_ativo(), "estabelecimentos": ESTABELECIMENTOS_DB}
    )

@app.get("/clientes", response_class=HTMLResponse)
async def clientes_page(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="clientes.html",
        context={"active_page": "clientes", "estabelecimento": get_ativo(), "estabelecimentos": ESTABELECIMENTOS_DB}
    )

@app.get("/utilizadores", response_class=HTMLResponse)
async def utilizadores_page(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="utilizadores.html",
        context={"active_page": "utilizadores", "estabelecimento": get_ativo(), "estabelecimentos": ESTABELECIMENTOS_DB}
    )


@app.get("/estabelecimento", response_class=HTMLResponse)
async def config_estabelecimento(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="estabelecimento.html",
        context={"active_page": "estabelecimento", "estabelecimento": get_ativo(), "estabelecimentos": ESTABELECIMENTOS_DB}
    )

@app.get("/financeiro", response_class=HTMLResponse)
@app.get("/gestao-caixa", response_class=HTMLResponse)
async def financeiro_page(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="gestao_caixa.html",
        context={"active_page": "financeiro", "estabelecimento": get_ativo(), "estabelecimentos": ESTABELECIMENTOS_DB}
    )

@app.get("/veiculos-delivery", response_class=HTMLResponse)
async def veiculos_delivery_page(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="veiculos_delivery.html",
        context={"active_page": "veiculos-delivery", "estabelecimento": get_ativo(), "estabelecimentos": ESTABELECIMENTOS_DB}
    )

@app.get("/piscina", response_class=HTMLResponse)
async def piscina_page(request: Request):
    est = get_ativo()
    if not est.get("tem_piscina", False):
        return RedirectResponse(url="/", status_code=303)
    return templates.TemplateResponse(
        request=request,
        name="piscina.html",
        context={"active_page": "piscina", "estabelecimento": est, "estabelecimentos": ESTABELECIMENTOS_DB}
    )

@app.get("/portal-cliente", response_class=HTMLResponse)
async def portal_cliente_page(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="portal_cliente.html",
        context={"estabelecimento": get_ativo()}
    )

@app.post("/estabelecimento/selecionar/{id}")
async def selecionar_estabelecimento(id: str):
    global ESTABELECIMENTO_ATIVO_ID
    ESTABELECIMENTO_ATIVO_ID = id
    return {"status": "ok", "ativo": get_ativo()}

@app.post("/estabelecimento/atualizar")
async def atualizar_estabelecimento(payload: dict):
    global ESTABELECIMENTOS_DB
    est_id = str(payload.get("id", ESTABELECIMENTO_ATIVO_ID))
    for est in ESTABELECIMENTOS_DB:
        if str(est.get("id")) == est_id:
            for k, v in payload.items():
                est[k] = v
            return {"status": "ok", "estabelecimento": est}
    return {"status": "error", "message": "Estabelecimento não encontrado"}

@app.post("/estabelecimento/novo")
async def criar_estabelecimento(payload: dict):
    import uuid
    novo = {
        "id": str(uuid.uuid4()),
        "nome": payload.get("nome", "Novo Restaurante"),
        "slug": payload.get("slug", "novo-restaurante"),
        "logotipo_url": payload.get("logotipo_url", "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=150&auto=format&fit=crop&q=80"),
        "cor_primaria": payload.get("cor_primaria", "#10B981"),
        "cor_secundaria": payload.get("cor_secundaria", "#0F172A"),
        "telefone": payload.get("telefone", ""),
        "email": payload.get("email", ""),
        "endereco": payload.get("endereco", ""),
        "cidade": payload.get("cidade", "Maputo"),
        "moeda": payload.get("moeda", "MZN"),
        "horario_abertura": payload.get("horario_abertura", "09:00 - 22:00"),
        "dias_funcionamento": payload.get("dias_funcionamento", "Segunda a Sábado"),
        "whatsapp": payload.get("whatsapp", ""),
        "facebook": payload.get("facebook", ""),
        "instagram": payload.get("instagram", ""),
        "website": payload.get("website", ""),
        "descricao_rodape": payload.get("descricao_rodape", ""),
        "tem_piscina": payload.get("tem_piscina", True),
        "ativo": payload.get("ativo", True)
    }
    ESTABELECIMENTOS_DB.append(novo)
    return {"status": "ok", "estabelecimento": novo}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8070, reload=True)
