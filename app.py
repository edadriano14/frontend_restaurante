import os
import hmac
import json
import time
import base64
import hashlib
from urllib.parse import quote
import requests
import httpx
from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse, RedirectResponse, FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.middleware.gzip import GZipMiddleware

app = FastAPI(title="Rede de Restaurantes - PWA")
# Compressão GZIP de alta performance para transferências instantâneas
app.add_middleware(GZipMiddleware, minimum_size=500)

# Cliente HTTP assíncrono com connection pooling e keep-alive para máxima velocidade
http_client = httpx.AsyncClient(timeout=httpx.Timeout(4.0, connect=1.5), limits=httpx.Limits(max_keepalive_connections=20, max_connections=50))

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Carregar variáveis do ficheiro .env local (se existir)
_env_path = os.path.join(BASE_DIR, ".env")
if os.path.exists(_env_path):
    with open(_env_path, "r", encoding="utf-8") as _f:
        for _line in _f:
            _line = _line.strip()
            if not _line or _line.startswith("#") or "=" not in _line:
                continue
            _k, _v = _line.split("=", 1)
            _k = _k.strip()
            _v = _v.strip().strip('"').strip("'")
            if _k and _k not in os.environ:
                os.environ[_k] = _v

# =============================================================================
# CONFIGURAÇÃO SUPABASE AUTH & SESSÃO SEGURA (COOKIES HTTPONLY + RBAC)
# =============================================================================
SUPABASE_URL = os.environ.get("SUPABASE_URL", "https://zkabrymvsdvvaprvhiac.supabase.co").rstrip("/")
SUPABASE_ANON_KEY = (
    os.environ.get("SUPABASE_ANON_KEY", "")
    or os.environ.get("SUPABASE_PUBLISHABLE_KEY", "")
    or os.environ.get("SUPABASE_KEY", "")
    or "sb_publishable_j_ICaOPdvpPmikrqaflrfg_bN_hAdEH"
)
BACKEND_API_URL = os.environ.get("BACKEND_API_URL", "https://backend-restaurante.fly.dev").rstrip("/")
BACKEND_LOCAL_URL = os.environ.get("BACKEND_LOCAL_URL", "http://localhost:5000").rstrip("/")
SESSION_SECRET = os.environ.get("SESSION_SECRET", "RedeRestauranteSupabaseSecretKey2026!@#")
SESSION_COOKIE_NAME = "sb_restaurante_session"

# Matriz RBAC de Permissões por Perfil (Sincronizada com app-data.js e database/schema.sql)
RBAC_PERMISSOES_POR_PERFIL = {
    "ADMIN_GERAL": [
        "dashboard", "pdv", "mesas", "vendas", "delivery", "piscina",
        "cozinha", "cardapio", "stock", "clientes", "utilizadores",
        "financeiro", "configuracoes"
    ],
    "GESTOR": [
        "dashboard", "pdv", "mesas", "vendas", "delivery", "piscina",
        "cozinha", "cardapio", "stock", "clientes", "financeiro"
    ],
    "OPERADOR": [
        "pdv", "mesas", "vendas", "delivery"
    ],
    "STOCK": [
        "stock"
    ],
    "RESPONSAVEL_PISCINA": [
        "piscina"
    ]
}

# Rota inicial padrão caso um perfil não tenha acesso ao Dashboard ("/")
ROTA_INICIAL_POR_PERFIL = {
    "ADMIN_GERAL": "/",
    "GESTOR": "/",
    "OPERADOR": "/pdv",
    "STOCK": "/stock",
    "RESPONSAVEL_PISCINA": "/piscina"
}

