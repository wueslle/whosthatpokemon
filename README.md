
# Quem é esse pokemon?

"Quem é esse pokemon?" é um projeto realizado em HTML/CSS e VanillaJS baseado no jogo de adivinhação presente no desenho Pokémon. 

O objetivo do jogo é simples: Adivinhe o pokemon escondido, se você acertar o pokemon será revelado e você ganhará 1 ponto, caso contrário terá outras 5 chances.


# Explicação

O projeto é alimentado pela API PokeAPI [https://pokeapi.co/]. 

O código recebe os dados do pokémon que é gerado aleatoriamente utilizando o método Math.random() gerando um número aleatório entre 1 e 251 e adicionando ao endereço da API. A função então retorna os dados que são utilizados no projeto e alimenta uma lista de dicas também.

A função getPoke() inicializa a lógica do site fazendo a requisição para a API e gerando o sprite do pokémon aleatório já com o estilo filter: brightness(0) para que a adivinhação aconteça. A função pokeCheck() então verifica se o input é igual ao nome do pokémon gerado aleatoriamente, caso seja, o jogo acaba e o botão para continuar e gerar um novo pokémon é liberado.

## Aprendizados

O objetivo desse projeto foi estudar o método fetch() em javascript, assim como funções assíncronas, promises e consumo de API's. Como aprendizados adicionais, foram fortalecidos os conhecimentos de manipulação de DOM, events e programação funcional.

