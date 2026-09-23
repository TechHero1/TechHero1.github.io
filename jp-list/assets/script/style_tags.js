export function update_old_tags(text="") {
  //old umineko ids
  text = text.replaceAll("vermelho_umineko_ps3","vermelho_umineko_mod");
  text = text.replaceAll("azul_umineko_ps3","azul_umineko_mod");
  text = text.replaceAll("roxo_umineko_ps3","roxo_umineko_mod");
  text = text.replaceAll("dourado_umineko_ps3","dourado_umineko_mod");
  text = text.replaceAll("verde_umineko_ps3","verde_umineko_mod");

  //old preset tag
  text = text.replaceAll("[estilo:","[pre:");
  text = text.replaceAll("[/estilo]","[/pre]");

  //old old gradpercent tag
  text = text.replaceAll("[gradient_percent:","[grd:");
  text = text.replaceAll("[/gradient_percent]","[/grd]");

  //tags without att
  text = text.replaceAll("[bold]","[b]");
  text = text.replaceAll("[/bold]","[/b]");

  text = text.replaceAll("[italic]","[i]");
  text = text.replaceAll("[/italic]","[/i]");

  //tags with att
  text = text.replaceAll("[color:","[cor:");
  text = text.replaceAll("[/color]","[/cor]");

  text = text.replaceAll("[badge:","[bdg:");
  text = text.replaceAll("[/badge]","[/bdg]");

  text = text.replaceAll("[border:","[brd:");
  text = text.replaceAll("[/border]","[/brd]");

  text = text.replaceAll("[shadow:","[sdw:");
  text = text.replaceAll("[/shadow]","[/sdw]");

  text = text.replaceAll("[solidshadow:","[ssdw:");
  text = text.replaceAll("[/solidshadow]","[/ssdw]");

  text = text.replaceAll("[gradient:","[grd:");
  text = text.replaceAll("[/gradient]","[/grd]");

  text = text.replaceAll("[gradpercent:","[grd:");
  text = text.replaceAll("[/gradpercent]","[/grd]");

  text = text.replaceAll("[furigana:","[furi:");
  text = text.replaceAll("[/furigana]","[/furi]");

  text = text.replaceAll("[halfkana:","[hkat:");
  text = text.replaceAll("[/halfkana]","[/hkat]");

  text = text.replaceAll("[fullkana:","[fkat:");
  text = text.replaceAll("[/fullkana]","[/fkat]");

  text = text.replaceAll(/\[mark:(?<start>.+?):(?<value>.+?):(?<end>.+?)]/g,(match, ...args) => {
    const { start, value, end } = args.at(-1);
    return `{mark:${start}:${value}:${end}:simples}`;
  });

  text = text.replaceAll(/\[mark_p:(?<start>.+?):(?<value>.+?):(?<end>.+?)]/g,(match, ...args) => {
    const { start, value, end } = args.at(-1);
    return `{mark:${start}:${value}:${end}:porcentagem}`;
  });

  text = text.replaceAll(/\[bar_mark:(?<start>.+?):(?<value>.+?):(?<end>.+?)]/g,(match, ...args) => {
    const { start, value, end } = args.at(-1);
    return `{mark:${start}:${value}:${end}:barra}`;
  });

  //tags pre rework
  text = text.replaceAll("[grdp:","[grd:");
  text = text.replaceAll("[/grdp]","[/grd]");

  text = text.replaceAll(/\[icon:(?<id>.+?):(?<style>.+?)]/g,(match, ...args) => {
    const { id, style } = args.at(-1);
    return `{icon:${id}:${style}}`;
  });

  text = text.replaceAll(/\[bar:(?<value>.+?):(?<max>.+?)]/g,(match, ...args) => {
    const { value, max } = args.at(-1);
    return `{bar:${value}:${max}}`;
  });

  text = text.replaceAll(/\[mrk:(?<start>.+?):(?<value>.+?):(?<end>.+?)]/g,(match, ...args) => {
    const { start, value, end } = args.at(-1);
    return `{mark:${start}:${value}:${end}:simples}`;
  });

  text = text.replaceAll(/\[mrkp:(?<start>.+?):(?<value>.+?):(?<end>.+?)]/g,(match, ...args) => {
    const { start, value, end } = args.at(-1);
    return `{mark:${start}:${value}:${end}:porcentagem}`;
  });

  text = text.replaceAll(/\[barm:(?<start>.+?):(?<value>.+?):(?<end>.+?)]/g,(match, ...args) => {
    const { start, value, end } = args.at(-1);
    return `{mark:${start}:${value}:${end}:barra}`;
  });

  return text;
}