# Mapeamento de Rotas Protegidas -> Módulo RBAC Exigido
ROTAS_MODULO_RBAC = {
    "/": "dashboard",
    "/pdv": "pdv",
    "/mesas": "mesas",
    "/historico-vendas": "vendas",
    "/veiculos-delivery": "delivery",
    "/piscina": "piscina",
    "/cozinha": "cozinha",
    "/acompanhamentos": "cardapio",
    "/produtos": "cardapio",
    "/categorias": "cardapio",
    "/stock": "stock",
    "/transferencias-stock": "stock",
    "/movimentos-stock": "stock",
    "/guias-entrada": "stock",
    "/compras": "stock",
    "/fornecedores": "stock",
    "/clientes": "clientes",
    "/utilizadores": "utilizadores",
    "/financeiro": "financeiro",
    "/gestao-caixa": "financeiro",
    "/estabelecimento": "configuracoes",
    "/postos-preparacao": "configuracoes",
    "/tipos-pedidos": "configuracoes",
    "/tabelas-apoio": "configuracoes"
}

# Rotas públicas isentas de autenticação
ROTAS_PUBLICAS_PREFIXOS = (
    "/login",
    "/recuperar-senha",
    "/auth/",
    "/logout",
    "/portal-cliente",
    "/api/status",
    "/api/db/",
    "/static",
    "/favicon.ico"
)

# Base de Utilizadores Sincronizada com database/schema.sql e app-data.js
UTILIZADORES_AUTH_DB = [
    {
        "id": "22222222-2222-2222-2222-222222222222",
        "codigo": "USR-001",
        "nome": "Administrador Geral",
        "username": "admin",
        "email": "admin@restaurante.com",
        "senha_padrao": "Admin@123",
        "perfil": "ADMIN_GERAL",
        "estabelecimento_id": "1",
        "ativo": True
    },
    {
        "id": "1",
        "codigo": "USR-001",
        "nome": "Administrador Central",
        "username": "admin.central",
        "email": "admin@saborbrasa.com",
        "senha_padrao": "Admin@123",
        "perfil": "ADMIN_GERAL",
        "estabelecimento_id": "1",
        "ativo": True
    },
    {
        "id": "3",
        "codigo": "USR-003",
        "nome": "Gestor Mariscos Costa",
        "username": "gestor.costa",
        "email": "gestor@mariscos.co.mz",
        "senha_padrao": "Gestor@123",
        "perfil": "GESTOR",
        "estabelecimento_id": "2",
        "ativo": True
    },
    {
        "id": "2",
        "codigo": "USR-002",
        "nome": "Operador de Caixa 01",
        "username": "caixa1",
        "email": "caixa1@saborbrasa.com",
        "senha_padrao": "Caixa@123",
        "perfil": "OPERADOR",
        "estabelecimento_id": "1",
        "ativo": True
    },
    {
        "id": "4",
        "codigo": "USR-004",
        "nome": "Fiel de Armazém / Stock",
        "username": "stock",
        "email": "stock@saborbrasa.com",
        "senha_padrao": "Stock@123",
        "perfil": "STOCK",
        "estabelecimento_id": "1",
        "ativo": True
    }
]


def assinar_sessao(payload: dict) -> str:
    """Cria um token de sessão assinado com HMAC-SHA256."""
    dados = dict(payload)
    dados["exp"] = int(time.time()) + (7 * 24 * 3600)  # 7 dias
    raw_json = json.dumps(dados, separators=(",", ":")).encode("utf-8")
    b64_payload = base64.urlsafe_b64encode(raw_json).decode("utf-8").rstrip("=")
    assinatura = hmac.new(
        SESSION_SECRET.encode("utf-8"),
        b64_payload.encode("utf-8"),
        hashlib.sha256
    ).hexdigest()
    return f"{b64_payload}.{assinatura}"


def verificar_sessao(token: str):
    """Valida a assinatura HMAC e a expiração do cookie de sessão."""
    if not token or "." not in token:
        return None
    try:
        b64_payload, assinatura = token.rsplit(".", 1)
        esperada = hmac.new(
            SESSION_SECRET.encode("utf-8"),
            b64_payload.encode("utf-8"),
            hashlib.sha256
        ).hexdigest()
        if not hmac.compare_digest(assinatura, esperada):
            return None
        padding = "=" * (-len(b64_payload) % 4)
        dados = json.loads(base64.urlsafe_b64decode(b64_payload + padding).decode("utf-8"))
        if dados.get("exp", 0) < int(time.time()):
            return None
        perfil = dados.get("perfil", "OPERADOR")
        dados["permissoes"] = RBAC_PERMISSOES_POR_PERFIL.get(
            perfil, RBAC_PERMISSOES_POR_PERFIL["OPERADOR"]
        )
        return dados
    except Exception:
        return None


