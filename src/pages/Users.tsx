
import React, { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
}

const Users = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: '',
    password: ''
  });

  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: 'João Silva',
      email: 'joao@email.com',
      role: 'Admin',
      status: 'Active',
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      name: 'Maria Santos',
      email: 'maria@email.com',
      role: 'Manager',
      status: 'Active',
      createdAt: '2024-02-20'
    }
  ]);

  const roles = [
    { value: 'admin', label: 'Admin' },
    { value: 'manager', label: 'Manager' },
    { value: 'viewer', label: 'Viewer' }
  ];

  const handleCreateUser = () => {
    if (newUser.name && newUser.email && newUser.role) {
      const user: User = {
        id: Date.now(),
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        status: 'Active',
        createdAt: new Date().toISOString().split('T')[0]
      };
      setUsers([...users, user]);
      setNewUser({ name: '', email: '', role: '', password: '' });
      setShowCreateDialog(false);
      toast({
        title: "User created",
        description: `User ${newUser.name} has been created successfully!`,
      });
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setShowEditDialog(true);
  };

  const handleSaveEdit = () => {
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? editingUser : u));
      setShowEditDialog(false);
      setEditingUser(null);
      toast({
        title: "User updated",
        description: `User ${editingUser.name} has been updated successfully!`,
      });
    }
  };

  const handleDeleteUser = (userId: number) => {
    const user = users.find(u => u.id === userId);
    setUsers(users.filter(u => u.id !== userId));
    toast({
      title: "User deleted",
      description: `User ${user?.name} has been deleted successfully!`,
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
          {language === 'pt' ? 'Usuários' : 'Users'}
        </h1>
        
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black hover:from-yellow-500 hover:to-yellow-700">
              <Plus className="w-4 h-4 mr-2" />
              {language === 'pt' ? 'Criar Usuário' : 'Create User'}
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 border-yellow-500/20">
            <DialogHeader>
              <DialogTitle className="text-white">{language === 'pt' ? 'Criar Novo Usuário' : 'Create New User'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-white">{language === 'pt' ? 'Nome Completo' : 'Full Name'}</Label>
                <Input 
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  placeholder={language === 'pt' ? 'Digite o nome completo' : 'Enter full name'}
                  className="bg-gray-700 border-yellow-500/20 text-white"
                />
              </div>
              <div>
                <Label className="text-white">Email</Label>
                <Input 
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  placeholder="user@email.com"
                  className="bg-gray-700 border-yellow-500/20 text-white"
                />
              </div>
              <div>
                <Label className="text-white">{language === 'pt' ? 'Função' : 'Role'}</Label>
                <Select value={newUser.role} onValueChange={(value) => setNewUser({...newUser, role: value})}>
                  <SelectTrigger className="bg-gray-700 border-yellow-500/20 text-white">
                    <SelectValue placeholder={language === 'pt' ? 'Selecione uma função' : 'Select a role'} />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-yellow-500/20">
                    {roles.map((role) => (
                      <SelectItem key={role.value} value={role.label} className="text-white hover:bg-gray-600">
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-white">{language === 'pt' ? 'Senha Temporária' : 'Temporary Password'}</Label>
                <Input 
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                  placeholder={language === 'pt' ? 'Senha será enviada por email' : 'Password will be sent via email'}
                  className="bg-gray-700 border-yellow-500/20 text-white"
                />
              </div>
              <Button onClick={handleCreateUser} className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black">
                {language === 'pt' ? 'Criar Usuário' : 'Create User'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit User Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="bg-gray-800 border-yellow-500/20">
          <DialogHeader>
            <DialogTitle className="text-white">{language === 'pt' ? 'Editar Usuário' : 'Edit User'}</DialogTitle>
          </DialogHeader>
          {editingUser && (
            <div className="space-y-4">
              <div>
                <Label className="text-white">{language === 'pt' ? 'Nome Completo' : 'Full Name'}</Label>
                <Input 
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                  className="bg-gray-700 border-yellow-500/20 text-white"
                />
              </div>
              <div>
                <Label className="text-white">Email</Label>
                <Input 
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                  className="bg-gray-700 border-yellow-500/20 text-white"
                />
              </div>
              <div>
                <Label className="text-white">{language === 'pt' ? 'Função' : 'Role'}</Label>
                <Select value={editingUser.role} onValueChange={(value) => setEditingUser({...editingUser, role: value})}>
                  <SelectTrigger className="bg-gray-700 border-yellow-500/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-yellow-500/20">
                    {roles.map((role) => (
                      <SelectItem key={role.value} value={role.label} className="text-white hover:bg-gray-600">
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSaveEdit} className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black">
                {language === 'pt' ? 'Salvar Alterações' : 'Save Changes'}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <div className="bg-gray-800 rounded-xl shadow-lg border border-yellow-500/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gradient-to-r from-yellow-400/20 to-yellow-600/20">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-yellow-400 uppercase tracking-wider">
                  {language === 'pt' ? 'Nome' : 'Name'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-yellow-400 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-yellow-400 uppercase tracking-wider">
                  {language === 'pt' ? 'Função' : 'Role'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-yellow-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-yellow-400 uppercase tracking-wider">
                  {language === 'pt' ? 'Criado em' : 'Created At'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-yellow-400 uppercase tracking-wider">
                  {language === 'pt' ? 'Ações' : 'Actions'}
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-yellow-500/10">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.role === 'Admin' 
                        ? 'bg-purple-100 text-purple-800'
                        : user.role === 'Manager'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-yellow-500/50 hover:bg-yellow-500/10 text-yellow-400"
                      onClick={() => handleEditUser(user)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-red-500/50 hover:bg-red-500/10 text-red-400"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
