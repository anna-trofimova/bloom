export default function handler(req, res) {
  res.json({ ok: true, time: Date.now() });
}