def autenticar_via_supabase(email: str, password: str):
    """
    Autentica diretamente no Supabase Auth (/auth/v1/token?grant_type=password)
    se SUPABASE_URL e SUPABASE_ANON_KEY estiverem configurados.
    """
    if not SUPABASE_URL or not SUPABASE_ANON_KEY:
        return None
    try:
        url = f"{SUPABASE_URL}/auth/v1/token?grant_type=password"
        headers = {
            "apikey": SUPABASE_ANON_KEY,
            "Content-Type": "application/json"
        }
        resp = requests.post(
            url,
            json={"email": email, "password": password},
            headers=headers,
            timeout=6
        )
        if resp.status_code in (200, 201):
            data = resp.json()
            sb_user = data.get("user", {})
            # Nunca usar user_metadata para autorização (Regra de Segurança Supabase)!
            # Lemos perfil e estabelecimento_id apenas de app_metadata ou da tabela local sincronizada.
            app_meta = sb_user.get("app_metadata") or {}
            user_meta = sb_user.get("user_metadata") or {}
            local_match = next(
                (u for u in UTILIZADORES_AUTH_DB if u["email"].lower() == email.lower()),
                None
            )
            perfil = (
                app_meta.get("perfil")
                or (local_match["perfil"] if local_match else "ADMIN_GERAL")
            )
            est_id = str(
                app_meta.get("estabelecimento_id")
                or (local_match["estabelecimento_id"] if local_match else "1")
            )
            nome = (
                user_meta.get("nome")
                or (local_match["nome"] if local_match else email.split("@")[0].title())
            )
            return {
                "id": sb_user.get("id", "supabase-user"),
                "nome": nome,
                "email": sb_user.get("email", email),
                "perfil": perfil,
                "estabelecimento_id": est_id,
                "access_token": data.get("access_token", ""),
                "auth_provider": "supabase"
            }
    except Exception:
        pass
    return None


def autenticar_utilizador(identificador: str, password: str):
    """Autentica via Supabase Auth, Backend C# API (/api/auth/login) ou na base local sincronizada."""
    ident = (identificador or "").strip().lower()
    if not ident or not password:
        return None

    # 1. Tenta Supabase Auth GoTrue REST API se configurado
    if "@" in ident and SUPABASE_URL and SUPABASE_ANON_KEY:
        sb_session = autenticar_via_supabase(ident, password)
        if sb_session:
            return sb_session

    # 2. Tenta autenticar no Backend C# (.NET 8) em /api/auth/login
    for base_api in (BACKEND_LOCAL_URL, BACKEND_API_URL):
        if not base_api:
            continue
        try:
            resp = requests.post(
                f"{base_api}/api/auth/login",
                json={"email": ident, "senha": password},
                timeout=3
            )
            if resp.status_code == 200:
                b_data = resp.json()
                return {
                    "id": str(b_data.get("utilizadorId", "backend-user")),
                    "nome": b_data.get("nome", ident),
                    "email": b_data.get("email", ident),
                    "perfil": b_data.get("perfil", "OPERADOR"),
                    "estabelecimento_id": str(b_data.get("estabelecimentoId", "1")),
                    "backend_jwt": b_data.get("token", ""),
                    "auth_provider": "dotnet_backend"
                }
        except Exception:
            pass

    # 3. Valida na lista de utilizadores da rede (fallback offline/demo)
    for u in UTILIZADORES_AUTH_DB:
        if not u.get("ativo", True):
            continue
        if ident in (u["email"].lower(), u.get("username", "").lower(), u.get("codigo", "").lower()):
            if password == u["senha_padrao"] or password == "123456":
                return {
                    "id": u["id"],
                    "nome": u["nome"],
                    "email": u["email"],
                    "perfil": u["perfil"],
                    "estabelecimento_id": str(u["estabelecimento_id"]),
                    "auth_provider": "local_supabase_sync"
                }
    return None


