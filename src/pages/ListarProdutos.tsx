
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, CircleCheck, Circle, CircleAlert } from "lucide-react";

const mockProdutos = [
  {
    id: 1,
    nome: "Queijo Mussarela",
    dataCompra: "2024-04-20",
    dataValidade: "2024-05-05",
  },
  {
    id: 2,
    nome: "Presunto",
    dataCompra: "2024-04-21",
    dataValidade: "2024-04-28",
  },
];

const ListarProdutos = () => {
  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString("pt-BR");
  };

  const getStatusIcon = (dataValidade: string) => {
    const hoje = new Date();
    const validade = new Date(dataValidade);
    const diasAteVencer = Math.ceil((validade.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));

    if (diasAteVencer <= 0) {
      return <CircleAlert className="w-4 h-4 text-destructive" />;
    } else if (diasAteVencer <= 7) {
      return <Circle className="w-4 h-4 text-warning" />;
    } else {
      return <CircleCheck className="w-4 h-4 text-primary" />;
    }
  };

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Meus Produtos</h1>
          <p className="text-gray-600 mt-2">
            Gerencie seus produtos e suas datas de validade
          </p>
        </div>
        <Button asChild>
          <Link to="/cadastrar-produto">
            <Plus className="w-4 h-4 mr-2" />
            Novo Produto
          </Link>
        </Button>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Data da Compra</TableHead>
              <TableHead>Data de Validade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockProdutos.map((produto) => (
              <TableRow key={produto.id}>
                <TableCell className="w-[50px]">
                  {getStatusIcon(produto.dataValidade)}
                </TableCell>
                <TableCell>{produto.nome}</TableCell>
                <TableCell>{formatarData(produto.dataCompra)}</TableCell>
                <TableCell>{formatarData(produto.dataValidade)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ListarProdutos;
