import React, { useState, useEffect } from 'react';
import api from '../services/api';
import ItemForm from '../components/ItemForm';
import ItemList from '../components/ItemList';
import { useAuth } from '../authContext';

const DashboardPage = () => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

  const fetchItems = async () => {
    try {
      setError('');
      const res = await api.get('/items');
      setItems(res.data);
    } catch (err) {
      setError('获取物品列表失败。');
      console.error('获取物品错误:', err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSaveItem = async (itemData) => {
    try {
      setError('');
      if (editingItem) {
        // 更新物品
        await api.put(`/items/${editingItem.id}`, itemData);
      } else {
        // 创建物品
        await api.post('/items', itemData);
      }
      fetchItems(); // 更新列表
      setEditingItem(null);
      setShowForm(false);
    } catch (err) {
      setError(err.response?.data?.message || '保存物品失败。');
      console.error('保存物品错误:', err.response?.data || err.message);
    }
  };

  const handleEdit = (item) => {
    console.log(item)
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = async (itemId) => {
    if (window.confirm('您确定要删除这个物品吗？')) {
      try {
        setError('');
        console.log(itemId)
        await api.delete(`/items/${itemId}`);
        fetchItems(); // 更新列表
      } catch (err) {
        setError('删除物品失败。');
        console.error('删除物品错误:', err.response?.data || err.message);
      }
    }
  };

  const openNewItemForm = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  return (
    <div>
      <h1 className="page-title">仪表盘</h1>
      <p>欢迎, {user?.username}!</p>
      {error && <p className="error-message">{error}</p>}

      <button onClick={openNewItemForm} style={{marginBottom: '20px'}}>
      {showForm && !editingItem ? '取消添加' : '添加新物品'}
      </button>
      
      {showForm && (
        <ItemForm 
          onSubmit={handleSaveItem} 
          initialData={editingItem} 
          onCancel={() => { setEditingItem(null); setShowForm(false);}}
        />
      )}

      <h2>您的物品</h2>
      <ItemList items={items} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default DashboardPage;