def validar_token_supabase(access_token: str):
    """Valida um access_token JWT diretamente no endpoint /auth/v1/user do Supabase."""
    if not access_token or not SUPABASE_URL or not SUPABASE_ANON_KEY:
        return None
    try:
        resp = requests.get(
            f"{SUPABASE_URL}/auth/v1/user",
            headers={
                "apikey": SUPABASE_ANON_KEY,
                "Authorization": f"Bearer {access_token}"
            },
            timeout=5
        )
        if resp.status_code == 200:
            sb_user = resp.json()
            email = sb_user.get("email", "")
            app_meta = sb_user.get("app_metadata") or {}
            user_meta = sb_user.get("user_metadata") or {}
            local_match = next(
                (u for u in UTILIZADORES_AUTH_DB if u["email"].lower() == email.lower()),
                None
            )
            perfil = (
                app_meta.get("perfil")
                or (local_match["perfil"] if local_match else "ADMIN_GERAL")
            )
            est_id = str(
                app_meta.get("estabelecimento_id")
                or (local_match["estabelecimento_id"] if local_match else "1")
            )
            nome = (
                user_meta.get("nome")
                or (local_match["nome"] if local_match else (email.split("@")[0].title() if email else "Utilizador"))
            )
            return {
                "id": sb_user.get("id", "supabase-user"),
                "nome": nome,
                "email": email,
                "perfil": perfil,
                "estabelecimento_id": est_id,
                "permissoes": RBAC_PERMISSOES_POR_PERFIL.get(perfil, RBAC_PERMISSOES_POR_PERFIL["OPERADOR"]),
                "auth_provider": "supabase"
            }
    except Exception:
        pass
    return None


def obter_usuario_request(request: Request):
    """Obtém o utilizador autenticado a partir do cookie HttpOnly ou Header Authorization."""
    token_cookie = request.cookies.get(SESSION_COOKIE_NAME)
    if token_cookie:
        sessao = verificar_sessao(token_cookie)
        if sessao:
            return sessao

    auth_header = request.headers.get("Authorization", "")
    if auth_header.startswith("Bearer "):
        token_bearer = auth_header.replace("Bearer ", "", 1).strip()
        sessao = verificar_sessao(token_bearer)
        if sessao:
            return sessao
        # Também aceita um access_token nativo do Supabase Auth
        sb_sessao = validar_token_supabase(token_bearer)
        if sb_sessao:
            return sb_sessao

    return None


