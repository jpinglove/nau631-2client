import React, { useState, useEffect } from 'react';

const ItemForm = ({ onSubmit, initialData, onCancel }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description);
    } else {
      setName('');
      setDescription('');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description) {
      alert("物品名称和描述不能为空。");
      return;
    }
    onSubmit({ name, description });
    // Optionally clear form if not editing
    if (!initialData) {
        setName('');
        setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{border: '1px solid #ccc', padding: '20px', borderRadius: '5px', marginBottom: '20px'}}>
      <h3>{initialData ? '编辑物品' : '创建新物品'}</h3>
      <div>
        <input
          type="text"
          placeholder="物品名称"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <textarea
          placeholder="物品描述"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button type="submit">{initialData ? '更新物品' : '添加物品'}</button>
      {onCancel && <button type="button" onClick={onCancel} style={{marginLeft: '10px', background: '#aaa'}}>取消</button>}
    </form>
  );
};

export default ItemForm;