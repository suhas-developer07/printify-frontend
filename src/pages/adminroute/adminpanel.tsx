import React, { useEffect, useState } from 'react';
import { Search, Eye, X, FileText, Printer, Trash2 } from 'lucide-react';
import {Order,FileDetails } from './orders';
import axios from 'axios';


function Adminpanel() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [originalOrders, setOriginalOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleSearch = (query: string) => {
    // console.log(query);
    setSearchQuery(query);
    if (!query) {
      setOrders(originalOrders);
      return;
    }
    const filtered = originalOrders.filter(order => 
      order.Token.toLowerCase().includes(query.toLowerCase())
    );
    console.log(filtered);
    setOrders(filtered);
  };

  const handleDelete = (orderId: string) => {
    setOrders(orders.filter(order => order._id !== orderId));
    if (selectedOrder?._id === orderId) {
      setSelectedOrder(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getOrderStatus = (files: FileDetails[]) => {
    const allSuccess = files.every(file => file.status === 'success');
    return allSuccess ? 'success' : 'pending';
  };


  //sending request to backend
  const fetchorders = async ()=>{
    try {
      const response = await axios.get('http://localhost:3000/api/v1/admin/fetchorders');
      const data =response.data;
      // console.log(data);
      const reversed=[...data].reverse();
      setOrders(reversed);
      setOriginalOrders(reversed);
      // console.log(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  } 
  useEffect(()=>{
    fetchorders();
  },[setOriginalOrders]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Print Orders Dashboard</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by token number..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Orders List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Token</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Files</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.Token}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.useremail}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.files.length} files</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(getOrderStatus(order.files))}`}>
                        {getOrderStatus(order.files)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{order.TotalAmount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                        >
                          <Eye size={20} />
                        </button>
                        <button
                          onClick={() => handleDelete(order._id)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Order Details Sidebar */}
      {selectedOrder && (
        <div className="fixed inset-0  bg-opacity-50 flex justify-end">
          <div className="w-full max-w-md bg-white h-full overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 text-gray-700 mb-2">
                    <FileText size={20} />
                    <span className="font-medium">Order Information</span>
                  </div>
                  <div className="ml-7 space-y-2">
                    <p><span className="font-medium">Token:</span> {selectedOrder.Token}</p>
                    <p><span className="font-medium">Email:</span> {selectedOrder.useremail}</p>
                    <p><span className="font-medium">Total Sheets:</span> {selectedOrder.TotalSheets}</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 text-gray-700 mb-2">
                    <Printer size={20} />
                    <span className="font-medium">Files ({selectedOrder.files.length})</span>
                  </div>
                  <div className="ml-7 space-y-4">
                    {selectedOrder.files.map((file, index) => (
                      <div key={file._id} className="border-b pb-4 last:border-b-0 last:pb-0">
                        <div className="flex justify-between items-center mb-2">
                          <p className="font-medium text-gray-800">File {index + 1}</p>
                          {/* <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(file.status)}`}>
                            {file.status}
                          </span> */}
                        </div>
                        <div className="space-y-1 text-sm">
                          <p><span className="font-medium">Filename:</span> {file.filename}</p>
                          <p><span className="font-medium">Pages:</span> {file.numberofpages}</p>
                          <p><span className="font-medium">Copies:</span> {file.numberofcopies}</p>
                          <p><span className="font-medium">Color Mode:</span> {file.colorMode}</p>
                          <p><span className="font-medium">Side:</span> {file.side}</p>
                          <p><span className="font-medium">Paper Size:</span> {file.papersize}</p>
                          <p><span className="font-medium">Price:</span> ₹{file.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <p className="text-lg font-medium text-gray-900">
                    Total Amount: ₹{selectedOrder.TotalAmount}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Adminpanel;