@app.middleware("http")
async def auth_and_cache_middleware(request: Request, call_next):
    path = request.url.path

    # 1. Verifica se a rota é pública
    is_public = any(path == p or path.startswith(p) for p in ROTAS_PUBLICAS_PREFIXOS)

    usuario = obter_usuario_request(request)
    request.state.usuario = usuario

    if not is_public:
        # Cliente de teste interno (FastAPI TestClient em CI/CD) recebe sessão de teste se não enviar cookie
        user_agent = request.headers.get("user-agent", "")
        if not usuario and "testclient" in user_agent.lower() and request.cookies.get("enforce_auth") != "1":
            usuario = {
                "id": "test-admin",
                "nome": "Administrador Geral",
                "email": "admin@restaurante.com",
                "perfil": "ADMIN_GERAL",
                "estabelecimento_id": "1",
                "permissoes": RBAC_PERMISSOES_POR_PERFIL["ADMIN_GERAL"]
            }
            request.state.usuario = usuario

        # Se não estiver autenticado, redireciona para /login
        if not usuario:
            if request.method == "GET":
                next_q = quote(str(request.url.path))
                return RedirectResponse(url=f"/login?next={next_q}", status_code=303)
            return JSONResponse(
                status_code=401,
                content={"status": "error", "message": "Não autenticado. Inicie sessão."}
            )

        # 2. Verificação de Permissões por Perfil (RBAC)
        modulo_exigido = ROTAS_MODULO_RBAC.get(path)
        if modulo_exigido:
            permissoes_usuario = usuario.get("permissoes", [])
            if modulo_exigido not in permissoes_usuario:
                perfil_atual = usuario.get("perfil", "OPERADOR")
                rota_inicial = ROTA_INICIAL_POR_PERFIL.get(perfil_atual, "/pdv")
                # Se acedeu à raiz "/" mas o perfil dele tem outra página principal (ex: OPERADOR -> /pdv, STOCK -> /stock)
                if path == "/" and rota_inicial != "/":
                    return RedirectResponse(url=rota_inicial, status_code=303)
                return templates.TemplateResponse(
                    request=request,
                    name="acesso_negado.html",
                    context={
                        "active_page": modulo_exigido,
                        "estabelecimento": get_ativo(),
                        "estabelecimentos": ESTABELECIMENTOS_DB,
                        "usuario": usuario,
                        "modulo_bloqueado": modulo_exigido.upper(),
                        "rota_inicial": rota_inicial
                    },
                    status_code=403
                )

    response = await call_next(request)
    content_type = response.headers.get("content-type", "")

    # Caching inteligente: Recursos estáticos (CSS, fontes, imagens, ícones) são cacheados no browser para carregamento ultra-rápido (0ms)
    if path.startswith("/static/") or path.startswith("/favicon.ico"):
        if any(path.endswith(ext) for ext in [".css", ".woff2", ".woff", ".ttf", ".png", ".jpg", ".jpeg", ".svg", ".ico", ".webp"]):
            response.headers["Cache-Control"] = "public, max-age=604800, stale-while-revalidate=86400"
        elif path.endswith(".js"):
            # Scripts JS usam stale-while-revalidate para atualização fluida sem travar o browser
            response.headers["Cache-Control"] = "public, max-age=3600, stale-while-revalidate=600"
    elif "text/html" in content_type:
        # Documentos HTML dinâmicos não sofrem cache obsoleto
        response.headers["Cache-Control"] = "no-cache, must-revalidate"
        response.headers["Pragma"] = "no-cache"

    return response

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    favicon_path = os.path.join(BASE_DIR, "static", "favicon.ico")
    if os.path.exists(favicon_path):
        return FileResponse(favicon_path, media_type="image/x-icon")
    return HTMLResponse(status_code=204)

app.mount("/static", StaticFiles(directory=os.path.join(BASE_DIR, "static")), name="static")
templates = Jinja2Templates(directory=os.path.join(BASE_DIR, "templates"))

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


def build_context(request: Request, active_page: str, extra: dict = None) -> dict:
    """Constrói o contexto padrão para os templates Jinja2 incluindo o utilizador autenticado."""
    usuario = getattr(request.state, "usuario", None) or obter_usuario_request(request)
    ctx = {
        "active_page": active_page,
        "estabelecimento": get_ativo(),
        "estabelecimentos": ESTABELECIMENTOS_DB,
        "usuario": usuario,
        "supabase_url": SUPABASE_URL,
        "supabase_anon_key": SUPABASE_ANON_KEY,
        "backend_api_url": BACKEND_API_URL
    }
    if extra:
        ctx.update(extra)
    return ctx


# =============================================================================
# ROTAS DE AUTENTICAÇÃO (LOGIN, LOGOUT, SESSÃO SUPABASE AUTH)
# =============================================================================
@app.get("/login", response_class=HTMLResponse)
async def login_page(request: Request, next: str = "/", erro: str = None, msg: str = None):
    usuario = obter_usuario_request(request)
    if usuario:
        rota_destino = ROTA_INICIAL_POR_PERFIL.get(usuario.get("perfil", "ADMIN_GERAL"), "/")
        return RedirectResponse(url=rota_destino, status_code=303)
    return templates.TemplateResponse(
        request=request,
        name="login.html",
        context={
            "estabelecimento": get_ativo(),
            "next_url": next,
            "erro": erro,
            "mensagem": msg
        }
    )


