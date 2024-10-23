const BalanceCard = ({ balance }: any) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg col-span-1">
      <h2 className="text-xl font-semibold mb-4">Saldo de Moedas</h2>
      <p className="text-4xl font-bold text-green-500">{balance} Moedas</p>
      <p className="text-sm text-gray-600">
        Atualizado em {new Date().toLocaleDateString()}
      </p>
    </div>
  );
};

export default BalanceCard;
