// ============================================================
// TINKERCAD NET CONNECTOR - VERSÃO SIMPLIFICADA PARA O PROJETO
// ============================================================
//
// Baseado no TinkercadNetConnector, de Joshua Ellul e
// Carl James Debono (University of Malta):
// https://github.com/joshuaellul/tinkercad-net-connector
//
// Modificado pela equipe GoodWe EV Challenge em setembro de 2026.
// Distribuído sob a GNU GPL v3.0 (ver LICENSE e README.md).
// ============================================================


// Recebe mensagens vindas do content.js
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {

        // ====================================================
        // ENVIA O OUTPUT DO SERIAL PARA O PYTHON
        // ====================================================

        if (request.msg === "send-output") {

            chrome.storage.local.get(
                ["urlbase"],
                async function(result) {

                    const urlBase = result.urlbase;

                    if (!urlBase) {

                        console.error(
                            "URL do servidor não configurada."
                        );

                        sendResponse({
                            ok: false,
                            erro: "URL não configurada"
                        });

                        return;
                    }


                    const device =
                        sender.tab && sender.tab.id
                            ? sender.tab.id
                            : "tinkercad";


                    const url =
                        urlBase
                        + "?msg=output"
                        + "&out="
                        + encodeURIComponent(request.output)
                        + "&device="
                        + encodeURIComponent(device);


                    try {

                        const resposta = await fetch(url);

                        const texto =
                            await resposta.text();


                        console.log(
                            "Dados enviados para o Python:",
                            request.output
                        );


                        sendResponse({
                            ok: true,
                            resposta: texto
                        });


                    } catch (erro) {

                        console.error(
                            "Erro ao enviar dados:",
                            erro
                        );


                        sendResponse({
                            ok: false,
                            erro: erro.toString()
                        });
                    }

                }
            );


            // Mantém o canal aberto enquanto o fetch acontece
            return true;
        }


        // ====================================================
        // RETORNA O ID DA ABA, SE NECESSÁRIO
        // ====================================================

        if (request.msg === "get-tabid") {

            const tabId =
                sender.tab
                    ? sender.tab.id
                    : null;

            sendResponse(tabId);

            return true;
        }

    }
);