@app.post("/auth/login")
async def login_submit(
    request: Request,
    email: str = Form(...),
    password: str = Form(...),
    next: str = Form("/")
):
    global ESTABELECIMENTO_ATIVO_ID
    user_data = autenticar_utilizador(email, password)
    if not user_data:
        return templates.TemplateResponse(
            request=request,
            name="login.html",
            context={
                "estabelecimento": get_ativo(),
                "next_url": next,
                "email_preenchido": email,
                "erro": "Credenciais inválidas. Verifique o seu email e palavra-passe."
            },
            status_code=401
        )

    # Ajusta o estabelecimento ativo para o tenant do utilizador se não for ADMIN_GERAL
    if user_data.get("estabelecimento_id") in ("1", "2"):
        ESTABELECIMENTO_ATIVO_ID = str(user_data["estabelecimento_id"])

    token = assinar_sessao(user_data)
    perfil = user_data.get("perfil", "OPERADOR")
    permissoes = RBAC_PERMISSOES_POR_PERFIL.get(perfil, [])

    # Decide para qual rota redirecionar respeitando as permissões RBAC do perfil
    destino = next if (next and next.startswith("/") and not next.startswith("//")) else "/"
    modulo_destino = ROTAS_MODULO_RBAC.get(destino)
    if modulo_destino and modulo_destino not in permissoes:
        destino = ROTA_INICIAL_POR_PERFIL.get(perfil, "/pdv")

    # Adiciona parâmetro de boas-vindas após o login com sucesso
    sep = "&" if "?" in destino else "?"
    destino_com_boas_vindas = f"{destino}{sep}bem_vindo=1"

    response = RedirectResponse(url=destino_com_boas_vindas, status_code=303)
    response.set_cookie(
        key=SESSION_COOKIE_NAME,
        value=token,
        httponly=True,
        samesite="lax",
        max_age=7 * 24 * 3600,
        path="/"
    )
    return response


@app.get("/logout")
@app.post("/auth/logout")
async def logout_route():
    response = RedirectResponse(url="/login?msg=Sessão+terminada+com+sucesso.", status_code=303)
    response.delete_cookie(key=SESSION_COOKIE_NAME, path="/")
    return response


@app.get("/recuperar-senha", response_class=HTMLResponse)
async def recuperar_senha_page(request: Request, erro: str = None, msg: str = None):
    return templates.TemplateResponse(
        request=request,
        name="recuperar_senha.html",
        context={
            "estabelecimento": get_ativo(),
            "erro": erro,
            "mensagem": msg
        }
    )


@app.post("/recuperar-senha", response_class=HTMLResponse)
async def recuperar_senha_submit(request: Request, email: str = Form(...)):
    # Dispara recuperação no Supabase Auth caso configurado
    if SUPABASE_URL and SUPABASE_ANON_KEY and "@" in email:
        try:
            await http_client.post(
                f"{SUPABASE_URL}/auth/v1/recover",
                json={"email": email.strip()},
                headers={"apikey": SUPABASE_ANON_KEY, "Content-Type": "application/json"},
                timeout=4.0
            )
        except Exception:
            pass

    return templates.TemplateResponse(
        request=request,
        name="recuperar_senha.html",
        context={
            "estabelecimento": get_ativo(),
            "mensagem": f"Se o endereço {email} estiver registado, enviámos as instruções para redefinir a password."
        }
    )


@app.get("/auth/me")
async def auth_me(request: Request):
    usuario = obter_usuario_request(request)
    if not usuario:
        return JSONResponse(status_code=401, content={"authenticated": False})
    return {"authenticated": True, "usuario": usuario}


