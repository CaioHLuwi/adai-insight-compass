
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/hooks/useLanguage';
import { Settings, GripVertical, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface DashboardField {
  id: string;
  name: string;
  nameTranslations: Record<string, string>;
  category: 'revenue' | 'costs' | 'metrics';
  isVisible: boolean;
  order: number;
}

interface DashboardFieldsConfigProps {
  fields: DashboardField[];
  onFieldsChange: (fields: DashboardField[]) => void;
}

const defaultFields: DashboardField[] = [
  { id: 'gross_revenue', name: 'Faturamento Bruto', nameTranslations: { pt: 'Faturamento Bruto', en: 'Gross Revenue' }, category: 'revenue', isVisible: true, order: 1 },
  { id: 'spend', name: 'Gasto', nameTranslations: { pt: 'Gasto', en: 'Spend' }, category: 'costs', isVisible: true, order: 2 },
  { id: 'roas', name: 'ROAS', nameTranslations: { pt: 'ROAS', en: 'ROAS' }, category: 'metrics', isVisible: true, order: 3 },
  { id: 'profit', name: 'Lucro', nameTranslations: { pt: 'Lucro', en: 'Profit' }, category: 'revenue', isVisible: true, order: 4 },
  { id: 'net_revenue', name: 'Faturamento Líquido', nameTranslations: { pt: 'Faturamento Líquido', en: 'Net Revenue' }, category: 'revenue', isVisible: false, order: 5 },
  { id: 'sales_payment', name: 'Vendas / Pagamento', nameTranslations: { pt: 'Vendas / Pagamento', en: 'Sales / Payment' }, category: 'metrics', isVisible: false, order: 6 },
  { id: 'pending_sales', name: 'Vendas Pendentes', nameTranslations: { pt: 'Vendas Pendentes', en: 'Pending Sales' }, category: 'metrics', isVisible: false, order: 7 },
  { id: 'roi', name: 'ROI', nameTranslations: { pt: 'ROI', en: 'ROI' }, category: 'metrics', isVisible: false, order: 8 },
  { id: 'profit_margin', name: 'Margem de Lucro', nameTranslations: { pt: 'Margem de Lucro', en: 'Profit Margin' }, category: 'metrics', isVisible: false, order: 9 },
  { id: 'refunded_sales', name: 'Vendas Reembolsadas', nameTranslations: { pt: 'Vendas Reembolsadas', en: 'Refunded Sales' }, category: 'metrics', isVisible: false, order: 10 },
  { id: 'chargeback_sales', name: 'Vendas Chargeback', nameTranslations: { pt: 'Vendas Chargeback', en: 'Chargeback Sales' }, category: 'metrics', isVisible: false, order: 11 },
  { id: 'returned_sales', name: 'Vendas Devolvidas', nameTranslations: { pt: 'Vendas Devolvidas', en: 'Returned Sales' }, category: 'metrics', isVisible: false, order: 12 },
  { id: 'refund_rate', name: 'Taxa de Reembolso', nameTranslations: { pt: 'Taxa de Reembolso', en: 'Refund Rate' }, category: 'metrics', isVisible: false, order: 13 },
  { id: 'chargeback_rate', name: 'Taxa de Chargeback', nameTranslations: { pt: 'Taxa de Chargeback', en: 'Chargeback Rate' }, category: 'metrics', isVisible: false, order: 14 },
  { id: 'arpu', name: 'ARPU', nameTranslations: { pt: 'ARPU', en: 'ARPU' }, category: 'metrics', isVisible: false, order: 15 },
  { id: 'tax', name: 'Imposto', nameTranslations: { pt: 'Imposto', en: 'Tax' }, category: 'costs', isVisible: false, order: 16 },
  { id: 'product_costs', name: 'Custos de Produto', nameTranslations: { pt: 'Custos de Produto', en: 'Product Costs' }, category: 'costs', isVisible: false, order: 17 },
  { id: 'sales_per_product', name: 'Vendas / Produto', nameTranslations: { pt: 'Vendas / Produto', en: 'Sales / Product' }, category: 'metrics', isVisible: false, order: 18 },
  { id: 'revenue_per_product', name: 'Faturamento / Produto', nameTranslations: { pt: 'Faturamento / Produto', en: 'Revenue / Product' }, category: 'revenue', isVisible: false, order: 19 },
  { id: 'approval_rate', name: 'Taxa de Aprovação', nameTranslations: { pt: 'Taxa de Aprovação', en: 'Approval Rate' }, category: 'metrics', isVisible: false, order: 20 },
  { id: 'sales_per_day', name: 'Vendas / Dia', nameTranslations: { pt: 'Vendas / Dia', en: 'Sales / Day' }, category: 'metrics', isVisible: false, order: 21 },
  { id: 'cpa', name: 'CPA', nameTranslations: { pt: 'CPA', en: 'CPA' }, category: 'metrics', isVisible: false, order: 22 }
];

export function DashboardFieldsConfig({ fields = defaultFields, onFieldsChange }: DashboardFieldsConfigProps) {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [draggedField, setDraggedField] = useState<DashboardField | null>(null);
  const [dragOverZone, setDragOverZone] = useState<'visible' | 'hidden' | null>(null);

  const visibleFields = fields.filter(f => f.isVisible).sort((a, b) => a.order - b.order);
  const hiddenFields = fields.filter(f => !f.isVisible);

  const getText = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      configureFields: {
        en: 'Configure Dashboard',
        pt: 'Configurar Dashboard',
        es: 'Configurar Dashboard',
        ru: 'Настроить панель',
        de: 'Dashboard konfigurieren'
      },
      visibleFields: {
        en: 'Dashboard Fields',
        pt: 'Campos do Dashboard',
        es: 'Campos del Dashboard',
        ru: 'Поля панели',
        de: 'Dashboard-Felder'
      },
      availableFields: {
        en: 'Available Fields',
        pt: 'Campos Disponíveis',
        es: 'Campos Disponibles',
        ru: 'Доступные поля',
        de: 'Verfügbare Felder'
      },
      dragToOrganize: {
        en: 'Drag fields to organize your dashboard',
        pt: 'Arraste os campos para organizar seu dashboard',
        es: 'Arrastra los campos para organizar tu dashboard',
        ru: 'Перетащите поля для организации панели',
        de: 'Felder ziehen um Dashboard zu organisieren'
      }
    };
    return translations[key]?.[language] || translations[key]?.['en'] || key;
  };

  const getFieldName = (field: DashboardField) => {
    return field.nameTranslations[language] || field.nameTranslations['pt'] || field.name;
  };

  const handleDragStart = (field: DashboardField) => {
    setDraggedField(field);
  };

  const handleDragOver = (e: React.DragEvent, zone: 'visible' | 'hidden') => {
    e.preventDefault();
    setDragOverZone(zone);
  };

  const handleDragLeave = () => {
    setDragOverZone(null);
  };

  const handleDrop = (e: React.DragEvent, zone: 'visible' | 'hidden') => {
    e.preventDefault();
    if (!draggedField) return;

    const updatedFields = fields.map(field => {
      if (field.id === draggedField.id) {
        if (zone === 'visible' && !field.isVisible) {
          return { ...field, isVisible: true, order: Math.max(...visibleFields.map(f => f.order), 0) + 1 };
        } else if (zone === 'hidden' && field.isVisible) {
          return { ...field, isVisible: false, order: 0 };
        }
      }
      return field;
    });

    onFieldsChange(updatedFields);
    setDraggedField(null);
    setDragOverZone(null);
  };

  const removeField = (fieldId: string) => {
    const updatedFields = fields.map(field =>
      field.id === fieldId ? { ...field, isVisible: false, order: 0 } : field
    );
    onFieldsChange(updatedFields);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-yellow-500/50 hover:bg-yellow-500/10 text-yellow-400">
          <Settings className="w-4 h-4 mr-2" />
          Configurar
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden bg-gray-900 border-yellow-500/20">
        <DialogHeader>
          <DialogTitle className="text-white text-xl">{getText('configureFields')}</DialogTitle>
          <DialogDescription className="text-gray-300">
            {getText('dragToOrganize')}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[70vh]">
          {/* Dashboard Fields (Visible) */}
          <Card className="bg-gray-800 border-yellow-500/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-yellow-400 flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                {getText('visibleFields')}
              </CardTitle>
            </CardHeader>
            <CardContent className="h-full">
              <div 
                className={`min-h-[400px] max-h-[500px] overflow-y-auto space-y-3 p-4 border-2 border-dashed transition-all duration-200 rounded-lg ${
                  dragOverZone === 'visible' 
                    ? 'border-yellow-400 bg-yellow-400/10 shadow-lg' 
                    : 'border-gray-600 hover:border-gray-500'
                }`}
                onDragOver={(e) => handleDragOver(e, 'visible')}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, 'visible')}
              >
                {visibleFields.length === 0 ? (
                  <div className="flex items-center justify-center h-32 text-gray-400">
                    Arraste campos aqui para exibir no dashboard
                  </div>
                ) : (
                  visibleFields.map((field) => (
                    <div
                      key={field.id}
                      draggable
                      onDragStart={() => handleDragStart(field)}
                      className="flex items-center justify-between bg-gray-700 border border-yellow-500/30 rounded-lg p-3 cursor-move hover:shadow-lg hover:scale-105 transition-all duration-200 group"
                    >
                      <div className="flex items-center space-x-3">
                        <GripVertical className="w-4 h-4 text-gray-400 group-hover:text-yellow-400" />
                        <span className="font-medium text-white">{getFieldName(field)}</span>
                        <Badge 
                          variant="outline" 
                          className={`text-xs border-yellow-400 ${
                            field.category === 'revenue' ? 'text-green-400' :
                            field.category === 'costs' ? 'text-red-400' : 'text-blue-400'
                          }`}
                        >
                          {field.category}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeField(field.id)}
                        className="text-gray-400 hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Available Fields (Hidden) */}
          <Card className="bg-gray-800 border-gray-600">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-gray-300">{getText('availableFields')}</CardTitle>
            </CardHeader>
            <CardContent className="h-full">
              <div 
                className={`min-h-[400px] max-h-[500px] overflow-y-auto space-y-3 p-4 border-2 border-dashed transition-all duration-200 rounded-lg ${
                  dragOverZone === 'hidden' 
                    ? 'border-yellow-400 bg-yellow-400/10 shadow-lg' 
                    : 'border-gray-600 hover:border-gray-500'
                }`}
                onDragOver={(e) => handleDragOver(e, 'hidden')}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, 'hidden')}
              >
                {hiddenFields.length === 0 ? (
                  <div className="flex items-center justify-center h-32 text-gray-400">
                    Todos os campos estão sendo exibidos
                  </div>
                ) : (
                  hiddenFields.map((field) => (
                    <div
                      key={field.id}
                      draggable
                      onDragStart={() => handleDragStart(field)}
                      className="flex items-center justify-between bg-gray-600 border border-gray-500 rounded-lg p-3 cursor-move hover:shadow-md hover:scale-105 transition-all duration-200 opacity-75 hover:opacity-100 group"
                    >
                      <div className="flex items-center space-x-3">
                        <GripVertical className="w-4 h-4 text-gray-400 group-hover:text-yellow-400" />
                        <span className="font-medium text-white">{getFieldName(field)}</span>
                        <Badge 
                          variant="outline" 
                          className={`text-xs border-gray-400 ${
                            field.category === 'revenue' ? 'text-green-400' :
                            field.category === 'costs' ? 'text-red-400' : 'text-blue-400'
                          }`}
                        >
                          {field.category}
                        </Badge>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
