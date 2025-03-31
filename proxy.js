addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

// Lista de chaves válidas (substitua pelas suas)
const CHAVES_VALIDAS = new Set([
  "3zAl2ixWkl8HylYkmdOgb346ZY5iOU4vrzxpmt"
])

async function handleRequest(request) {
  const url = new URL(request.url)
  const chave = url.searchParams.get('chave')

  // Verifica se a chave está na lista de válidas
  if (!chave || !CHAVES_VALIDAS.has(chave)) {
    return new Response('Acesso negado: chave inválida', { 
      status: 401,
      headers: { 'Access-Control-Allow-Origin': '*' }
    })
  }

  // Processa a requisição se a chave for válida
  try {
    const resposta = await fetch('https://tudoconsulta.com/placa/consultar/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'https://tudoconsulta.com'
      },
      body: JSON.stringify({
        email: url.searchParams.get('email'),
        placa: url.searchParams.get('placa')
      })
    })

    return new Response(await resposta.text(), {
      headers: { 'Access-Control-Allow-Origin': '*' }
    })

  } catch (erro) {
    return new Response('Erro interno', { status: 500 })
  }
}
