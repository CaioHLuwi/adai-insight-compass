
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/hooks/useLanguage';
import { Settings, GripVertical } from 'lucide-react';
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

interface DashboardConfigProps {
  fields: DashboardField[];
  onFieldsChange: (fields: DashboardField[]) => void;
}

export function DashboardConfig({ fields, onFieldsChange }: DashboardConfigProps) {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [draggedField, setDraggedField] = useState<DashboardField | null>(null);
  const [dropZone, setDropZone] = useState<'visible' | 'hidden' | null>(null);

  const visibleFields = fields.filter(f => f.isVisible).sort((a, b) => a.order - b.order);
  const hiddenFields = fields.filter(f => !f.isVisible);

  const getText = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      configureFields: {
        en: 'Configure Dashboard Fields',
        pt: 'Configurar Campos do Dashboard',
        es: 'Configurar Campos del Dashboard',
        ru: 'Настроить поля панели',
        de: 'Dashboard-Felder konfigurieren'
      },
      visibleFields: {
        en: 'Visible Fields',
        pt: 'Campos Visíveis',
        es: 'Campos Visibles',
        ru: 'Видимые поля',
        de: 'Sichtbare Felder'
      },
      hiddenFields: {
        en: 'Available Fields',
        pt: 'Campos Disponíveis',
        es: 'Campos Disponibles',
        ru: 'Доступные поля',
        de: 'Verfügbare Felder'
      },
      dragToOrganize: {
        en: 'Drag to organize or hide/show fields',
        pt: 'Arraste para organizar ou ocultar/mostrar campos',
        es: 'Arrastra para organizar u ocultar/mostrar campos',
        ru: 'Перетащите для организации или скрытия/показа полей',
        de: 'Ziehen Sie zum Organisieren oder Verstecken/Anzeigen von Feldern'
      }
    };
    return translations[key]?.[language] || translations[key]?.['en'] || key;
  };

  const getFieldName = (field: DashboardField) => {
    return field.nameTranslations[language] || field.nameTranslations['en'] || field.name;
  };

  const handleDragStart = (field: DashboardField) => {
    setDraggedField(field);
  };

  const handleDragOver = (e: React.DragEvent, zone: 'visible' | 'hidden') => {
    e.preventDefault();
    setDropZone(zone);
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
    setDropZone(null);
  };

  const moveField = (fieldId: string, direction: 'up' | 'down') => {
    const currentField = visibleFields.find(f => f.id === fieldId);
    if (!currentField) return;

    const currentIndex = visibleFields.findIndex(f => f.id === fieldId);
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    if (targetIndex < 0 || targetIndex >= visibleFields.length) return;

    const targetField = visibleFields[targetIndex];
    
    const updatedFields = fields.map(field => {
      if (field.id === currentField.id) {
        return { ...field, order: targetField.order };
      } else if (field.id === targetField.id) {
        return { ...field, order: currentField.order };
      }
      return field;
    });

    onFieldsChange(updatedFields);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="border-yellow-500/50 hover:bg-yellow-500/10 text-yellow-400">
          <Settings className="w-4 h-4 mr-2" />
          {getText('configureFields')}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-gray-800 border-yellow-500/20">
        <DialogHeader>
          <DialogTitle className="text-white">{getText('configureFields')}</DialogTitle>
          <DialogDescription className="text-gray-300">
            {getText('dragToOrganize')}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Visible Fields */}
          <Card className="bg-gray-700 border-yellow-500/20">
            <CardHeader>
              <CardTitle className="text-lg text-white">{getText('visibleFields')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className={`min-h-[300px] space-y-2 p-2 border-2 border-dashed transition-colors rounded-lg ${
                  dropZone === 'visible' ? 'border-yellow-400 bg-yellow-400/10' : 'border-gray-500'
                }`}
                onDragOver={(e) => handleDragOver(e, 'visible')}
                onDrop={(e) => handleDrop(e, 'visible')}
              >
                {visibleFields.map((field, index) => (
                  <div
                    key={field.id}
                    draggable
                    onDragStart={() => handleDragStart(field)}
                    className="flex items-center justify-between bg-gray-600 border border-gray-500 rounded-lg p-3 cursor-move hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center space-x-2">
                      <GripVertical className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-white">{getFieldName(field)}</span>
                      <Badge variant="outline" className="text-xs text-yellow-400 border-yellow-400">
                        {field.category}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => moveField(field.id, 'up')}
                        disabled={index === 0}
                        className="text-white hover:bg-gray-500"
                      >
                        ↑
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => moveField(field.id, 'down')}
                        disabled={index === visibleFields.length - 1}
                        className="text-white hover:bg-gray-500"
                      >
                        ↓
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Hidden Fields */}
          <Card className="bg-gray-700 border-yellow-500/20">
            <CardHeader>
              <CardTitle className="text-lg text-white">{getText('hiddenFields')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className={`min-h-[300px] space-y-2 p-2 border-2 border-dashed transition-colors rounded-lg ${
                  dropZone === 'hidden' ? 'border-yellow-400 bg-yellow-400/10' : 'border-gray-500'
                }`}
                onDragOver={(e) => handleDragOver(e, 'hidden')}
                onDrop={(e) => handleDrop(e, 'hidden')}
              >
                {hiddenFields.map((field) => (
                  <div
                    key={field.id}
                    draggable
                    onDragStart={() => handleDragStart(field)}
                    className="flex items-center justify-between bg-gray-500 border border-gray-400 rounded-lg p-3 cursor-move hover:shadow-md transition-shadow opacity-60"
                  >
                    <div className="flex items-center space-x-2">
                      <GripVertical className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-white">{getFieldName(field)}</span>
                      <Badge variant="outline" className="text-xs text-yellow-400 border-yellow-400">
                        {field.category}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
