export default async function handler(req, res) {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Falta el id' });

  const API_KEY = 'AIzaSyB_H2upRg9azJY9E3JRdfgjqVMiPO_dSfo';

  try {
    const url = `https://www.googleapis.com/drive/v3/files/${id}?alt=media&key=${API_KEY}`;
    const r = await fetch(url, { redirect: 'follow' });

    if (!r.ok) {
      const text = await r.text();
      return res.status(r.status).json({ error: `Drive respondió ${r.status}`, detail: text });
    }

    const buffer = await r.arrayBuffer();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/pdf');
    res.send(Buffer.from(buffer));
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}
