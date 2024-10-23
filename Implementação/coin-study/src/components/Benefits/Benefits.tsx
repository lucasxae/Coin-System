const vantagens = [
  {
    id: 1,
    title: "Desconto em Restaurante",
    cost: "100 Moedas",
    description: "10% de desconto no Restaurante Universitário.",
  },
  {
    id: 2,
    title: "Desconto na Mensalidade",
    cost: "500 Moedas",
    description: "Desconto de 5% na próxima mensalidade.",
  },
  {
    id: 3,
    title: "Compra de Material",
    cost: "300 Moedas",
    description: "Compra de material específico para cursos.",
  },
];

const Benefits = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Vantagens Disponíveis</h2>
      <div className="space-y-4">
        {vantagens.map((vantagem) => (
          <div key={vantagem.id} className="border-b pb-4">
            <h3 className="text-lg font-semibold">{vantagem.title}</h3>
            <p className="text-sm text-gray-600">{vantagem.description}</p>
            <p className="text-green-500 font-bold mt-2">{vantagem.cost}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Benefits;
