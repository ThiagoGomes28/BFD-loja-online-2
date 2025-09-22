
let produtos = [
    { nome: "Camiseta", preco: 135, destaque: true, img: "./assets/imagens/camiseta.jpg?text=Camiseta" },
    { nome: "Tênis", preco: 250, destaque: false, img: "./assets/imagens/tenis.jpg?text=Tenis" },
    { nome: "Boné", preco: 80, destaque: true, img: "./assets/imagens/bone.jpg?text=Bone" },
    { nome: "Óculos", preco: 120, destaque: false, img: "./assets/imagens/oculos.jpg?text=Oculos" },
    { nome: "Relógio", preco: 275, destaque: true, img: "./assets/imagens/relogio.jpg?text=Relogio" }
];

let carrinho = [];

let listaProdutos = document.getElementById("lista-produtos");
let filtroSelecionado = document.getElementById("filtro");

function exibirProdutos(lista) {
    let html = "";

    if (lista.length === 0) {

        html = `<p>Nenhum produto encontrado</p>`;
    } else {
        lista.forEach(p => {
            let destaqueProduto = p.destaque ? '<p class="corDestaque"><b>🌟 Destaque</b></p>' : "";
            html += `
              <div class="item">
                <img src="${p.img}" alt="${p.nome}">
                <h3>${p.nome}</h3>
                <p class="preco">R$ ${p.preco}</p>
                <button class="btn-adicionar" onclick="adicionarProduto('${p.nome}', ${p.preco})">Adicionar</button>
                ${destaqueProduto}
              </div>
            `;
        });
    }

    listaProdutos.innerHTML = html;
}

let buscaProduto = document.getElementById("busca");

buscaProduto.addEventListener("input", () => {
    let termo = buscaProduto.value.toLowerCase();
    let produtosFiltrados = produtos.filter(p => p.nome.toLowerCase().includes(termo));
    exibirProdutos(produtosFiltrados);
});

filtroSelecionado.addEventListener("change", () => {
    let produtosFiltrados = [...produtos];
    switch (filtroSelecionado.value) {
        case "az":
            produtosFiltrados.sort((a, b) => a.nome.localeCompare(b.nome));
            break;
        case "destaque":
            produtosFiltrados = produtosFiltrados.filter(p => p.destaque);
            break;
        case "menor":
            produtosFiltrados.sort((a, b) => a.preco - b.preco);
            break;
        case "maior":
            produtosFiltrados.sort((a, b) => b.preco - a.preco);
            break;
        default:
            produtosFiltrados = produtos;
    }
    exibirProdutos(produtosFiltrados);
});

function adicionarProduto(nome, preco) {
    let produto = carrinho.find(item => item.nome === nome);
    if (produto) {
        produto.quantidade++;
    } else {
        carrinho.push({ nome, preco, quantidade: 1 });
    }
    atualizarCarrinho();
}

function aumentarQuantidade(nome) {
    let produto = carrinho.find(item => item.nome === nome);
    if (produto) {
        produto.quantidade++;
    }
    atualizarCarrinho();
}

function diminuirQuantidade(nome) {
    let produto = carrinho.find(item => item.nome === nome);
    if (produto) {
        produto.quantidade--;
        if (produto.quantidade <= 0) {
            carrinho = carrinho.filter(item => item.nome !== nome);
        }
    }
    atualizarCarrinho();
}

function atualizarCarrinho() {
    let lista = document.getElementById("lista-carrinho");
    let total = 0;
    lista.innerHTML = "";

    lista.innerHTML = "";
    carrinho.forEach(item => {
        total += item.preco * item.quantidade;
        lista.innerHTML += `
    <div class="item-carrinho">
        <span>${item.nome} (X${item.quantidade})</span>
        <span>R$ ${item.preco * item.quantidade}</span>
        <div>
            <button class="btn-mais" onclick="aumentarQuantidade('${item.nome}')">+</button>
            <button class="btn-menos" onclick="diminuirQuantidade('${item.nome}')">-</button>
        </div>
    </div>`;
    });

    document.getElementById("total").textContent = total;
}

exibirProdutos(produtos);