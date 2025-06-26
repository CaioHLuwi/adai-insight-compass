
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash2, Calculator } from 'lucide-react';

interface Taxa {
  id: string;
  nome: string;
  tipo: 'percentual' | 'fixo';
  valor: number;
  descricao: string;
}

const Taxas = () => {
  const [taxas, setTaxas] = useState<Taxa[]>([
    {
      id: '1',
      nome: 'Taxa de Processamento',
      tipo: 'percentual',
      valor: 3.5,
      descricao: 'Taxa cobrada pelo processador de pagamento'
    },
    {
      id: '2',
      nome: 'Taxa de Afiliação',
      tipo: 'percentual',
      valor: 30,
      descricao: 'Taxa paga aos afiliados'
    },
    {
      id: '3',
      nome: 'Taxa Fixa Mensal',
      tipo: 'fixo',
      valor: 29.90,
      descricao: 'Taxa mensal da plataforma'
    }
  ]);

  const [novoTaxa, setNovoTaxa] = useState<Omit<Taxa, 'id'>>({
    nome: '',
    tipo: 'percentual',
    valor: 0,
    descricao: ''
  });

  const [editandoId, setEditandoId] = useState<string | null>(null);

  const adicionarTaxa = () => {
    if (novoTaxa.nome && novoTaxa.valor > 0) {
      const novaTaxa: Taxa = {
        ...novoTaxa,
        id: Date.now().toString()
      };
      setTaxas([...taxas, novaTaxa]);
      setNovoTaxa({
        nome: '',
        tipo: 'percentual',
        valor: 0,
        descricao: ''
      });
    }
  };

  const editarTaxa = (id: string) => {
    const taxa = taxas.find(t => t.id === id);
    if (taxa) {
      setNovoTaxa({
        nome: taxa.nome,
        tipo: taxa.tipo,
        valor: taxa.valor,
        descricao: taxa.descricao
      });
      setEditandoId(id);
    }
  };

  const salvarEdicao = () => {
    if (editandoId && novoTaxa.nome && novoTaxa.valor > 0) {
      setTaxas(taxas.map(t => 
        t.id === editandoId 
          ? { ...novoTaxa, id: editandoId }
          : t
      ));
      setEditandoId(null);
      setNovoTaxa({
        nome: '',
        tipo: 'percentual',
        valor: 0,
        descricao: ''
      });
    }
  };

  const excluirTaxa = (id: string) => {
    setTaxas(taxas.filter(t => t.id !== id));
  };

  const calcularTaxaTotal = (valor: number) => {
    let total = valor;
    const taxasAplicadas: { nome: string; valor: number }[] = [];

    taxas.forEach(taxa => {
      let valorTaxa = 0;
      if (taxa.tipo === 'percentual') {
        valorTaxa = (total * taxa.valor) / 100;
      } else {
        valorTaxa = taxa.valor;
      }
      total -= valorTaxa;
      taxasAplicadas.push({ nome: taxa.nome, valor: valorTaxa });
    });

    return { valorFinal: total, taxasAplicadas, totalTaxas: valor - total };
  };

  const [valorCalculo, setValorCalculo] = useState<number>(1000);
  const resultadoCalculo = calcularTaxaTotal(valorCalculo);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Configuração de Taxas</h1>
      </div>

      <Tabs defaultValue="taxas" className="space-y-6">
        <TabsList>
          <TabsTrigger value="taxas">Gerenciar Taxas</TabsTrigger>
          <TabsTrigger value="calculadora">Calculadora</TabsTrigger>
        </TabsList>

        <TabsContent value="taxas" className="space-y-6">
          {/* Formulário para adicionar/editar taxa */}
          <Card>
            <CardHeader>
              <CardTitle>
                {editandoId ? 'Editar Taxa' : 'Adicionar Nova Taxa'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nome">Nome da Taxa</Label>
                  <Input
                    id="nome"
                    value={novoTaxa.nome}
                    onChange={(e) => setNovoTaxa({...novoTaxa, nome: e.target.value})}
                    placeholder="Ex: Taxa de Processamento"
                  />
                </div>
                <div>
                  <Label htmlFor="tipo">Tipo</Label>
                  <select
                    id="tipo"
                    value={novoTaxa.tipo}
                    onChange={(e) => setNovoTaxa({...novoTaxa, tipo: e.target.value as 'percentual' | 'fixo'})}
                    className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800"
                  >
                    <option value="percentual">Percentual (%)</option>
                    <option value="fixo">Valor Fixo (R$)</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="valor">
                    Valor {novoTaxa.tipo === 'percentual' ? '(%)' : '(R$)'}
                  </Label>
                  <Input
                    id="valor"
                    type="number"
                    step="0.01"
                    value={novoTaxa.valor}
                    onChange={(e) => setNovoTaxa({...novoTaxa, valor: parseFloat(e.target.value) || 0})}
                    placeholder={novoTaxa.tipo === 'percentual' ? '3.5' : '29.90'}
                  />
                </div>
                <div>
                  <Label htmlFor="descricao">Descrição</Label>
                  <Input
                    id="descricao"
                    value={novoTaxa.descricao}
                    onChange={(e) => setNovoTaxa({...novoTaxa, descricao: e.target.value})}
                    placeholder="Descrição da taxa"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={editandoId ? salvarEdicao : adicionarTaxa}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black"
                >
                  {editandoId ? 'Salvar Alterações' : 'Adicionar Taxa'}
                </Button>
                {editandoId && (
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setEditandoId(null);
                      setNovoTaxa({nome: '', tipo: 'percentual', valor: 0, descricao: ''});
                    }}
                  >
                    Cancelar
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Lista de taxas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {taxas.map((taxa) => (
              <Card key={taxa.id}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{taxa.nome}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-2xl font-bold text-yellow-500">
                    {taxa.tipo === 'percentual' ? `${taxa.valor}%` : `R$ ${taxa.valor.toFixed(2)}`}
                  </div>
                  <p className="text-sm text-muted-foreground">{taxa.descricao}</p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => editarTaxa(taxa.id)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => excluirTaxa(taxa.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="calculadora" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Calculadora de Taxas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="valorCalculo">Valor Base (R$)</Label>
                <Input
                  id="valorCalculo"
                  type="number"
                  step="0.01"
                  value={valorCalculo}
                  onChange={(e) => setValorCalculo(parseFloat(e.target.value) || 0)}
                  placeholder="1000.00"
                />
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-semibold mb-3">Resultado do Cálculo:</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Valor Base:</span>
                    <span className="font-semibold">R$ {valorCalculo.toFixed(2)}</span>
                  </div>
                  
                  {resultadoCalculo.taxasAplicadas.map((taxa, index) => (
                    <div key={index} className="flex justify-between text-red-600">
                      <span>- {taxa.nome}:</span>
                      <span>R$ {taxa.valor.toFixed(2)}</span>
                    </div>
                  ))}
                  
                  <hr className="my-2" />
                  <div className="flex justify-between text-red-600">
                    <span className="font-semibold">Total de Taxas:</span>
                    <span className="font-semibold">R$ {resultadoCalculo.totalTaxas.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-green-600 text-lg">
                    <span className="font-bold">Valor Final:</span>
                    <span className="font-bold">R$ {resultadoCalculo.valorFinal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Taxas;
