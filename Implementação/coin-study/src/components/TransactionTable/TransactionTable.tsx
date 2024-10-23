const transactions = [
  {
    id: 1,
    description: "Recebido por participação ativa",
    amount: "+50 Moedas",
    date: "Out 20, 2024",
  },
  {
    id: 2,
    description: "Troca por desconto em restaurante",
    amount: "-100 Moedas",
    date: "Out 18, 2024",
  },
];

const TransactionTable = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg col-span-2">
      <h2 className="text-xl font-semibold mb-4">Histórico de Moedas</h2>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2">Data</th>
            <th className="py-2">Descrição</th>
            <th className="py-2">Montante</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="border-b">
              <td className="py-2">{transaction.date}</td>
              <td className="py-2">{transaction.description}</td>
              <td
                className={`py-2 ${
                  transaction.amount.startsWith("+")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {transaction.amount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
