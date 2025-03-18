import { useEffect, useState } from "react";
import api from "@/utils/post";

const TotalBalance = () => {
  const [totalBalance, setTotalBalance] = useState<number | null>(null);

  useEffect(() => {
    fetchTotalBalance();
  }, []);

  const fetchTotalBalance = async () => {
    try {
      const { data } = await api.get("/expenses");

      if (!data || !Array.isArray(data.expenses)) {
        console.error("❌ Erro ao carregar despesas:", data);
        setTotalBalance(0);
        return;
      }

      // Calcula o saldo total
      const balance = data.expenses.reduce((acc: number, expense: any) => acc + expense.amount, 0);
      setTotalBalance(balance);
    } catch (error) {
      console.error("Erro ao buscar saldo total:", error);
      setTotalBalance(0);
    }
  };

  return (
    <div className="flex justify-end w-full px-6 mt-4">
      <div className="bg-white p-4 rounded-lg shadow-md w-80">
        <h3 className="text-lg font-semibold text-gray-700">Saldo Total</h3>
        <span className={`text-2xl font-bold ${totalBalance! >= 0 ? "text-green-600" : "text-red-600"}`}>
          R$ {totalBalance !== null ? totalBalance.toFixed(2) : "Carregando..."}
        </span>
      </div>
    </div>
  );
};

export default TotalBalance;
