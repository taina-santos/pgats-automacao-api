const { users } = require('../model/userModel');
const { transfers } = require('../model/transferModel');

function transfer({ from, to, amount }) {
  const sender = users.find(u => u.username === from);
  const recipient = users.find(u => u.username === to);
  if (!sender || !recipient) {
    return { error: 'Usuário remetente ou destinatário não encontrado' };
  }
  if (sender.saldo < amount) {
    return { error: 'Saldo insuficiente' };
  }
  const isFavorecido = sender.favorecidos.includes(to);
  if (!isFavorecido && amount >= 5000) {
    return { error: 'Transferências acima de R$ 5.000,00 só podem ser feitas para favorecidos' };
  }
  
  sender.saldo -= amount;
  recipient.saldo += amount;
  const transfer = { from, to, amount, date: new Date() };
  transfers.push(transfer);
  return { transfer };
}

function listTransfers() {
  return transfers.map(t => ({ from: t.from, to: t.to, amount: t.amount, date: t.date }));
}

module.exports = {
  transfer,
  listTransfers
};
