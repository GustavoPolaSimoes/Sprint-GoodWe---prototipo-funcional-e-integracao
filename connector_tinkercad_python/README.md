# Tinkercad Net Connector (versão adaptada)

Extensão do Google Chrome que captura a saída do Monitor Serial dos circuitos Arduino simulados no Tinkercad e a envia, por requisições HTTP, para o backend Flask do projeto (`app.py`).

## Projeto original e créditos

Esta extensão é uma **versão modificada** do projeto open source **TinkercadNetConnector**, desenvolvido por:

- **Joshua Ellul**, Department of Computer Science, University of Malta
- **Carl James Debono**, Department of Communications and Computer Engineering, University of Malta

Repositório original: <https://github.com/joshuaellul/tinkercad-net-connector>

Artigo de referência:

> ELLUL, Joshua; DEBONO, Carl James. TinkercadNetConnector: Connecting emulated IoT devices to the outside world. **SoftwareX**, v. 20, 101218, 2022. DOI: [10.1016/j.softx.2022.101218](https://doi.org/10.1016/j.softx.2022.101218).

O protocolo de comunicação utilizado pelo projeto foi definido na extensão original: envio da saída serial por `GET <url base>?msg=output&out=<mensagem>&device=<id da aba>` e identificação de cada dispositivo pelo ID da aba do Chrome.

## Licença

O projeto original é distribuído sob a **GNU General Public License v3.0 (GPL-3.0)**. Por ser uma obra derivada, esta versão modificada da extensão também é distribuída sob a GPL-3.0. O texto completo da licença está no arquivo [LICENSE](LICENSE).

A licença se aplica apenas aos arquivos desta pasta. O backend (`app.py`), o dashboard (`index.html`) e o código Arduino (`carregador.ino`) são programas independentes, que se comunicam com a extensão apenas por HTTP.

## Modificações realizadas

Modificações feitas pela equipe do projeto GoodWe EV Challenge em setembro de 2026:

| Arquivo | Situação | Alterações |
|---|---|---|
| `manifest.json` | Modificado | Migrado do Manifest V2 para o Manifest V3 (`service_worker`, `action` e `host_permissions`), com permissões para `localhost:8080` e `127.0.0.1:8080`. |
| `background.js` | Reescrito (simplificado) | Mantém o envio da saída serial ao servidor (`send-output`) e a identificação por aba (`get-tabid`). Foi removida a consulta periódica de entradas (`msg=allinputs`), pois o projeto só envia dados do Arduino para o servidor. |
| `content.js` | Reescrito | Em vez de observar o painel serial com `MutationObserver`/`DOMSubtreeModified`, procura a cada 500 ms a última linha JSON no formato do projeto e só envia os dados quando eles mudam. Foi removido o envio de dados para a entrada serial do Arduino. |
| `popup.html`, `popup.js` | Sem alterações | Idênticos ao original. |
| `on.png`, `off.png` | Sem alterações | Idênticos ao original. |

## Instalação

1. No Chrome, acesse `chrome://extensions/`.
2. Ative o **Modo do desenvolvedor**.
3. Clique em **Carregar sem compactação** e selecione esta pasta (`connector_tinkercad_python`).
4. Abra um circuito do Tinkercad, clique no ícone da extensão e configure a **Base url**:

```text
http://127.0.0.1:8080/arduinoserver
```

5. Clique em **Save Settings** para salvar.
