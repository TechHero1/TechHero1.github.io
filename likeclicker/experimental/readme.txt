uma ideia simples de [mais um] rework de like clicker, agora sendo ainda mais facil de modificar e funcionando 100% offline

"mais fácil de modificar": qualquer dado de qualquer categoria teria seu próprio local padronizado, qualquer adição ou remoção seria automaticamente reconhecida pelo jogo
- quer adicionar um novo item na loja? só modificar shop_items e criar um novo elemento com o id que você escolheu (na versão final, o jogo deveria criar o elemento automaticamente também)
- quer adicionar um novo idioma? só modificar lang_strings, o resto é automatico
- quer adicionar uma nova configuração? só modificar config_items (ainda não existe nessa versão de teste)

"funcionando 100% offine": só usar js e css local pra evitar problemas com CORS
isso tambem impactaria na interface que precisaria ser completamente refeita usando meus próprios estilos e objetos pra substituir as adições externas como bootstrap


eu vou terminar isso algum dia?
sinceramente, não sei...
por enquanto, eu só tive vontade de pôr algumas ideias à prova
as atualizações do game loop já fariam tudo isso aqui mudar bastante, então com certeza não é nada muito utilizavel em uma versão final






objetos dentro de objetos criam linhas bem feias né?
sério, o que significa lang_strings[game_data.lang].strings_shop_items[item_name][cur_item.name_singular] ???