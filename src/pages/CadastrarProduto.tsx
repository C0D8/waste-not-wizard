
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import * as z from "zod";

const formSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  dataCompra: z.string().min(1, "Data de compra é obrigatória"),
  dataValidade: z.string().min(1, "Data de validade é obrigatória"),
});

const CadastrarProduto = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      dataCompra: "",
      dataValidade: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    toast({
      title: "Produto cadastrado com sucesso!",
      description: "Você será redirecionado para a lista de produtos.",
    });
    console.log(values);
  };

  return (
    <div className="container max-w-2xl py-10">
      <Link
        to="/produtos"
        className="inline-flex items-center text-sm text-gray-600 mb-6 hover:text-gray-900"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar para produtos
      </Link>
      
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Cadastrar Produto</h1>
          <p className="text-gray-600 mt-2">
            Cadastre um novo produto para receber alertas de validade
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do produto</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Queijo Mussarela" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dataCompra"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data da compra</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dataValidade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de validade</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Cadastrar Produto
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CadastrarProduto;
