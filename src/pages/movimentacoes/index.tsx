import MainLayout from '../../layouts/MainLayout';

const Movimentacoes = () => {
  const estatisticas = [
    { titulo: 'Receitas', valor: 'R$ 12.450,00', variacao: '+12%' },
    { titulo: 'Despesas', valor: 'R$ 8.320,00', variacao: '-5%' },
    { titulo: 'Saldo Atual', valor: 'R$ 4.130,00', variacao: '+20%' },
  ];

  const transacoesRecentes = [
    { id: 1, descricao: 'Venda de Produto', valor: 'R$ 2.500,00', data: '2024-12-21' },
    { id: 2, descricao: 'Compra de Material', valor: '-R$ 1.200,00', data: '2024-12-20' },
    { id: 3, descricao: 'Pagamento de Cliente', valor: 'R$ 3.000,00', data: '2024-12-19' },
    { id: 4, descricao: 'Assinatura de Serviço', valor: '-R$ 150,00', data: '2024-12-18' },
  ];

  return (
    <MainLayout>
      <div className="w-full px-6 mt-10">
        <h2 className="text-2xl font-bold text-gray-700">Bem-vindo à sua página inicial, Pedro Italo!</h2>
        <p className="mt-4 text-gray-500">
          Aqui você pode gerenciar suas finanças, ver dashboards, relatórios e muito mais!
        </p>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          {estatisticas.map((item, index) => (
            <div key={index} className="p-4 border rounded-lg shadow-sm bg-white">
              <h3 className="text-gray-600 font-semibold">{item.titulo}</h3>
              <p className="text-2xl font-bold text-gray-800 mt-2">{item.valor}</p>
              <p className={`mt-1 text-sm ${item.variacao.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                {item.variacao}
              </p>
            </div>
          ))}
        </div>

        {/* Tabela de Transações Recentes */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Transações Recentes</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-200">
              <thead className="bg-gray-100">
                <tr className="text-sm text-gray-700">
                  <th className="border-b border-r border-gray-400 px-4 py-2 text-center">Data</th>
                  <th className="border-b border-r border-gray-400 px-4 py-2 text-center">Descrição</th>
                  <th className="border-b border-gray-400 px-4 py-2 text-center">Valor</th>
                </tr>
              </thead>
              <tbody>
                {transacoesRecentes.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                    <td className="border border-gray-300 text-gray-600 px-4 py-2 text-center text-sm">
                      {item.data}
                    </td>
                    <td className="border border-gray-300 text-gray-600 px-4 py-2 text-center text-sm">
                      {item.descricao}
                    </td>
                    <td
                      className={`border border-gray-300 px-4 py-2 text-center text-sm ${
                        item.valor.startsWith('-') ? 'text-red-500' : 'text-green-500'
                      }`}
                    >
                      {item.valor}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Movimentacoes;