export function style_text_with_tags(text,item_data) {
  //temporario
  return text;
}

//DOCS

var custom_info_data = [];

async function fetch_custom_info() {
  if (custom_info_data == "") {
    let file_object = await fetch("data/estilos.json");
    let json_data = await file_object.json();

    custom_info_data = json_data;
  }

  create_custom_info();
}

window.fetch_custom_info = fetch_custom_info;

function create_custom_info() {
  document.querySelector(".custom_info").innerHTML = "";

  document.querySelector(".custom_info").innerHTML += `
    <div>Informações sobre a estilização das anotações</div>
    <details>
      <summary class="cursor-pointer button w-fit">Caracteres e valores especiais</summary>
      <div class="caracteres_container rounded-md shadow-md border border-gray-300 flex flex-col sm:px-2 py-5 gap-5 w-[90vw]"></div>
    </details>
    <details>
      <summary class="cursor-pointer button w-fit">Elementos</summary>
      <div class="elementos_container rounded-md shadow-md border border-gray-300 flex flex-col sm:px-2 py-5 gap-5 w-[90vw]"></div>
    </details>
    <details>
      <summary class="cursor-pointer button w-fit">Tags de estilo</summary>
      <div class="comandos_container rounded-md shadow-md border border-gray-300 flex flex-col sm:px-2 py-5 gap-5 w-[90vw]"></div>
    </details>
    <details>
      <summary class="cursor-pointer button w-fit">Estilos predefinidos</summary>
      <div class="estilos_container rounded-md shadow-md border border-gray-300 flex flex-col sm:px-2 py-5 gap-5 w-[90vw]"></div>
    </details>
  `;

  //CRIAR CARACTERES
  for (var cur_caractere = 0; cur_caractere < custom_info_data.caracteres.length; cur_caractere++) {
    if (cur_caractere > 0) document.querySelector(".caracteres_container").innerHTML += "<hr class='w-full border-gray-300'>";
    document.querySelector(".caracteres_container").innerHTML += `
      <div class="p-1 sm:p-3 flex flex-col gap-3 w-full overflow-x-auto">
        <p>${custom_info_data.caracteres[cur_caractere].funcao}</p>
        <table class="table-auto text-center">
          <thead>
            <tr>
              <th class="border-1 sm:p-2">Código</th>
              <th class="border-1 sm:p-2">Resultado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border-1 sm:p-2">${custom_info_data.caracteres[cur_caractere].comando}</td>
              <td class="border-1 sm:p-2">${custom_info_data.caracteres[cur_caractere].render}</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }

  //CRIAR ELEMENTOS
  for (var cur_elemento = 0; cur_elemento < custom_info_data.elementos.length; cur_elemento++) {
    let cur_elemento_data = custom_info_data.elementos[cur_elemento];

    let render_modelo = cur_elemento_data.modelo[0].render.replaceAll("$texto",cur_elemento_data.modelo[0].texto);

    if (cur_elemento > 0) document.querySelector(".elementos_container").innerHTML += "<hr class='w-full border-gray-300'>";
    document.querySelector(".elementos_container").innerHTML += `
      <div class="p-1 sm:p-3 flex flex-col gap-3 w-full overflow-x-auto">
        <p>${cur_elemento_data.nome}</p>
        <table class="table-auto text-center">
          <thead>
            <tr>
              <th class="border-1 sm:p-2">Código</th>
              <th class="border-1 sm:p-2">Resultado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border-1 sm:p-2 elemento-code-${cur_elemento}"></td>
              <td class="border-1 sm:p-2 elemento-render-${cur_elemento}">${render_modelo}</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;

    //CRIAR ELEMENTO (MODELO)
    let modelo_code = "";
    let modelo_params = "";
    if (cur_elemento_data.modelo[0].parametros.length > 0) {
      //MODELO COM PARAMETROS
      for (var param = 0; param < cur_elemento_data.modelo[0].parametros.length; param++) {
        modelo_params += `<code class="text-[#013220]">:</code><code class="text-[#07a]">${cur_elemento_data.modelo[0].parametros[param].nome}</code>`;

        modelo_code = `<code class="text-[#013220]">{</code><code class="text-[#905]">${cur_elemento_data.comando}</code>${modelo_params}<code class="text-[#013220]">}</code>`;
      }
    } else {
      //MODELO SEM PARAMETROS
      modelo_code = `<code class="text-[#013220]">{</code><code class="text-[#905]">${cur_elemento_data.comando}</code><code class="text-[#013220]">}</code>`;
    }
    document.querySelector(".elemento-code-"+cur_elemento).innerHTML = modelo_code;

    //CRIAR CADA EXEMPLO (SE TIVER)
    if (cur_elemento_data.hasOwnProperty("exemplo")) {
      for (var cur_exemplo = 0; cur_exemplo < cur_elemento_data.exemplo.length; cur_exemplo++) {
        let cur_exemplo_data = cur_elemento_data.exemplo[cur_exemplo];

        let exemplo_label = "<br><br>Exemplo:<br>";
        if (cur_elemento_data.exemplo.length > 1) exemplo_label = "<br><br>Exemplos:<br>";
        if (cur_exemplo == 0) document.querySelector(".elemento-code-"+cur_elemento).innerHTML += exemplo_label;

        //CRIAR ELEMENTO (EXEMPLOS)
        let exemplo_code = "";
        let exemplo_params = "";
        let break_string = "";
        if (cur_elemento_data.exemplo[cur_exemplo].parametros.length > 0) {
          //EXEMPLO COM PARAMETROS
          for (var param = 0; param < cur_elemento_data.exemplo[cur_exemplo].parametros.length; param++) {
            let param_color = "#07a";
            if (cur_elemento_data.exemplo[cur_exemplo].parametros[param].nome.includes("#")) param_color = cur_elemento_data.exemplo[cur_exemplo].parametros[param].nome;

            exemplo_params += `<code class="text-[#013220]">:</code><code class="text-[${param_color}]">${cur_elemento_data.exemplo[cur_exemplo].parametros[param].nome}</code>`;
            exemplo_code = `<code class="text-[#013220]">{</code><code class="text-[#905]">${cur_elemento_data.comando}</code>${exemplo_params}<code class="text-[#013220]">}</code>`;
            
            if (param > 0) break_string = "<br>";
            if (cur_elemento_data.exemplo[cur_exemplo].break) break_string = "<br><br>";
          }
        } else {
          //EXEMPLO SEM PARAMETROS
          exemplo_code = `<code class="text-[#013220]">{</code><code class="text-[#905]">${cur_elemento_data.comando}</code><code class="text-[#013220]">}</code>`;

          if (param > 0) break_string = "<br>";
          if (cur_elemento_data.exemplo[cur_exemplo].break) break_string = "<br><br>";
        }
        document.querySelector(".elemento-code-"+cur_elemento).innerHTML += exemplo_code+break_string;
        document.querySelector(".elemento-render-"+cur_elemento).innerHTML += cur_exemplo_data.render+break_string;
      }
    }
    //CRIA NOTAS SE TIVER
    if (cur_elemento_data.hasOwnProperty("notas")) {
      document.querySelector(".elemento-code-"+cur_elemento).innerHTML += "<br>"+cur_elemento_data.notas;
    }
  }

  //CRIAR COMANDOS
  for (var cur_comando = 0; cur_comando < custom_info_data.comandos.length; cur_comando++) {
    let cur_comando_data = custom_info_data.comandos[cur_comando];

    let render_modelo = cur_comando_data.modelo[0].render.replaceAll("$texto",cur_comando_data.modelo[0].texto);

    if (cur_comando > 0) document.querySelector(".comandos_container").innerHTML += "<hr class='w-full border-gray-300'>";
    document.querySelector(".comandos_container").innerHTML += `
      <div class="p-1 sm:p-3 flex flex-col gap-3 w-full overflow-x-auto">
        <p>${cur_comando_data.nome}</p>
        <table class="table-auto text-center">
          <thead>
            <tr>
              <th class="border-1 sm:p-2">Código</th>
              <th class="border-1 sm:p-2">Resultado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border-1 sm:p-2 comando-code-${cur_comando}"></td>
              <td class="border-1 sm:p-2 comando-render-${cur_comando}">${render_modelo}</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;

    //CRIAR COMANDO (MODELO)
    let modelo_code = "";
    let modelo_params = "";
    if (cur_comando_data.modelo[0].parametros.length > 0) {
      //MODELO COM PARAMETROS
      for (var param = 0; param < cur_comando_data.modelo[0].parametros.length; param++) {
        let cur_param_color = "#07a";
        if (cur_comando_data.modelo[0].parametros[param].opcional) cur_param_color = "#00aa2b";

        modelo_params += `<code class="text-[#013220]">:</code><code class="text-[${cur_param_color}]">${cur_comando_data.modelo[0].parametros[param].nome}</code>`;

        modelo_code = `<code class="text-[#013220]">[</code><code class="text-[#905]">${cur_comando_data.comando}</code>${modelo_params}<code class="text-[#013220]">]</code><code>${cur_comando_data.modelo[0].texto}</code><code class="text-[#013220]">[/</code><code class="text-[#905]">${cur_comando_data.comando}</code><code class="text-[#013220]">]</code>`;
      }
    } else {
      //MODELO SEM PARAMETROS
      modelo_code = `<code class="text-[#013220]">[</code><code class="text-[#905]">${cur_comando_data.comando}</code><code class="text-[#013220]">]</code><code>${cur_comando_data.modelo[0].texto}</code><code class="text-[#013220]">[/</code><code class="text-[#905]">${cur_comando_data.comando}</code><code class="text-[#013220]">]</code>`;
    }
    document.querySelector(".comando-code-"+cur_comando).innerHTML = modelo_code;

    //CRIAR CADA EXEMPLO (SE TIVER)
    if (cur_comando_data.hasOwnProperty("exemplo")) {
      for (var cur_exemplo = 0; cur_exemplo < cur_comando_data.exemplo.length; cur_exemplo++) {
        let cur_exemplo_data = cur_comando_data.exemplo[cur_exemplo];

        let exemplo_label = "<br><br>Exemplo:<br>";
        if (cur_comando_data.exemplo.length > 1) exemplo_label = "<br><br>Exemplos:<br>";
        if (cur_exemplo == 0) document.querySelector(".comando-code-"+cur_comando).innerHTML += exemplo_label;

        let render_exemplo = cur_exemplo_data.render.replaceAll("$texto",cur_exemplo_data.texto);

        //CRIAR COMANDO (EXEMPLOS)
        let exemplo_code = "";
        let exemplo_params = "";
        let break_string = "";
        if (cur_comando_data.exemplo[cur_exemplo].parametros.length > 0) {
          //EXEMPLO COM PARAMETROS
          for (var param = 0; param < cur_comando_data.exemplo[cur_exemplo].parametros.length; param++) {
            let param_color = "#07a";
            if (cur_comando_data.exemplo[cur_exemplo].parametros[param].nome.includes("#")) param_color = cur_comando_data.exemplo[cur_exemplo].parametros[param].nome;

            exemplo_params += `<code class="text-[#013220]">:</code><code class="text-[${param_color}]">${cur_comando_data.exemplo[cur_exemplo].parametros[param].nome}</code>`;
            exemplo_code = `<code class="text-[#013220]">[</code><code class="text-[#905]">${cur_comando_data.comando}</code>${exemplo_params}<code class="text-[#013220]">]</code><code>${cur_comando_data.exemplo[cur_exemplo].texto}</code><code class="text-[#013220]">[/</code><code class="text-[#905]">${cur_comando_data.comando}</code><code class="text-[#013220]">]</code>`;
            
            if (param > 0) break_string = "<br>";
            if (cur_comando_data.exemplo[cur_exemplo].break) break_string = "<br><br>";
          }
        } else {
          //EXEMPLO SEM PARAMETROS
          exemplo_code = `<code class="text-[#013220]">[</code><code class="text-[#905]">${cur_comando_data.comando}</code><code class="text-[#013220]">]</code><code>${cur_comando_data.exemplo[cur_exemplo].texto}</code><code class="text-[#013220]">[/</code><code class="text-[#905]">${cur_comando_data.comando}</code><code class="text-[#013220]">]</code>`;

          if (cur_exemplo > 0) break_string = "<br>";
          if (cur_comando_data.exemplo[cur_exemplo].break) break_string = "<br><br>";
        }
        //sei lá, só funcionou assim
        if (break_string == "") break_string = "<br>";
        document.querySelector(".comando-code-"+cur_comando).innerHTML += exemplo_code+break_string;
        document.querySelector(".comando-render-"+cur_comando).innerHTML += render_exemplo+break_string;
      }
    }
    //CRIA NOTAS SE TIVER
    if (cur_comando_data.hasOwnProperty("notas")) {
      document.querySelector(".comando-code-"+cur_comando).innerHTML += "<br>"+cur_comando_data.notas;
    }
  }

  //CRIAR ESTILOS
  for (var cur_estilo = 0; cur_estilo < custom_info_data.estilos.length; cur_estilo++) {
    let cur_estilo_data = custom_info_data.estilos[cur_estilo];

    //if (cur_estilo > 0) document.querySelector(".estilos_container").innerHTML += "<hr class='w-full border-gray-300'>";
    document.querySelector(".estilos_container").innerHTML += `
      <div class="p-1 sm:p-3 flex flex-col gap-3 w-full overflow-x-auto">
        <p>${cur_estilo_data.nome}</p>
        <table class="table-auto text-center">
          <thead>
            <tr>
              <th class="border-1 sm:p-2">Código</th>
              <th class="border-1 sm:p-2">Resultado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border-1 sm:p-2 estilo-code-${cur_estilo}"></td>
              <td class="border-1 sm:p-2 estilo-render-${cur_estilo}"></td>
            </tr>
          </tbody>
        </table>
      </div>
    `;

    //PEGAR CADA EXEMPLO
    for (var cur_exemplo = 0; cur_exemplo < cur_estilo_data.exemplo.length; cur_exemplo++) {
      let cur_exemplo_data = cur_estilo_data.exemplo[cur_exemplo];
      let render = cur_exemplo_data.render.replaceAll("$texto",cur_exemplo_data.texto);
      let linebreak = "";
      let command_name = "pre";
      if (cur_exemplo > 0) linebreak = "<br><br>";

      document.querySelector(".estilo-code-"+cur_estilo).innerHTML += `
        ${linebreak}
        <code class="text-[#013220]">[</code><code class="text-[#905]">${command_name}</code><code class="text-[#013220]">:</code><code class="text-[#07a]">${cur_exemplo_data.id}</code><code class="text-[#013220]">]</code><code>${cur_exemplo_data.texto}</code><code class="text-[#013220]">[/</code><code class="text-[#905]">${command_name}</code><code class="text-[#013220]">]</code></code>
      `;

      document.querySelector(".estilo-render-"+cur_estilo).innerHTML += linebreak+render;
    }
  }
}
