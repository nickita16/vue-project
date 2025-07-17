export default async function handler(req, res) {
  const targetUrl = req.query.url
  if (!targetUrl) return res.status(400).send('Missing url param')

  const response = await fetch(targetUrl)
  const data = await response.text()

  res.setHeader('Access-Control-Allow-Origin', '*')
  res.send(data)
}
