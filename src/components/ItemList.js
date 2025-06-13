import React from 'react';

const ItemList = ({ items, onEdit, onDelete }) => {
  if (!items || items.length === 0) {
    return <p>没有物品可以显示。快去添加一个吧！</p>;
  }

  return (
    <div>
      {items.map((item) => (
        <div key={item.id} className="item">
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <small>创建于: {new Date(item.createdAt).toLocaleDateString()}</small>
          <div className="item-actions" style={{marginTop: '10px'}}>
          <button onClick={() => onEdit(item)} className="edit">编辑</button>
          <button onClick={() => onDelete(item.id)} className="delete">删除</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;