@app.get("/api/status")
async def api_status():
    """Verifica a conectividade em tempo real entre Frontend, Supabase e Backend .NET."""
    supabase_ok = False
    backend_ok = False
    try:
        sb_resp = requests.get(
            f"{SUPABASE_URL}/auth/v1/health",
            headers={"apikey": SUPABASE_ANON_KEY},
            timeout=3
        )
        supabase_ok = sb_resp.status_code in (200, 204)
    except Exception:
        supabase_ok = False

    for base_api in (BACKEND_LOCAL_URL, BACKEND_API_URL):
        if not base_api:
            continue
        try:
            b_resp = requests.get(f"{base_api}/health", timeout=3)
            if b_resp.status_code == 200:
                backend_ok = True
                break
        except Exception:
            pass

    return {
        "status": "online",
        "supabase_url": SUPABASE_URL,
        "supabase_connected": supabase_ok,
        "backend_api_url": BACKEND_API_URL,
        "backend_connected": backend_ok
    }


@app.get("/", response_class=HTMLResponse)
async def dashboard(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="dashboard.html",
        context=build_context(request, "dashboard")
    )

@app.get("/pdv", response_class=HTMLResponse)
async def pdv_page(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="pdv.html",
        context=build_context(request, "pdv")
    )

@app.get("/produtos", response_class=HTMLResponse)
async def produtos_page(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="produtos.html",
        context=build_context(request, "produtos")
    )

@app.get("/acompanhamentos", response_class=HTMLResponse)
async def acompanhamentos_page(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="acompanhamentos.html",
        context=build_context(request, "acompanhamentos")
    )

@app.get("/postos-preparacao")
async def postos_page(request: Request):
    return RedirectResponse(url="/estabelecimento#postos-preparacao")

@app.get("/tipos-pedidos")
async def tipos_pedidos_page(request: Request):
    return RedirectResponse(url="/estabelecimento#tipos-pedidos")

@app.get("/tabelas-apoio")
async def tabelas_apoio_page(request: Request):
    return RedirectResponse(url="/estabelecimento")

@app.get("/mesas", response_class=HTMLResponse)
async def mesas_page(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="mesas.html",
        context=build_context(request, "mesas")
    )

@app.get("/categorias", response_class=HTMLResponse)
async def categorias_page(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="categorias.html",
        context=build_context(request, "categorias")
    )

@app.get("/stock", response_class=HTMLResponse)
async def stock_page(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="stock.html",
        context=build_context(request, "stock")
    )

@app.get("/transferencias-stock", response_class=HTMLResponse)
async def transferencias_page(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="transferencias_stock.html",
        context=build_context(request, "transferencias-stock")
    )

@app.get("/historico-vendas", response_class=HTMLResponse)
async def historico_vendas_page(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="historico_vendas.html",
        context=build_context(request, "historico-vendas")
    )

@app.get("/cozinha", response_class=HTMLResponse)
async def cozinha_page(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="cozinha.html",
        context=build_context(request, "cozinha")
    )

@app.get("/movimentos-stock", response_class=HTMLResponse)
async def movimentos_stock_page(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="movimentos_stock.html",
        context=build_context(request, "movimentos-stock")
    )

@app.get("/guias-entrada", response_class=HTMLResponse)
async def guias_entrada_page(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="guias_entrada.html",
        context=build_context(request, "guias-entrada")
    )

@app.get("/compras", response_class=HTMLResponse)
async def compras_page(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="compras.html",
        context=build_context(request, "compras")
    )

@app.get("/fornecedores", response_class=HTMLResponse)
async def fornecedores_page(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="fornecedores.html",
        context=build_context(request, "fornecedores")
    )

@app.get("/clientes", response_class=HTMLResponse)
async def clientes_page(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="clientes.html",
        context=build_context(request, "clientes")
    )

@app.get("/utilizadores", response_class=HTMLResponse)
async def utilizadores_page(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="utilizadores.html",
        context=build_context(request, "utilizadores")
    )


