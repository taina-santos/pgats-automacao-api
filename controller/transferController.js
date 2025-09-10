const transferService = require('../service/transferService');

exports.transfer = (req, res) => {
  const { from, to, amount } = req.body;
  if (!from || !to || typeof amount !== 'number') {
    return res.status(400).json({ error: 'Campos obrigatórios: from, to, amount (number)' });
  }
  const result = transferService.transfer({ from, to, amount });
  if (result.error) {
    return res.status(400).json({ error: result.error });
  }
  res.status(201).json({ transfer: result.transfer });
};
