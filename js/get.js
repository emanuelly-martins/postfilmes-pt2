const resposta = document.querySelector("resposta");
const lista = document.querySelector("lista-herois");
const modelo = document.querySelector("modelo-heroi");


const apiKey = "cv_TqwFjbwdcQisihRIw4Por7rB2VCyjUoa2gpTBr0yQYQBKqKbg07xO-iyOgBNltrU";

const apiUrl = "https://api-ds.codeverse.dev.br/api/filmes";

async function buscarHerois() {
    
    // Mostra uma msg.
    resposta.textContent="Carregando heróis..."

    try {
        // Fazer o get
        const retorno = await fetch(apiUrl, {
            method: "GET",
            headers: {"x-api-key" : apiKey},
        });

        // Verificar se não deu certo
        if(!retorno.ok) {
            throw new Error("Não foi possível carregar os heróis.");
        }

        // Converter o resultado para JSON, pois será um objeto.
        const resultado = await retorno.json();

        // Percorrer todos os herois que esta dentro de resultado.
        for (const heroi of resultado.data) {
            // fazer uma copia do modelo que criamos no html

            const card = modelo.textContent.cloneNode(true);

            // preencher cada item desse card

            card.querySelector(".nome").textContent = heroi.title;
            card.querySelector(".poder").textContent = heroi.poder;
            card.querySelector(".universo").textContent = heroi.universo;
            card.querySelector(".fraqueza").textContent = heroi.fraqueza;

            const imagem = card.querySelector(".imagem-heroi");

            if (heroi.imageUrl) {
                imagem.src = heroi.imageUrl;
                imagem.alt = heroi.title;

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
        resposta.textContent = "Não foi possível carregar os heróis. Tente novamente!"
    }
}

// Executar o arquivo
buscarHerois();