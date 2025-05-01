import { useEffect, useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import api from "@/utils/post";
import {
    PieChart,
    Pie,
    Tooltip,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
    LineChart,
    Line
} from "recharts";
import TotalBalance from "@/components/TotalBalance";

const Dashboard = () => {
    const [username, setUsername] = useState<string | null>(null);
    const [expenses, setExpenses] = useState<{ name: string; value: number }[]>([]);
    const [monthlyData, setMonthlyData] = useState<any[]>([]);
    const [balanceData, setBalanceData] = useState<any[]>([]);

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        setUsername(storedUsername);

        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        try {
            const { data } = await api.get("/expenses");

            if (!data || !Array.isArray(data.expenses)) {
                console.error("❌ Dados de despesas não são um array:", data);
                setExpenses([]); // Evita erro no .map()
                return;
            }

            setExpenses(data.expenses); // ✅ Pegando apenas o array de despesas
            processCategoryData(data.expenses);
            processMonthlyData(data.expenses);
            processBalanceData(data.expenses);
        } catch (error) {
            console.error("Erro ao buscar movimentações:", error);
            setExpenses([]); // Garante que expenses seja sempre um array
        }
    };

    // Processa os dados para o gráfico de pizza (Distribuição por categoria)
    const processCategoryData = (expenses: any[]) => {
        const categoryMap: { [key: string]: number } = {};
        expenses.forEach((expense) => {
            const category = expense.category?.name || "Desconhecido";
            categoryMap[category] = (categoryMap[category] || 0) + expense.amount;
        });

        const processedData = Object.keys(categoryMap).map((key) => ({
            name: key,
            value: categoryMap[key],
        }));
        setExpenses(processedData);
    };

    // Processa os dados para o gráfico de barras (Receitas x Despesas por mês)
    const processMonthlyData = (expenses: any[]) => {
        const monthlyMap: { [key: string]: { receitas: number; despesas: number } } = {};

        expenses.forEach((expense) => {
            const date = new Date(expense.createdAt);
            const month = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`;

            if (!monthlyMap[month]) {
                monthlyMap[month] = { receitas: 0, despesas: 0 };
            }

            if (expense.amount >= 0) {
                monthlyMap[month].receitas += expense.amount;
            } else {
                monthlyMap[month].despesas += Math.abs(expense.amount);
            }
        });

        const processedData = Object.keys(monthlyMap).map((month) => ({
            name: month,
            receitas: monthlyMap[month].receitas,
            despesas: monthlyMap[month].despesas,
        }));

        setMonthlyData(processedData);
    };

    // Processa os dados para o gráfico de linha (Evolução do saldo)
    const processBalanceData = (expenses: any[]) => {
        let saldo = 0;
        const balancePoints: any[] = [];

        expenses
            .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
            .forEach((expense) => {
                saldo += expense.amount;
                balancePoints.push({
                    date: new Date(expense.createdAt).toLocaleDateString("pt-BR"),
                    saldo: saldo,
                });
            });

        setBalanceData(balancePoints);
    };

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

    return (
        <MainLayout>
            <h2 className="flex text-2xl font-bold text-gray-700">
                Bem-vindo à sua página inicial,
                <span className="text-blue-600 ml-2">{username || "Usuário"}</span>
            </h2>

            <p className="mt-4 text-gray-500">
                Aqui você pode gerenciar suas finanças, ver dashboard e muito mais!
            </p>

            <div className="mt-6">
                <TotalBalance />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                {/* Gráfico de Pizza - Distribuição por Categoria */}
                <div className="bg-white shadow-md p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-700 text-center mb-4">
                        Despesas por Categoria
                    </h3>
                    <PieChart width={300} height={300}>
                        <Pie
                            data={expenses}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label
                        >
                            {Array.isArray(expenses) && expenses.length > 0 ? (
                                expenses.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))
                            ) : (
                                <p className="text-gray-500 text-center">Nenhum dado disponível</p>
                            )}

                        </Pie>
                        <Tooltip />
                    </PieChart>
                </div>

                {/* Gráfico de Barras - Receitas x Despesas por Mês */}
                <div className="bg-white shadow-md p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-700 text-center mb-4">
                        Receitas x Despesas Mensais
                    </h3>
                    <BarChart width={350} height={300} data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="receitas" fill="#4CAF50" />
                        <Bar dataKey="despesas" fill="#F44336" />
                    </BarChart>
                </div>

                {/* Gráfico de Linha - Evolução do Saldo */}
                <div className="bg-white shadow-md p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-700 text-center mb-4">
                        Evolução do Saldo
                    </h3>
                    <LineChart width={350} height={300} data={balanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="saldo" stroke="#8884d8" />
                    </LineChart>
                </div>
            </div>
        </MainLayout>
    );
};

export default Dashboard;
