const transferService = require('../../src/service/transferService');

exports.transfer = (req, res) => {
  const { from, to, amount } = req.body;
  if (!from || !to || typeof amount !== 'number') {
    return res.status(400).json({ error: 'Campos obrigatórios: from, to, amount (number)' });
  }

  try {
    const transfer = transferService.transfer({ from, to, amount });
    res.status(201).json(transfer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.listTransfers = (req, res) => {
  res.json({ transfers: transferService.listTransfers() });
};