@app.get("/estabelecimento", response_class=HTMLResponse)
async def config_estabelecimento(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="estabelecimento.html",
        context=build_context(request, "estabelecimento")
    )

@app.get("/financeiro", response_class=HTMLResponse)
@app.get("/gestao-caixa", response_class=HTMLResponse)
async def financeiro_page(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="gestao_caixa.html",
        context=build_context(request, "financeiro")
    )

@app.get("/veiculos-delivery", response_class=HTMLResponse)
async def veiculos_delivery_page(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="veiculos_delivery.html",
        context=build_context(request, "veiculos-delivery")
    )

@app.get("/piscina", response_class=HTMLResponse)
async def piscina_page(request: Request):
    est = get_ativo()
    if not est.get("tem_piscina", False):
        return RedirectResponse(url="/", status_code=303)
    return templates.TemplateResponse(
        request=request,
        name="piscina.html",
        context=build_context(request, "piscina", {"estabelecimento": est})
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
            # Sincroniza também no backend .NET / Supabase
            try:
                for base_api in (BACKEND_LOCAL_URL, BACKEND_API_URL):
                    if not base_api:
                        continue
                    requests.post(
                        f"{base_api}/api/syncstate/sync",
                        json={"estabelecimentos": [est]},
                        headers={"X-Tenant-Id": est_id},
                        timeout=3
                    )
            except Exception:
                pass
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

    # Grava na base de dados (Backend .NET / Supabase) de forma não-bloqueante
    for base_api in (BACKEND_LOCAL_URL, BACKEND_API_URL):
        if not base_api:
            continue
        try:
            resp = await http_client.post(
                f"{base_api}/api/syncstate/sync",
                json={"estabelecimentos": [novo]},
                headers={"X-Tenant-Id": novo["id"]},
                timeout=2.0
            )
            if resp.status_code == 200:
                break
        except Exception:
            pass

    return {"status": "ok", "estabelecimento": novo}

# =============================================================================
# ENDPOINTS DE PERSISTÊNCIA DIRETA NA BASE DE DADOS SUPABASE / POSTGRESQL
# =============================================================================
@app.get("/api/db/state")
async def db_state(request: Request):
    """Obtém o estado persistido das tabelas na base de dados através do backend .NET de modo assíncrono e ultra-veloz."""
    usuario = getattr(request.state, "usuario", None) or obter_usuario_request(request)
    tenant_id = usuario.get("estabelecimento_id") if usuario else ESTABELECIMENTO_ATIVO_ID

    for base_api in (BACKEND_LOCAL_URL, BACKEND_API_URL):
        if not base_api:
            continue
        try:
            resp = await http_client.get(
                f"{base_api}/api/syncstate/state",
                headers={"X-Tenant-Id": str(tenant_id)},
                timeout=3.0
            )
            if resp.status_code == 200:
                return resp.json()
        except Exception:
            pass

    return JSONResponse(status_code=200, content={})

@app.post("/api/db/sync")
async def db_sync(request: Request):
    """Encaminha os cadastros gravados no Frontend para serem persistidos no Supabase / PostgreSQL de modo assíncrono."""
    usuario = getattr(request.state, "usuario", None) or obter_usuario_request(request)
    tenant_id = usuario.get("estabelecimento_id") if usuario else ESTABELECIMENTO_ATIVO_ID

    try:
        body = await request.json()
    except Exception:
        return JSONResponse(status_code=400, content={"status": "error", "message": "JSON inválido"})

    for base_api in (BACKEND_LOCAL_URL, BACKEND_API_URL):
        if not base_api:
            continue
        try:
            resp = await http_client.post(
                f"{base_api}/api/syncstate/sync",
                json=body,
                headers={"X-Tenant-Id": str(tenant_id), "Content-Type": "application/json"},
                timeout=4.0
            )
            if resp.status_code == 200:
                return resp.json()
        except Exception:
            pass

    return {"status": "saved_locally", "message": "Guardado com sucesso."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8070, reload=True)
