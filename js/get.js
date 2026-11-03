const resposta = document.querySelector("resposta");
const lista = document.querySelector("lista-filmes");
const modelo = document.querySelector("modelo-filme");


const apiKey = "cv_TqwFjbwdcQisihRIw4Por7rB2VCyjUoa2gpTBr0yQYQBKqKbg07xO-iyOgBNltrU";

const apiUrl = "https://api-ds.codeverse.dev.br/api/filmes";

async function buscarFilmes() {
    
    // Mostra uma msg.
    resposta.textContent="Carregando filmes..."

    try {
        // Fazer o get
        const retorno = await fetch(apiUrl, {
            method: "GET",
            headers: {"x-api-key" : apiKey},
        });

        // Verificar se não deu certo
        if(!retorno.ok) {
            throw new Error("Não foi possível carregar os filmes.");
        }

        // Converter o resultado para JSON, pois será um objeto.
        const resultado = await retorno.json();

        // Percorrer todos os herois que esta dentro de resultado.
        for (const filme of resultado.data) {
            // fazer uma copia do modelo que criamos no html

            const card = modelo.textContent.cloneNode(true);

            // preencher cada item desse card

            card.querySelector(".nome").textContent = filme.title;
            card.querySelector(".genero").textContent = filme.genero;
            card.querySelector(".ano").textContent = filme.ano;
            card.querySelector(".diretor").textContent = filme.diretor;
            card.querySelector(".nota").textContent = filme.nota;

            const imagem = card.querySelector(".imagem-filme");

            if (filme.imageUrl) {
                imagem.src = filme.imageUrl;
                imagem.alt = filme.title;

                imagem.onerror = () => imagem.remove();
            } else {
                imagem.remove();
            }

            // adiciona o card preenchido na tela

            lista.appendChild(card);
            resposta.textContent = "";

        }

    } catch (error) {
        console.error(error);
        resposta.textContent = "Não foi possível carregar os filmes. Tente novamente!"
    }
}

// Executar o arquivo
buscarFilmes();