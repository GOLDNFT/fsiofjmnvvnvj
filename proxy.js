// proxy.js - Versão básica funcional
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

const CHAVES_VALIDAS = new Set(["3zAl2ixWkl8HylYkmdOgb346ZY5iOU4vrzxpmt"])

async function handleRequest(request) {
  const url = new URL(request.url)
  
  if (!CHAVES_VALIDAS.has(url.searchParams.get('chave'))) {
    return new Response('Acesso negado', { status: 401 })
  }

  const resposta = await fetch('https://tudoconsulta.com/placa/consultar/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: url.searchParams.get('email'),
      placa: url.searchParams.get('placa')
    })
  })
  
  return new Response(await resposta.text(), {
    headers: { 'Access-Control-Allow-Origin': '*' }
  })
}
